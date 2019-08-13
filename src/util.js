/* eslint no-console:0 */

const formatRegExp = /%[sdj%]/g;

export let warning = () => {
};

// don't print warning message when in production env or node runtime
if (
  typeof process !== 'undefined' &&
  process.env &&
  process.env.NODE_ENV !== 'production' &&
  typeof window !== 'undefined' &&
  typeof document !== 'undefined'
) {
  warning = (type, errors) => {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(e => typeof e === 'string')) {
        console.warn(type, errors);
      }
    }
  };
}

export function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  const fields = {};
  errors.forEach(error => {
    const field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

export function format(...args) {
  let i = 1;
  const f = args[0];
  const len = args.length;
  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }
  if (typeof f === 'string') {
    let str = String(f).replace(formatRegExp, x => {
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
          return Number(args[i++]);
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
    for (let arg = args[i]; i < len; arg = args[++i]) {
      str += ` ${arg}`;
    }
    return str;
  }
  return f;
}

function isNativeStringType(type) {
  return (
    type === 'string' ||
    type === 'url' ||
    type === 'hex' ||
    type === 'email' ||
    type === 'pattern'
  );
}

export function isEmptyValue(value, type) {
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

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function asyncParallelArray(arr, func, callback) {
  const results = [];
  let total = 0;
  const arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(a => {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  let index = 0;
  const arrLength = arr.length;

  function next(errors) {
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

function flattenObjArr(objArr) {
  const ret = [];
  Object.keys(objArr).forEach(k => {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

export function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    const pending = new Promise((resolve, reject) => {
      const next = errors => {
        callback(errors);
        return errors.length
          ? reject({ errors, fields: convertFieldsError(errors) })
          : resolve();
      };
      const flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });
    pending.catch(e => e);
    return pending;
  }
  let firstFields = option.firstFields || [];
  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }
  const objArrKeys = Object.keys(objArr);
  const objArrLength = objArrKeys.length;
  let total = 0;
  const results = [];
  const pending = new Promise((resolve, reject) => {
    const next = errors => {
      results.push.apply(results, errors);
      total++;
      if (total === objArrLength) {
        callback(results);
        return results.length
          ? reject({ errors: results, fields: convertFieldsError(results) })
          : resolve();
      }
    };
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

export function complementError(rule) {
  return oe => {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }
    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField,
    };
  };
}

export function deepMerge(target, source) {
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
