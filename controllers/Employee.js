let Employee = require('../schemas/Employee');
let Department = require('../schemas/Department');
let Position = require('../schemas/Position');

module.exports = {
    createEmployee: async (body) => {
        try {
            const department = await Department.findOne({ name: body.department });
            const position = await Position.findOne({ name: body.position });
            const newEmployee = new Employee({
                employeeCode: body.employeeCode,
                fullName: body.fullName,
                gender: body.gender,
                birthDate: body.birthDate,
                idCardNumber: body.idCardNumber,
                idCardIssueDate: body.idCardIssueDate,
                address: body.address,
                phoneNumber: body.phoneNumber,
                email:  body.email,
                maritalStatus: body.maritalStatus,
                department: department._id,
                position: position._id,
                status: body.status,
            });
            return await newEmployee.save();
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getAllEmployees: async () => {
        try {
            const employees = await Employee.find().populate('department', "name -_id").populate('position', "name -_id");
            return employees;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getEmployeeById: async (req, res) => {
        try {
            const employee = await Employee.findById(req.params.id).populate('department position');
            if (!employee) return res.status(404).json({ message: 'Employee not found' });
            res.json(employee);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },


    updateEmployee: async (req, res) => {
        try {
            const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updated) throw new Error('Employee not found');
            return updated;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    // Delete
    deleteEmployee: async (req, res) => {
        try {
            const deleted = await Employee.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Employee not found' });
            res.json({ message: 'Deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

}