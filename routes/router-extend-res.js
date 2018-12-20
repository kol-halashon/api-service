const defaultErrorStatusCode = 500;
const defaultSuccessStatusCode = 200;

module.exports = function (req, res, next) {
  res.jsonError = function (error, statusCode) {
    console.log('Error:', error);
    statusCode = statusCode || defaultErrorStatusCode;
    res.status(statusCode).setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify({ status: 'error', data: error.toString() }, null, 2));
  };

  res.jsonSuccess = function (data, statusCode) {
    statusCode = statusCode || defaultSuccessStatusCode;
    res.status(statusCode).setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify({ status: 'success', data: data }, null, 2));
  };

  res.resolve = function (promiseObject) {
    promiseObject
      .then(res.jsonSuccess)
      .catch(res.jsonError);
  };

  next();
};
