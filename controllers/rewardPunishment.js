const RP = require('../schemas/RewardPunishment');
const Employee = require('../schemas/Employee');


module.exports = {
    createRP: async (body) => {
        try {
            const employee = await Employee.findOne({ employeeCode: body.employee });
            if (!employee) throw new Error('Employee not found');
            const record = new RP({
                employee: employee._id,
                type: body.type,
                reason: body.reason,
                date: body.date,
                note: body.note
            });
            return await record.save();

        } catch (err) {
            throw new Error(err.message);
        }
    },

    getAllRP: async () => {
        try {
            const list = await RP.find().populate('employee');
            return list;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    getRPById: async (req, res) => {
        try {
            const record = await RP.findById(req.params.id).populate('employee');
            if (!record) return res.status(404).json({ message: 'Not found' });
            res.json(record);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateRP: async (req, res) => {
        try {
            const updated = await RP.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updated) return res.status(404).json({ message: 'Not found' });
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    deleteRP: async (req, res) => {
        try {
            const deleted = await RP.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
}