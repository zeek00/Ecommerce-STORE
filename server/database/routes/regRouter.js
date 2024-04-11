const express = require('express');
const User = require('../schemas/Registeration');
const Cart = require('../schemas/Cart');
const Liked = require('../schemas/Likes');
require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const regRouter = express.Router();
const verifyToken = require('../../middleware/auth')



regRouter.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!(email && password && name && phone)) {
      const error = new Error();
      error.code = 400;
      error.message = 'All input is required';
      throw error;
    }

    const emailRegex = /^[^\s@]++@(?:[^\s@]++\.)++[^\s@]++$/;

    if(!emailRegex.test(email.toString())){
      const error = new Error();
      error.code = 400;
      error.message = 'Invalid Email format';
      throw error;
    }

    const phoneNumberRegex = /^\d{10,}$/;

    if(!phoneNumberRegex.test(phone.toString())){
      const error = new Error();
      error.code = 400;
      error.message = 'Invalid Phone format';
      throw error;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if(!passwordRegex.test(password.toString())){
      const error = new Error();
      error.code = 400;
      error.message = 'Password should contain a capital letter a number and at least 8 characters.';
      throw error;
    }
    const existingUser = await User.findOne({ email: email.toString() });
    if (existingUser) {
      
      const error = new Error();
      error.code = 409;
      error.message = 'Email already exists. Please Login'
      throw error
    }

    const existingPhone = await User.findOne({ phone: Number(phone) });

    if (existingPhone) {
      const error = new Error();
      error.code = 409;
      error.message = 'Phone number already exists. Please Modify';
      throw error
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name.toString(),
      email: email.toString().toLowerCase(),
      phone: Number(phone),
      password: hashedPassword,
      role: "user",
      datereg: new Date()
    });

    const newCartItem = await Cart.create({
      _id: newUser._id,
      items: []
    });

    const newLikedItem = await Liked.create({
      _id: newUser._id,
      items: []
    });

    await newUser.save();
    await newCartItem.save();
    await newLikedItem.save();
    res.send('success');
    
  }catch (error) {
    console.error(error.message);
    res.status(error.code || 500).json({
      message: error.message || 'Internal Server Error',
    });
  }
});

regRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!(email && password)) {
      const error = new Error();
      error.code = 400;
      error.message = 'All input is required';
      throw error;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error();
      error.code = 401;
      error.message = 'Email does not exist';
      throw error;
    }

    const passwordValidation = await bcrypt.compare(password, user.password);

    if(!passwordValidation){
      const error = new Error();
      error.code = 401;
      error.message = 'Password Incorrect';
      throw error;    
    }
    
    if (user && passwordValidation) {
      const token = jwt.sign(
        { userId: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
      );
      user.token = token;
      req.session.user = user;
      await user.save();
      res.json({
        accessToken: token,
        user:{
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      });

    }
    
  } catch (error) {
    console.error(error.message);
    res.status(error.code || 500).json({
      message: error.message || 'Internal Server Error',
    });
  }
});


regRouter.use(verifyToken);

regRouter.param('id', async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      const error = new Error();
      error.code = 404;
      error.message = 'User with id not found';
      throw error;  
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
    console.error(error);
  }
});

regRouter.get('/user', async (req, res) => {
  try {
    const users = await User.find({}, 'name email token');
    
    if (!users || users.length === 0) {
      const error = new Error();
      error.message = 'User not found';
      error.code = 404;
      throw error;
    }

    const authenticatedUser = req.session.user;

    res.json({
      users,
      authenticatedUser,
    });
  } catch (error) {
    console.error(error.message);
    res.status(error.code || 500).json({
      message: error.message || 'Internal Server Error',
    });
  }
});



regRouter.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error();
      error.message = 'User not found';
      error.code = 404;
      throw error;
    }

    res.json(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    );

  } catch (error) {
    console.error(error.message);
    res.status(error.code || 500).json({
      message: error.message || 'Internal Server Error',
    });
  }
});

regRouter.put('/users/edit/:id', async (req, res) => {
    try {
      const userId = req.user._id;

      if (req.params.id !== userId.toString()) {
        const error = new Error();
        error.message = 'Unauthorized: You are not allowed to edit this user';
        error.code = 403;
        throw error;
      }
      const userToUpdate = req.user;

      const updatedUserData = req.body;
  
      userToUpdate.name = updatedUserData.name || userToUpdate.name;
      userToUpdate.email = updatedUserData.email || userToUpdate.email;
      userToUpdate.phone = updatedUserData.phone || userToUpdate.phone;
      userToUpdate.password = updatedUserData.password || userToUpdate.password;
      userToUpdate.datereg = updatedUserData.datereg || userToUpdate.datereg;
  
      await userToUpdate.save();
  
      res.json(userToUpdate);
    } catch (error) {
      console.error(error.message);
      res.status(error.code || 500).json({
        message: error.message || 'Internal Server Error',
      });
    }
});


  

    


module.exports = regRouter;