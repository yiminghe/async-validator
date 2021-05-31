// >>>>> Rule
// Rule definition source of https://github.com/yiminghe/async-validator/blob/0d51d60086a127b21db76f44dff28ae18c165c47/src/index.d.ts
export type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email'
  | 'pattern'
  | 'any';

export type ValidateSource = Record<string, any>;

export interface ValidateOption {
  // whether to suppress internal warning
  suppressWarning?: boolean;

  // when the first validation rule generates an error stop processed
  first?: boolean;

  // when the first validation rule of the specified field generates an error stop the field processed, 'true' means all fields.
  firstFields?: boolean | string[];

  messages?: Partial<ValidateMessages>;

  /** The name of rules need to be trigger. Will validate all rules if leave empty */
  keys?: string[];

  error?: (rule: InternalRuleItem, message: string) => string;
}

export interface RuleItem {
  type?: RuleType; // default type is 'string'
  required?: boolean;
  pattern?: RegExp | string;
  min?: number; // Range of type 'string' and 'array'
  max?: number; // Range of type 'string' and 'array'
  len?: number; // Length of type 'string' and 'array'
  enum?: Array<string | number | boolean | null | undefined>; // possible values of type 'enum'
  whitespace?: boolean;
  fields?: Rules; // ignore when without required
  options?: ValidateOption;
  defaultField?: RuleItem; // 'object' or 'array' containing validation rules
  transform?: (value: any) => any;
  message?: string;
  asyncValidator?: (
    rule: InternalRuleItem,
    value: any,
    callback: (error?: string | string[]) => void,
    source: ValidateSource,
    options: ValidateOption,
  ) => void | Promise<void>;
  validator?: (
    rule: InternalRuleItem,
    value: any,
    callback: (error?: string | string[]) => void,
    source: ValidateSource,
    options: ValidateOption,
  ) => boolean | Error | Error[];
}

export type Rule = RuleItem | RuleItem[];

export type Rules = Record<string, Rule>;

// >>>>> Message
type ValidateMessage = string | (() => string);

export interface ValidateMessages {
  default?: ValidateMessage;
  required?: ValidateMessage;
  enum?: ValidateMessage;
  whitespace?: ValidateMessage;
  date?: {
    format?: ValidateMessage;
    parse?: ValidateMessage;
    invalid?: ValidateMessage;
  };
  types?: {
    string?: ValidateMessage;
    method?: ValidateMessage;
    array?: ValidateMessage;
    object?: ValidateMessage;
    number?: ValidateMessage;
    date?: ValidateMessage;
    boolean?: ValidateMessage;
    integer?: ValidateMessage;
    float?: ValidateMessage;
    regexp?: ValidateMessage;
    email?: ValidateMessage;
    url?: ValidateMessage;
    hex?: ValidateMessage;
  };
  string?: {
    len?: ValidateMessage;
    min?: ValidateMessage;
    max?: ValidateMessage;
    range?: ValidateMessage;
  };
  number?: {
    len?: ValidateMessage;
    min?: ValidateMessage;
    max?: ValidateMessage;
    range?: ValidateMessage;
  };
  array?: {
    len?: ValidateMessage;
    min?: ValidateMessage;
    max?: ValidateMessage;
    range?: ValidateMessage;
  };
  pattern?: {
    mismatch?: ValidateMessage;
  };
}

export interface InternalValidateMessages extends ValidateMessages {
  clone: () => InternalValidateMessages;
}

// >>>>> Values
export type Values = any;

// >>>>> Validate
export interface ValidateError {
  field: string;
}

export type ValidateCallback = (
  errors?: string[],
  fields?: Record<string, ValidateError[]>,
) => void;

export interface RuleValuePackage {
  rule: InternalRuleItem;
  value: any;
  source: Values;
  field: string;
}

export interface InternalRuleItem extends RuleItem {
  field?: string;
  fullField?: string;
}
