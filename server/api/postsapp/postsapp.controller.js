/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/postsapps              ->  index
 * POST    /api/postsapps              ->  create
 * GET     /api/postsapps/:id          ->  show
 * PUT     /api/postsapps/:id          ->  upsert
 * PATCH   /api/postsapps/:id          ->  patch
 * DELETE  /api/postsapps/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Postsapp from './postsapp.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Postsapps
export function index(req, res) {
  return Postsapp.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Postsapp from the DB
export function show(req, res) {
  var userId = req.params.id;
  return Postsapp.find({userid:userId}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Postsapp in the DB
export function create(req, res) {
  return Postsapp.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Postsapp in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Postsapp.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Postsapp in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Postsapp.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Postsapp from the DB
export function destroy(req, res) {
  return Postsapp.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
