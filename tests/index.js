const req = require.context('.', false, /\.spec\.js$/);
req.keys().forEach(req);
