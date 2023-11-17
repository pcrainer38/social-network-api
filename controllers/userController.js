const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            const userObj = {
                users
            };
            return res.json(userObj);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            // .select('-__v')
            // .lean();

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID'});
            }
            res.json({
                user,
                thought: await thought(req.params.userId),
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create new user
    async createUser(req, res) {
        try {
            const student = await User.create(req.body);
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
                console.log('User deleted.')
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
      

    // Add a thought to a user
    async addThought(req, res) {
        try {
            console.log('You are adding a thought');
            console.log(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { thoughts: req.body }},
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
    async removeThought(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { thought: { thoughtId: req.params.thoughtId }}},
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