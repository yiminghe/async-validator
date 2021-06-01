import { ExecuteRule } from '../interface';
import { format } from '../util';

const pattern: ExecuteRule = (rule, value, source, errors, options) => {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        errors.push(
          format(
            options.messages.pattern.mismatch,
            rule.fullField,
            value,
            rule.pattern,
          ),
        );
      }
    } else if (typeof rule.pattern === 'string') {
      const _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value)) {
        errors.push(
          format(
            options.messages.pattern.mismatch,
            rule.fullField,
            value,
            rule.pattern,
          ),
        );
      }
    }
  }
};

export default pattern;
