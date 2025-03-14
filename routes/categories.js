var express = require('express');
var router = express.Router();
let categoriesSchema = require('../schema/category');

router.get('/', async function(req, res, next) {
    let categories = await categoriesSchema.find();
    res.send(categories);
});

router.get('/:id', async function(req, res, next) {
    try {
        let categories = await categoriesSchema.findById(req.params.id);
        res.send({
            success:true,
            data:categories
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});

router.post('/', async function(req, res, next) {
    try {
        let body = req.body;
        let newCategory = categoriesSchema({
            name:body.name,
            description:body.description
        });
        await newCategory.save()
        res.status(200).send({
            success:true,
            data:newCategory
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});

router.put('/:id', async function(req, res, next) {
    try {
        let body = req.body;
        let updatedObj = {}
        if(body.name){
            updatedObj.name = body.name
        }
        if(body.description){
            updatedObj.description = body.description
        }
        let updatedCategory =  await categoriesSchema.findByIdAndUpdate(req.params.id,updatedObj,{new:true})
        res.status(200).send({
            success:true,
            data:updatedCategory
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});
router.delete('/:id', async function(req, res, next) {
    try {
        let body = req.body;
        let updatedCategory =  await categoriesSchema.findByIdAndUpdate(req.params.id,{
            isDeleted:true
        },{new:true})
        res.status(200).send({
            success:true,
            data:updatedCategory
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});

module.exports = router;