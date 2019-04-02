'use strict';
/**
 * If a route is called that does not exist, run this function.
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {'ResourceNotFound'};res.statusCode=404;res.statusMessage='NotFound';res.setHeader('Content-Type'} =>{leterror={error
 * @param  {} 'application/json'
 * @param  {} ;res.write(JSON.stringify(error
 * @param  {} ;res.end(
 */
module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};