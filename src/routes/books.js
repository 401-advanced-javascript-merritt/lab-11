'use strict';

const express = require('express');
const auth = require('../auth/middleware.js');
const router = express.Router();

router.get('/books', auth, handleGetAll);
router.get('/books/:id', handleGetOne);

// Route Handlers
/**
 * Get all values from the /books route, and return the array.
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {} {letbooks={count
 * @param  {} results
 * @param  {} {title
 * @param  {}} {title
 * @param  {} ]
 * @param  {} };res.status(200
 * @param  {} .json(books
 */
function handleGetAll(req, res, next) {
  let books = {
    count: 3,
    results: [
      { title:'Moby Dick' },
      { title:'Little Women' },
      { title: 'Eloquent Javascript' },
    ],
  };
  res.status(200).json(books);
}
/**
 * Get one value from the /books/id route, return the book object.
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {} {letbook={title
 * @param  {} };res.status(200
 * @param  {} .json(book
 */
function handleGetOne(req, res, next) {
  let book = {
    title:'Moby Dick',
  };
  res.status(200).json(book);
}

module.exports = router;
