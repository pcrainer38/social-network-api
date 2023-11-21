const  ObjectId  = require('mongoose').Types;
const  { User }  = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            const userObj = { users };
            return res.json(userObj);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID'});
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // create new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
 
    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId })
            if (!user) {
                return res.status(404).json({ message: 'No such user exists'})
            } else {
                res.json({ message: 'User deleted!' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
      

    // Add a thought to a user
    async addFriend(req, res) {
        
            console.log('You are adding a friend');
            console.log(req.body);
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { runValidators: true, new: true}
            );
            if(!user) {
                return res
                .status(404)
                .json({ message: 'No user found with that ID'})
            }

            res.json(user);
        }   catch(err) {
            res.status(500).json(err);
            }
    },
    // remove thought from a user
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                .status(404)
                .json({ message: 'No user found with that ID'});
            }
             
            res.json(user);
        }   catch(err) {
            res.status(500).json(err);
        }
    },
};