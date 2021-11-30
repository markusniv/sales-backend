'use strict';

const listingModel = require("../models/listingModel");
const {httpError} = require("../utils/errors");


const getListing = async (req, res, next) => {
  const listing = await listingModel.getListing(req.params.id, next);
  if (listing) {
    res.json(listing);
    return;
  }
  const err = httpError("listing not found", 404);
  next(err);
}

const getAllListings = async (req, res, next) => {
  const listings = await listingModel.getAllListings();
  if (listings.length > 0) {
    res.json(listings);
    return;
  }
  const err = httpError("Listings not found", 404);
  next(err);
}

const insertListing = async (req, res, next) => {
  const listing = {
    user_id: req.body.user_id,
    filename: req.file.filename,
    description: req.body.description,
    price: req.body.price
  };
  console.log(listing);
  const result = await (listingModel.insertListing(listing, next));
  if(result.insertId) {
    res.json({message: 'listing added', listing_id: result.insertId});
  } else {
    res.status(400).json({error: 'add listing error'});
  }
}


const modifyListing = async (req, res, next) => {
  const response = await listingModel.modifyListing(req.params.id, req.body, next);
  if (response.affectedRows !== 0) {
    res.json({message: "listing modified"});
    return;
  }
  const err = httpError("Failed to modify listing", 400);
  next(err);
}

const deleteListing = async (req, res, next) => {
  const response = await listingModel.deleteListing(req.params.id, req.body, next);
  if (response.affectedRows !== 0) {
    res.json({message: "Listing deleted"});
    return;
  }
  const err = httpError("Failed to delete listing", 400);
  next(err);
}

module.exports = {
  getListing,
  getAllListings,
  modifyListing,
  deleteListing,
  insertListing,
}