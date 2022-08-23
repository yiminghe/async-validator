import { ExecuteRule } from '../interface';
import { format } from '../util';

const zero: ExecuteRule = (rule, value, source, errors, options) => {
  if (value === '0') {
    errors.push(format(options.messages.required, rule.fullField));
  }
};

export default zero;
