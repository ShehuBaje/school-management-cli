const {readData, writeData} = require('../utils/file');
const STUDENTS_FILE = 'students.json';

class TeacherManager {
    static async assignGrade (studentId, subject, score) {
        const students = await readData(STUDENTS_FILE);
        const student = students.find(student => student.id === studentId);
        if (!student) throw new Error(`Student with ID ${studentId} not found.`);
        student.grades = student.grades || {};
        student.grades[subject] = score;
        await writeData(STUDENTS_FILE, students);
        return student;
    }

    static async viewStudents() {
        return await readData(STUDENTS_FILE);
    }
}

module.exports = TeacherManager;