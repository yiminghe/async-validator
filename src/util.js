const formatRegExp = /%[sdj%]/g;

export default {
  format(...args) {
    let i = 1;
    const f = args[0];
    const len = args.length;
    let str = String(f).replace(formatRegExp, (x) => {
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
      str += ' ' + arg;
    }
    return str;
  },

  isEmptyValue(value, type) {
    if (value === undefined || value === null) {
      return true;
    }
    if (type === 'array' && Array.isArray(value) && !value.length) {
      return true;
    }
    if (type === 'string' && typeof value === 'string' && !value) {
      return true;
    }
    return false;
  },
};


