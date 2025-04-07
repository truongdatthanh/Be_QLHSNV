const Education = require('../schemas/Education');
const Employee = require('../schemas/Employee');

module.exports = {
    getAllEducations: async function () {
        return await Education.find({}).populate('employee');
    },
    createEducation: async function (body) {
        const employee = await Employee.findOne({ employeeCode : body.employee});
        if (!employee) throw new Error('Employee not found');
        let newEdu = new Education({
            employee: employee._id,
            degree: body.degree,
            major: body.major,
            school: body.school,
            graduationYear: body.graduationYear
        });
        return await newEdu.save();
    },
    getEducationById: async function (id) {
        return await Education.findById(id).populate('employee');
    },
    updateEducation: async function (id, body) {
        try {
            const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updated) return res.status(404).json({ message: 'Not found' });
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    deleteEducation: async function (id) {
        return await Education.findByIdAndDelete(id);
    },
    getEducationsByEmployeeId: async function (employeeId) {
        return await Education.find({ employee: employeeId }).populate('employee');
    },
}



