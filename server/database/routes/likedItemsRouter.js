const express = require('express');
const Likes = require('../schemas/Likes');
require('../db');
const likesRouter = express.Router();
const verifyToken = require('../../middleware/auth');



likesRouter.use(verifyToken);

likesRouter.param('id', async(req, res, next, id) => {
    try {
        const user = await Likes.findById(id);

        if(!user){
            const error = new Error();
            error.message = 'User with id not found';
            error.code = 404;
            throw error;
        }
        let userId = user._id.toString();
        req.userId = userId;
        next();

    } catch (error){
        next(error);
    }
});

likesRouter.post('/add', async (req, res) => {
    try {
        const { id, items } = req.body;
        const user = await Likes.findById(id);

        if (!user) {
            const error = new Error();
            error.message = 'User not found';
            error.code = 404;
            throw error;
        }
  
      const existingTitles = user.items.map(item => item.title);
  
      const newItems = Object.entries(items).reduce((acc, [key, value]) => {
        if (!existingTitles.includes(value.title)) {
          acc[key] = value;
        }
        return acc;
      }, {});
  
      user.items.push(...Object.values(newItems));
  
      await user.save();
      return res.status(201).send('Items saved to user');
    } catch (error) {
      console.error(error.message);
      res.status(error.code || 500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  });

  likesRouter.delete('/delete/:userId/:itemId', async (req, res) => {
    try {
        const { itemId, userId } = req.params;
        console.log(userId)

        const user = await Likes.findById(userId);

        if (!user) {
            const error = new Error();
            error.message = 'User not found';
            error.code = 404;
            throw error;
        }

        const itemIndex = user.items.findIndex(item => item.id.toString() === itemId);

        if (itemIndex === -1) {
            const error = new Error();
            error.message = 'Item not found in the user\'s Liked Items';
            error.code = 404;
            throw error;
        }

        user.items.splice(itemIndex, 1);

        await user.save();

        res.status(200).json({message: `itemId: ${itemId} has been successfully deleted `});
    } catch (error) {
        console.error(error.message);
        res.status(error.code || 500).json({
            message: error.message || 'Internal Server Error',
        });
    }
});

likesRouter.get('/users/:id',async (req, res)=>{
    try{
        const userId = req.userId;
        const user = await Likes.findById(userId);
        if (!user) {
            const error = new Error();
            error.message = 'User not found';
            error.code = 404;
            throw error; 
        }
        if(user.items === 0){
            const error = new Error();
            error.message = 'User Liked Empty';
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


module.exports = likesRouter;