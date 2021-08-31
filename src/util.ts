/* eslint no-console:0 */

import {
  ValidateError,
  ValidateOption,
  RuleValuePackage,
  InternalRuleItem,
  SyncErrorType,
  RuleType,
  Value,
  Values,
} from './interface';

const formatRegExp = /%[sdj%]/g;

declare var ASYNC_VALIDATOR_NO_WARNING;

export let warning: (type: string, errors: SyncErrorType[]) => void = () => { };

// don't print warning message when in production env or node runtime
if (
  typeof process !== 'undefined' &&
  process.env &&
  process.env.NODE_ENV !== 'production' &&
  typeof window !== 'undefined' &&
  typeof document !== 'undefined'
) {
  warning = (type, errors) => {
    if (typeof console !== 'undefined' && console.warn &&
      typeof ASYNC_VALIDATOR_NO_WARNING === 'undefined'
    ) {
      if (errors.every(e => typeof e === 'string')) {
        console.warn(type, errors);
      }
    }
  };
}

export function convertFieldsError(
  errors: ValidateError[],
): Record<string, ValidateError[]> {
  if (!errors || !errors.length) return null;
  const fields = {};
  errors.forEach(error => {
    const field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

export function format(
  template: ((...args: any[]) => string) | string,
  ...args: any[]
): string {
  let i = 0;
  const len = args.length;
  if (typeof template === 'function') {
    return template.apply(null, args);
  }
  if (typeof template === 'string') {
    let str = template.replace(formatRegExp, x => {
      if (x === '%%') {
        return '%';
      }
      if (i >= len) {
        return x;
      }
      switch (x) {
        case '%s':
          return String(args[i++]);
        case '%d':
          return (Number(args[i++]) as unknown) as string;
        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }
          break;
        default:
          return x;
      }
    });
    return str;
  }
  return template;
}

function isNativeStringType(type: string) {
  return (
    type === 'string' ||
    type === 'url' ||
    type === 'hex' ||
    type === 'email' ||
    type === 'date' ||
    type === 'pattern'
  );
}

export function isEmptyValue(value: Value, type?: string) {
  if (value === undefined || value === null) {
    return true;
  }
  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }
  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }
  return false;
}

export function isEmptyObject(obj: object) {
  return Object.keys(obj).length === 0;
}

function asyncParallelArray(
  arr: RuleValuePackage[],
  func: ValidateFunc,
  callback: (errors: ValidateError[]) => void,
) {
  const results: ValidateError[] = [];
  let total = 0;
  const arrLength = arr.length;

  function count(errors: ValidateError[]) {
    results.push(...(errors || []));
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(a => {
    func(a, count);
  });
}

function asyncSerialArray(
  arr: RuleValuePackage[],
  func: ValidateFunc,
  callback: (errors: ValidateError[]) => void,
) {
  let index = 0;
  const arrLength = arr.length;

  function next(errors: ValidateError[]) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    const original = index;
    index = index + 1;
    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr: Record<string, RuleValuePackage[]>) {
  const ret: RuleValuePackage[] = [];
  Object.keys(objArr).forEach(k => {
    ret.push(...(objArr[k] || []));
  });
  return ret;
}

export class AsyncValidationError extends Error {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;

  constructor(
    errors: ValidateError[],
    fields: Record<string, ValidateError[]>,
  ) {
    super('Async Validation Error');
    this.errors = errors;
    this.fields = fields;
  }
}

type ValidateFunc = (
  data: RuleValuePackage,
  doIt: (errors: ValidateError[]) => void,
) => void;

export function asyncMap(
  objArr: Record<string, RuleValuePackage[]>,
  option: ValidateOption,
  func: ValidateFunc,
  callback: (errors: ValidateError[]) => void,
  source: Values,
): Promise<Values> {
  if (option.first) {
    const pending = new Promise<Values>((resolve, reject) => {
      const next = (errors: ValidateError[]) => {
        callback(errors);
        return errors.length
          ? reject(new AsyncValidationError(errors, convertFieldsError(errors)))
          : resolve(source);
      };
      const flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });
    pending.catch(e => e);
    return pending;
  }
  const firstFields =
    option.firstFields === true
      ? Object.keys(objArr)
      : option.firstFields || [];

  const objArrKeys = Object.keys(objArr);
  const objArrLength = objArrKeys.length;
  let total = 0;
  const results: ValidateError[] = [];
  const pending = new Promise<Values>((resolve, reject) => {
    const next = (errors: ValidateError[]) => {
      results.push.apply(results, errors);
      total++;
      if (total === objArrLength) {
        callback(results);
        return results.length
          ? reject(
            new AsyncValidationError(results, convertFieldsError(results)),
          )
          : resolve(source);
      }
    };
    if (!objArrKeys.length) {
      callback(results);
      resolve(source);
    }
    objArrKeys.forEach(key => {
      const arr = objArr[key];
      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending.catch(e => e);
  return pending;
}

function isErrorObj(
  obj: ValidateError | string | (() => string),
): obj is ValidateError {
  return !!(obj && (obj as ValidateError).message !== undefined);
}

function getValue(value: Values, path: string[]) {
  let v = value;
  for (let i = 0; i < path.length; i++) {
    if (v == undefined) {
      return v;
    }
    v = v[path[i]];
  }
  return v;
}

export function complementError(rule: InternalRuleItem, source: Values) {
  return (oe: ValidateError | (() => string) | string): ValidateError => {
    let fieldValue;
    if (rule.fullFields) {
      fieldValue = getValue(source, rule.fullFields);
    } else {
      fieldValue = source[(oe as any).field || rule.fullField];
    }
    if (isErrorObj(oe)) {
      oe.field = oe.field || rule.fullField;
      oe.fieldValue = fieldValue;
      return oe;
    }
    return {
      message: typeof oe === 'function' ? oe() : oe,
      fieldValue,
      field: ((oe as unknown) as ValidateError).field || rule.fullField,
    };
  };
}

export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  if (source) {
    for (const s in source) {
      if (source.hasOwnProperty(s)) {
        const value = source[s];
        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = {
            ...target[s],
            ...value,
          };
        } else {
          target[s] = value;
        }
      }
    }
  }
  return target;
}
