// https://github.com/kevva/url-regex/blob/master/index.js
let urlReg: RegExp;

export default () => {
  if (urlReg) {
    return urlReg;
  }

  const word = '[a-fA-F\\d:]';
  const b = options =>
    options && options.includeBoundaries
      ? `(?:(?<=\\s|^)(?=${word})|(?<=${word})(?=\\s|$))`
      : '';

  const v4 =
    '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}';

  const v6seg = '[a-fA-F\\d]{1,4}';
  const v6 = `
(?:
(?:${v6seg}:){7}(?:${v6seg}|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${v6seg}:){6}(?:${v4}|:${v6seg}|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${v6seg}:){5}(?::${v4}|(?::${v6seg}){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${v6seg}:){4}(?:(?::${v6seg}){0,1}:${v4}|(?::${v6seg}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${v6seg}:){3}(?:(?::${v6seg}){0,2}:${v4}|(?::${v6seg}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${v6seg}:){2}(?:(?::${v6seg}){0,3}:${v4}|(?::${v6seg}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${v6seg}:){1}(?:(?::${v6seg}){0,4}:${v4}|(?::${v6seg}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::${v6seg}){0,5}:${v4}|(?::${v6seg}){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`
    .replace(/\s*\/\/.*$/gm, '')
    .replace(/\n/g, '')
    .trim();

  // Pre-compile only the exact regexes because adding a global flag make regexes stateful
  const v46Exact = new RegExp(`(?:^${v4}$)|(?:^${v6}$)`);
  const v4exact = new RegExp(`^${v4}$`);
  const v6exact = new RegExp(`^${v6}$`);

  const ip = options =>
    options && options.exact
      ? v46Exact
      : new RegExp(
          `(?:${b(options)}${v4}${b(options)})|(?:${b(options)}${v6}${b(
            options,
          )})`,
          'g',
        );

  ip.v4 = (options?) =>
    options && options.exact
      ? v4exact
      : new RegExp(`${b(options)}${v4}${b(options)}`, 'g');
  ip.v6 = (options?) =>
    options && options.exact
      ? v6exact
      : new RegExp(`${b(options)}${v6}${b(options)}`, 'g');

  const protocol = `(?:(?:[a-z]+:)?//)`;
  const auth = '(?:\\S+(?::\\S*)?@)?';
  const ipv4 = ip.v4().source;
  const ipv6 = ip.v6().source;
  const host = '(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)';
  const domain =
    '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
  const tld = `(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))`;
  const port = '(?::\\d{2,5})?';
  const path = '(?:[/?#][^\\s"]*)?';
  const regex = `(?:${protocol}|www\\.)${auth}(?:localhost|${ipv4}|${ipv6}|${host}${domain}${tld})${port}${path}`;
  urlReg = new RegExp(`(?:^${regex}$)`, 'i');
  return urlReg;
};
