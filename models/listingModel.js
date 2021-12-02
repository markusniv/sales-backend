'use strict';

const pool = require('../database/db');
const {httpError} = require("../utils/errors");
const promisePool = pool.promise();

//Returns specific listing from database
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

//returns all listings from listings table
const getAllListings = async (next) => {
  try {
    const [rows] = await promisePool.execute("SELECT * FROM listings");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

const insertListing = async (listing, next) => {
  console.log("adding listing", listing);
  try{
    const [new_listing] = await promisePool.execute(
      "INSERT INTO listings (seller_id, title, filename, description, price, listing_date) VALUES (?, ?, ?, ?, ?, ?);",
      ([listing.user_id, listing.title, listing.filename, listing.description, listing.price, listing.listing_date]));
    return new_listing;
  } catch (e) {
    console.error("error model insert listing", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

// TODO: Only listing owner or admin can modify listings.
// Modify price or description of the listing
const modifyListing = async (id, listing, next) => {
  try {
    const [modified_listing] = await promisePool.execute(
      "UPDATE listings SET description = ?, price = ? WHERE listing_id = ?;",
      ([listing.description, listing.price, id]));
    return modified_listing;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}
// TODO: Only listing owner or admin can delete listings.
//Delete specific listing from database
const deleteListing = async (listing_id, next) => {
  try {
    const [rows] = await promisePool.execute(
      "DELETE FROM listings WHERE listing_id = ?;", [listing_id]);
    return rows.affectedRows === 1;
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
}


