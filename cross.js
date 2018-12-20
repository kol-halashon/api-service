module.exports = function (app) {
  app.all('*', function (req, res, next) {
    var responseSettings = {
      'AccessControlAllowOrigin': req.headers.origin,
      'AccessControlAllowHeaders': 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, text/plain, Date, X-Api-Version, X-File-Name',
      'AccessControlAllowMethods': 'POST, GET, PUT, DELETE, OPTIONS',
      'AccessControlAllowCredentials': true
    };

    res.header('Access-Control-Allow-Credentials', responseSettings.AccessControlAllowCredentials);
    res.header('Access-Control-Allow-Origin', responseSettings.AccessControlAllowOrigin);
    res.header('Access-Control-Allow-Headers', (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : 'x-requested-with');
    res.header('Access-Control-Allow-Methods', (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Max-Age', '2592000');
      return res.sendStatus(200);
    } else {
      next();
    }
  });
};
