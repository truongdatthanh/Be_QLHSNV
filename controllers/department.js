const Department = require('../schemas/Department');

module.exports = {

    createDepartment: async (body) => {
        try {
            const department = new Department(body);
            return await department.save();
        } catch (err) {
            throw new Error(err.message);
        }
    },


    getAllDepartments: async (req, res) => {
        try {
            const departments = await Department.find();
            return departments;
        } catch (err) {
            throw new Error(err.message);
        }
    },


    getDepartmentById: async (req, res) => {
        try {
            const department = await Department.findById(req.params.id);
            if (!department) throw new Error('Department not found');
            return department;
        } catch (err) {
            throw new Error(err.message);
        }
    },


    updateDepartment: async (req, res) => {
        try {
            const updated = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updated) throw new Error('Department not found');
            return updated;
        } catch (err) {
            throw new Error(err.message);
        }
    },


    deleteDepartment: async (req, res) => {
        try {
            const deleted = await Department.findByIdAndDelete(req.params.id);
            if (!deleted) throw new Error('Department not found');
            return deleted;
        } catch (err) {
            throw new Error(err.message);
        }
    },
};

