const express = require('express');
const User = require('./schemas/Registeration');
require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const regRouter = express.Router();
const verifyToken = require('../middleware/auth')



regRouter.post('/signup', async (req, res) => {
  try {
      const { name, email, phone, password } = req.body;
  
      if (!(email && password && name && phone)) {
        res.status(400).send("All input is required");
      }

      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).send('email already exists. Please Login');
      }
      
      // Hashing process
      const hashedPassword = await bcrypt.hash(password, 10);


      // create a new user object
      const newUser = await User.create({
          name: name.toString(),
          email: email.toString().toLowerCase(),
          phone: Number(phone),
          password: hashedPassword,
          datereg: new Date() 
      });

      newUser.isLoggedIn = false;
      await newUser.save();
      res.json(newUser);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Sign-up failed' });
  }
});

regRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    // Find the user by email 
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const passwordValidation = await bcrypt.compare(password, user.password);

    if (user && passwordValidation) {
      // Create token
      
      const token = jwt.sign(
        { userId: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      user.token = token;
      req.session.user = user;
      user.isLoggedIn = true;
      await user.save();

    }

    if(!passwordValidation){
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // await user.save();
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sign-in failed: Bad credentials!' });
  }
});

regRouter.post('/logout', async (req, res) => {
  try {
    const loggedInUser = await User.findOne({ isLoggedIn: true });

    if (!loggedInUser) {
      return res.status(404).json({ error: 'No logged-in user found' });
    }

    req.session.destroy();
    loggedInUser.isLoggedIn = false;
    await loggedInUser.save();

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

regRouter.use(verifyToken);

regRouter.param('id', async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

regRouter.get('/users', async (req, res) => {
  try {
    // Verify the user's token before proceeding
    // This ensures that only authenticated users can access this route

    // Fetch all users from the database
   const allUsers = 
    await User.find({}, 'name email token')
    .then(users => {
      // Users with only name and email fields
      return users;
    })
  .catch(err => {
    console.error(err);
    // Handle the error
  });
    // Get information about the currently authenticated user
    const authenticatedUser = req.session.user;

    // Return list of all users and information about the authenticated user
    res.json({
      allUsers,
      authenticatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

regRouter.post('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract titles of existing items
    const existingTitles = user.savedItems.map(item => item.title);

    // Filter out items from req.body that already exist
    const newItems = Object.entries(req.body).reduce((acc, [key, value]) => {
      if (!existingTitles.includes(value.title)) {
        acc[key] = value;
      }
      return acc;
    }, {});

    // Add only the new items to savedItems
    user.savedItems.push(...Object.values(newItems));

    await user.save();
    return res.status(201).send('Items saved to user');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save items to user' });
  }
});

regRouter.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




regRouter.put('/users/edit/:id', async (req, res) => {
    try {
      const userId = req.user._id;

      if (req.params.id !== userId.toString()) {
        return res.status(403).json({ error: 'Unauthorized: You are not allowed to edit this user' });
      }
      const userToUpdate = req.user;

      const updatedUserData = req.body;
  
      // Update user data
      userToUpdate.name = updatedUserData.name || userToUpdate.name;
      userToUpdate.email = updatedUserData.email || userToUpdate.email;
      userToUpdate.phone = updatedUserData.phone || userToUpdate.phone;
      userToUpdate.password = updatedUserData.password || userToUpdate.password;
      userToUpdate.datereg = updatedUserData.datereg || userToUpdate.datereg;
  
      await userToUpdate.save();
  
      res.json(userToUpdate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Edit user failed' });
    }
});


  

    


module.exports = regRouter;