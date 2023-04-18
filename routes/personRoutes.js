const router = require('express').Router();
const Person = require('../models/Person');

router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body;

    if (!name) {
        return res.status(422).json({ error: "Name is mandatory" });
    }
    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person);
        return res.status(201).json({ message: 'Person saved successfully' });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        return res.status(200).json(people);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            return res.status(422).json({ message: 'User not found' });
        }
        return res.status(200).json(person);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    const { name, salary, approved } = req.body;

    const person = {
        name,
        salary,
        approved
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person);

        if (updatedPerson.matchedCount === 0) {
            return res.status(422).json({ message: 'User not found' });
        }
        return res.status(200).json(person);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            return res.status(422).json({ message: 'User not found' });
        }

        await Person.deleteOne({ _id: id });
        return res.status(200).json({ message: 'User removed successfully' })
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

module.exports = router;