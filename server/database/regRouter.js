const express = require('express');
const session = require('express-session');
const User = require('./schemas/Registeration');
const db = require('./db');
const bcrypt = require('bcrypt');
const regRouter = express.Router();

regRouter.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // Set the session timeout in milliseconds (e.g., 1 minute)
}));


regRouter.param('id', async (req, res, next, id) => {
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


regRouter.post('/signup', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
    
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Username already exists' });
        }
        
        // Hashing process
        const hashedPassword = await bcrypt.hash(password, 10);


        // create a new user object
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            datereg: new Date() 
        });

        await newUser.save();
    
        req.session.user = newUser;
        newUser.isLoggedIn = true;
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
  
      // Find the user by email and password (consider hashing passwords in a real-world scenario)
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const passwordValidation = await bcrypt.compare(password, user.password);
      if(!passwordValidation){
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      req.session.user = user;
      user.isLoggedIn = true;
      await user.save();
      
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Sign-in failed' });
    }
});

regRouter.put('/users/edit/:id', async (req, res) => {
    try {
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
  

    


module.exports = regRouter;