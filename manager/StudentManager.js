const {readData} = require('../utils/file');
const STUDENTS_FILE = 'students.json';

class StudentManager{
    static async viewMyScore(studentId) {
        const students = await readData(STUDENTS_FILE);
        const student = students.find(student => student.id === studentId);
        if (!student) throw new Error(`Student with ID ${studentId} not found.`);
        return student.grades || {};
    }
}

module.exports = StudentManager;