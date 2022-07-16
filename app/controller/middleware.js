(function(){
  const { STATUS_CODES } = require('http');
  
  module.exports = {
    cors,
    notFound,
    handleError,
    handleValidationError
  }

  function cors (request, response, next) {
    const origin = request.headers.origin;
    response.setHeader('Access-Control-Allow-Origin', origin || '*');
    response.setHeader('Access-Control-Allow-Methods',
    'POST, GET, PUT, DELETE, OPTIONS, XMODIFY'
    )
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Max-Age', '86400');
    response.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-Width, X-HTTP-Method-Override, Content-Type, Accept'
    )

    next();
  }

  function handleError (error, request, response, next) {
    if (request.headersSent) return next(error);

    if (!error.statusCode) console.error(error);
    const statusCode = error.statusCode || 500;
    const errorMessage = STATUS_CODES[statusCode] || 'Internal Error';
    response.status(statusCode).json({ error: errorMessage })
  }

  function notFound (request, response) {
    response.status(404).json({ error: 'Not Found' });
  }

  function handleValidationError (error, request, response, next) {
    if (error.name !== 'ValidationError') return next(error)

    response.status(400).json({ error: error._message, errorDetails: error.errors });
  }
}());