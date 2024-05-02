const express = require('express');
const Cart = require('../schemas/Cart');
require('../db');
const cartRouter = express.Router();
const verifyToken = require('../../middleware/auth');



cartRouter.use(verifyToken);

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

cartRouter.post('/add', async (req, res) => {
    try {
        const { id, items } = req.body;
        const user = await Cart.findById(id);

        if (!user) {
            const error = new Error();
            error.message = 'User not found';
            error.code = 404;
            throw error;
        }

        const existingObjects = user.items.filter(obj => obj.title === items.title);

        if (existingObjects.length > 0) {
            const hasSameSize = existingObjects.some(obj => obj.size === items.size);
            
            if (!hasSameSize) {
                user.items.push(items);
            } else {
                const error = new Error();
                error.message = 'Items with the same title and size already exist in the cart.';
                error.code = 409;
                throw error;
            }
        } else {
            user.items.push(items);
        }

        await user.save();

        res.status(201).json({ message: 'Item(s) added to cart' });
    } catch (error) {
        console.error(error.message);
        res.status(error.code || 500).json({
            message: error.message || 'Internal Server Error',
        });
    }
});

cartRouter.delete('/delete/:userId/:itemId', async (req, res) => {
    try {
        const { itemId, userId } = req.params;
        const user = await Cart.findById(userId);

        if (!user) {
            const error = new Error();
            error.message = 'User not found';
            error.code = 404;
            throw error;
        }

        const itemIndex = user.items.findIndex(item => item.id.toString() === itemId);

        if (itemIndex === -1) {
            const error = new Error();
            error.message = 'Item not found in the user\'s cart';
            error.code = 404;
            throw error;
        }

        user.items.splice(itemIndex, 1);

        await user.save();

        res.status(200).json({ itemId: itemId });
    } catch (error) {
        console.error(error.message);
        res.status(error.code || 500).json({
            message: error.message || 'Internal Server Error',
        });
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