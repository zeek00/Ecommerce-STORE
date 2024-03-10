const express = require('express');
const Cart = require('./schemas/Cart');
require('./db');
const cartRouter = express.Router();
const verifyToken = require('../middleware/auth');



cartRouter.use(verifyToken);


cartRouter.post('/add', async (req, res) => {
    try {
        const { id, items } = req.body;
        console.log(id)
        console.log(items)
        // Check if the user with the specified ObjectId exists
        const user = await Cart.findById(id);

        if (!user) {
            const error = new Error();
            error.message = 'User not found';
            error.code = 404;
            throw error;
        }

        // Update the items array for the found user
        const existingObjects = user.items.filter(obj => obj.title === items.title);

        if (existingObjects.length > 0) {
            // Object with the same title found
            const hasSameSize = existingObjects.some(obj => obj.size === items.size);
            
            if (!hasSameSize) {
                // No object with the same title and size found, add the incoming items
                user.items.push(items);
            } else {
                // Object with the same title and size already exists, throw an error
                const error = new Error();
                error.message = 'Items with the same title and size already exist in the cart.';
                error.code = 409;
                throw error;
            }
        } else {
            // Items with the same title not found, add the incoming items
            user.items.push(items);
        }

        // Save the updated user document
        await user.save();

        res.status(201).json({ message: 'Item(s) added to cart' });
    } catch (error) {
        console.error(error.message);
        res.status(error.code || 500).json({
            message: error.message || 'Internal Server Error',
        });
    }
});


cartRouter.param('id', async (req, res, next, id) => {
    try {
        const user = await Cart.findById(id);
  
        if (!user) {
            const error = new Error();
            error.message = 'User with id not found';
            error.code = 404;
            throw error;      
        }
        let userId = user._id.toString();
        req.userId = userId;

      next();
    } catch (error) {
      next(error);
    }
});


cartRouter.get('/users/:id',async (req, res)=>{
    try{
        const userId = req.userId;
        const user = await Cart.findById(userId);
        if (!user) {
            const error = new Error();
            error.message = 'User not found';
            error.code = 404;
            throw error; 
        }
        if(user.items === 0){
            const error = new Error();
            error.message = 'User Cart Empty';
            error.code = 404;
            throw error; 
        }
        res.status(200).json({
            items: user.items
        });
    } catch (error) {
        console.error(error.message);
        res.status(error.code || 500).json({
            message: error.message || 'Internal Server Error',
        });
    }

});






module.exports = cartRouter;