const express = require('express');
const router = express.Router();
const userController = require('../services/user'); // adjust path if different

// Routes
router.post('/users', userController.createUser);        
router.get('/users', userController.getAllUsers);       
router.get('/users/:id', userController.getUserById);  
router.put('/users/:id', userController.updateUser);     
router.delete('/users/:id', userController.deleteUser);  

// Auth route
router.post('/login', userController.loginUser);        

module.exports = router;
