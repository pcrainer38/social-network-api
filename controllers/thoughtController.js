const  { Thought, User } = require('../models')

module.exports = {
    // Get thoughts by user
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate({ 
                _id: req.body.userId
            }, {
                $push: { 
                    thoughts: thought._id
                }
            })
            res.json(thought);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID '});
            }

            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID! '});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
        // Add reaction
        async addReaction(req, res) {
            try {
                const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $addToSet: { 
                        reactions: req.body
                    } },
                    { runValidators: true, new: true }
                );
    
                if (!thought) {
                    res.status(404).json({ message: 'No thought with that ID! '});
                }
    
                res.json(thought);
            } catch (err) {
                res.status(500).json(err);
            }
        },
            // Delete Reactions
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: {
                    reactions: req.body
                } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID! '});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

