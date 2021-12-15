'use strict';

/*
 * Model for all the listing functionality and listing table's sql queries
 */

const pool = require('../database/db');
const {httpError} = require("../utils/errors");
const promisePool = pool.promise();

// GET - Returns a specific listing from database
const getListing = async (listingId, next) => {
  try {
    const [row] = await promisePool.execute("SELECT * FROM listings WHERE listing_id = ?", [listingId]);
    return row[0];
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

// GET - Returns a user's all listings
const getUserListing = async (userId, next) => {
  try {
    const [row] = await promisePool.execute(
      "SELECT * FROM listings WHERE seller_id = ?;", [userId]);
    return row;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}


// GET - Returns all listings from listings table, ordered by listing date (newest first)
const getAllListings = async (next) => {
  try {
    const [rows] = await promisePool.execute("SELECT * FROM listings ORDER BY listing_date DESC;");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

// POST - Inserts a new listing under the current user based on req.user
const insertListing = async (listing, next) => {
  console.log("adding listing", listing);
  try {
    const [new_listing] = await promisePool.execute(
      "INSERT INTO listings (seller_id, title, filename, description, price, listing_date, location) VALUES (?, ?, ?, ?, ?, ?, ?);",
      ([listing.user_id, listing.title, listing.filename, listing.description, listing.price, listing.listing_date, listing.location]));
    return new_listing;
  } catch (e) {
    console.error("error model insert listing", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

// PUT - Modify price or description of the listing, available for user's own listings and on admin for every listing
const modifyListing = async (id, listing, user, next) => {
  let query = "";
  let params = [];

  if (user.role === 0) {
    query = "UPDATE listings SET title = ?, description = ?, price = ?, location = ? WHERE listing_id = ?;"
    params = [listing.title, listing.description, listing.price, listing.location, id];
  } else {
    query = "UPDATE listings SET title = ?, description = ?, price = ?, location = ? WHERE listing_id = ? AND seller_id = ?;"
    params = [listing.title, listing.description, listing.price, listing.location, id, user.user_id];
  }
  try {
    const [modified_listing] = await promisePool.execute(
      query,
      params
    );
    return modified_listing;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

// PUT - Modify user's profile picture filename
const modifyListingPic = async (id, filename, user, next) => {
  let query = "";
  let params = [];

  if (user.role === 0) {
    query = "UPDATE listings SET filename = ? WHERE listing_id = ?;"
    params = [filename, id];
  } else {
    query = "UPDATE listings SET filename = ? WHERE listing_id = ? AND seller_id = ?;"
    params = [filename, id, user.user_id];
  }
  try{
    const [modified_listing] = await promisePool.execute(
      query,
      params
    );
    return modified_listing;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

// DELETE - Delete specific listing from database, available for user's own listings and on admin for every listing
const deleteListing = async (listing_id, user, next) => {
  let query = "";
  let params = [];

  if (user.role === 0) {
    query = "DELETE FROM listings WHERE listing_id = ?;"
    params = [listing_id];
  } else {
    query = "DELETE FROM listings WHERE listing_id = ? AND seller_id = ?;"
    params = [listing_id, user.user_id];
  }
  try {
    const [rows] = await promisePool.execute(
      query,
      params
    );
    return rows;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

// GET - Select listings from database based on search parameter, searched from listing titles and descriptions
const searchListing = async (searchParam, next) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT * FROM listings WHERE title like '%${searchParam}%' OR description like '%${searchParam}%';`
    );
    return rows;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

module.exports = {
  getListing,
  getAllListings,
  modifyListing,
  deleteListing,
  insertListing,
  searchListing,
  getUserListing,
  modifyListingPic
}


