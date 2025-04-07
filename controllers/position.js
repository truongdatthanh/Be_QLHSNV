const Position = require('../schemas/Position');

module.exports = {
    createPosition: async (body) => {
        try {
            const position = new Position(body);
            return await position.save();
        } catch (err) {
            throw new Error(err.message);
        }
    },

    getAllPositions: async () => {
        try {
            const positions = await Position.find({});
            return positions;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    getPositionById: async (req, res) => {
        try {
            const position = await Position.findById(req.params.id);
            if (!position) return res.status(404).json({ message: 'Position not found' });
            res.json(position);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updatePosition: async (req, res) => {
        try {
            const updated = await Position.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updated) return res.status(404).json({ message: 'Position not found' });
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    deletePosition: async (req, res) => {
        try {
            const deleted = await Position.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Position not found' });
            res.json({ message: 'Deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
}
