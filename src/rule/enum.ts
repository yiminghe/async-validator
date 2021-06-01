import { ExecuteRule } from '../interface';
import { format } from '../util';

const ENUM = 'enum' as const;

const enumerable: ExecuteRule = (rule, value, source, errors, options) => {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(
      format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')),
    );
  }
};

export default enumerable;
