'use strict';

var express = require('express');
var controller = require('./postsapp.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/posts/:id',controller.showuser);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.put('/user/:userId/:postId',controller.insertstatus);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
