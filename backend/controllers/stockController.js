const Task = require('../models/Task');

const getStocks = async (req, res) => {
    try {
        const stocks = await Task.find({ userId: req.user.id });

        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const buyStocks = async (req, res) => {
    const { title, description, deadline } = req.body;
    
    try {
        const stock = await Task.create({ userId: req.user.id, title, description, deadline }); 
        res.status(201).json(stock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const viewStocks = async (req, res) => {
    const { title, description, completed, deadline } = req.body;

    try {
        const stock = await Task.findById(req.params.id);

        if (!stock) return res.status(404).json({ message: 'Stock not found' });

        stock.title = title || stock.title;
        stock.description = description || stock.description;
        stock.completed = completed ?? stock.completed;
        stock.deadline = deadline || stock.deadline;

        const updatedStock = await stock.save();

        res.json(updatedStock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const sellStocks = async (req, res) => {
    try {
        const stock = await Task.findByIdAndDelete(req.params.id);

        if (!stock) return res.status(404).json({ message: 'Stock not found' });

        res.json({ message: 'Stock sold successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getStocks,
    buyStocks,
    updateStocks,
    sellStocks
};