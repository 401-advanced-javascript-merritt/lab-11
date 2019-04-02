'use strict';
/**
 * If the server encounters an error, run this function.
 * @param  {} err
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {} =>{console.error('__SERVER_ERROR__'
 * @param  {} err
 * @param  {};res.statusCode=err.status||500;res.statusMessage=err.statusMessage||'ServerError';res.setHeader('Content-Type'} ;leterror={error
 * @param  {} 'application/json'
 * @param  {} ;res.write(JSON.stringify(error
 * @param  {} ;res.end(
 */
module.exports = (err, req, res, next) => {
  console.error('__SERVER_ERROR__', err);
  let error = { error: err.message || err };
  res.statusCode = err.status || 500;
  res.statusMessage = err.statusMessage || 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};
