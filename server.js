import express from 'express';
import mongoose, { connection } from 'mongoose';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';
import cors from 'cors';
import User from './models/Users'

//  init express server
const app = express();


// Connect to DB
connectDatabase();




// schema





// Configure Middleware
app.use(express.json({extended: false}));

app.use(
    cors({
        origin: "http://localhost:3000",
        
    })
);

// API endpoints




/**
 * @route POST api/users
 * @desc Register user
 */
app.post(
    '/api/users',
    [
        check('user', 'Please enter your name').not().isEmpty(),
        check('pass', 'Please enter a password with 6 or more characters').isLength({ min: 6})
    ],

    (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            
            return res.status(422).json({errors: errors.array() });
        } else {
            const {user,pass} = req.body;
            user = new User({
                username: user,
                password: pass
                
            })


            user.save();
            res.send('success');
            return res.send(req.body);
        }
    }

    
);




// Connection listener
const port = 5000
app.listen(port, () => console.log(`Express server running on port ${port}`));

