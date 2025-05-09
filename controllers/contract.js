const Contract = require('../schemas/Contract');
const Employee = require('../schemas/Employee');
const mongoose = require('mongoose');

module.exports = {
    createContract: async (body) => {
        try {
            const employee = await Employee.findOne({ employeeCode: body.employeeCode });
            if (!employee) throw new Error('Employee not found');
            const contract = new Contract({
                employee: employee._id,
                contractType: body.contractType,
                startDate: body.startDate,
                endDate: body.endDate,
                salary: body.salary
            });
            return await contract.save();

        } catch (err) {
            throw new Error(err.message);
        }
    },
    getAllContracts: async () => {
        try {
            const contracts = await Contract.find().populate('employee');
            return contracts;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    getContractById: async (req, res) => {
        try {
            const contract = await Contract.findById(req.params.id).populate('employee');
            if (!contract) return res.status(404).json({ message: 'Contract not found' });
            res.json(contract);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    updateContract: async (req, res) => {
        try {
            const updated = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updated) return res.status(404).json({ message: 'Contract not found' });
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    deleteContract: async (req, res) => {
        try {
            const deleted = await Contract.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Contract not found' });
            res.json({ message: 'Deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getContractsByEmployeeId: async (id) => {
        try {
            // Validate the ID format
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid employee ID format');
            }
            // Find contracts by employee ID
            const contracts = await Contract.findOne({ employee: id }).populate('employee');
            if (!contracts) throw new Error('Contracts not found for this employee');
            return contracts;
        } catch (err) {
            // Handle any errors that occur during the process
            console.error('Error:', err.message);
            throw new Error(err.message);
        }
    },

}