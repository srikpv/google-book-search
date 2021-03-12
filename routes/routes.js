const express = require("express");
const router = express.Router();
const bookTemplateCopy = require('../models/BookModel');
const mongoose = require("mongoose");

router.post('/saveBook', async (request, response) => {
    const book = new bookTemplateCopy({
        id:request.body.id,
        description:request.body.description,
        thumbnail:request.body.thumbnail,
        canonicalVolumeLink:request.body.canonicalVolumeLink,
        title:request.body.title,
        subtitle:request.body.subtitle
    });
    book.save()
    .then(data => response.json(data))
    .catch(error => response.json(error));
    
});

router.put('/deleteBooksById/:id', async (request, response) => {
    bookTemplateCopy.deleteOne({id : request.params.id})
    .then(data => response.json(data))
    .catch(error => response.json(error));
    
});

router.get('/getSavedBooksById/:ids', async (request, response) => {
    const ids = request.params.ids.split(',');
    bookTemplateCopy
        .find()
        .where('id').in(ids)
        .then(data => response.json(data))
        .catch(error => response.json(error));
        
});

router.get('/getAllSavedBooks', async (request, response) => {
    bookTemplateCopy
        .find()
        .then(data => response.json(data))
        .catch(error => response.json(error));
        
});

module.exports = router;