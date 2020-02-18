const { User } = require('../models');

module.exports = {

    async index(req, res ){
        const users =  await User.findAll();

        return res.json(users);
    },

    async view(req, res ){
        const user =  await User.findOne({ where: { id: req.params.id } });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        return res.json(user);
    },

    async store(req, res) {
        const { name, email, password } = req.body;

        try {
            const user = await User.create({ name, email, password });
            return res.json(user);
        } catch (err) {
            return res.status(401).json({ err, email })
        }
    },

    async update(req, res) {
        const { name, email, password } = req.body;

        try {
            const user = await User.findOne({ where: { id: req.params.id } });
            user.name = name;
            user.email = email;
            user.password = password;
            await user.save({ fields: ['name', 'email', 'password'] });
            return res.json(user);
        } catch (err) {
            return res.status(401).json({ err, email })
        }
    },

    async destroy(req, res) {
        const { name, email, password } = req.body;

        try {
            const user = await User.findOne({ where: { id: req.params.id } });
            await user.destroy();
            return res.json(user);
        } catch (err) {
            return res.status(401).json({ err, email })
        }
    }
};