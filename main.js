const prompt = require('prompt-sync')();
const UserManager = require('./manager/UserManager') ;
const StudentManager = require('./manager/StudentManager');
const TeacherManager = require('./manager/TeacherManager');

(async function() {
    try {
        console.log('Welcome To School Management System');
        const choice = prompt('Do you want to (1) Register (2) Login? ')

        let user;
        if (choice === '1') {
            const role = prompt('Enter role (admin, teacher, student: ');
            const name = prompt('Enter name: ');
            const email = prompt('Enter email: ');
            const password = prompt('Enter password: ');
            user = await UserManager.register(role, email, name, password);
            console.log('Registered successfully.', user);
        } else {
            const email = prompt ('Enter email: ');
            const password = prompt('Enter password: ');
            user = await UserManager.login(email, password);
            console.log(`Welcome back, ${user.name} (${user.role})`);
        }

        switch(user.role) {
            case 'admin': {
                console.log('Admin Options:');
                console.log('1. View Teachers');
                console.log('2. View Students');
                console.log('3. Delete User');
                const adminOpt = prompt('Select option: ');
                if (adminOpt === '1') console.log(await UserManager.getUserByRole('teacher'));
                else if (adminOpt === '2') console.log(await UserManager.getUserByRole('student'));
                else if (adminOpt === '3') {
                    const delId = Number(prompt('Enter user ID to delete: '));
                    await UserManager.deleteUserById(delId);
                    console.log('User deleted.')
                }
                break;
            }
            case 'teacher': {
                console.log('Teacher Options:');
                console.log('1. View Students');
                console.log('2. Assign Grade');
                const teacherOpt = prompt('Select option: ');
                if (teacherOpt === '1') console.log(await TeacherManager.viewStudents());
                else if (teacherOpt === '2') {
                    const id = Number(prompt('Enter student ID: '));
                    const subject = prompt('Enter Subject: ');
                    const score = Number(prompt('Enter score: '));
                    const updated = await TeacherManager.assignGrade(id, subject, score);
                    console.log('Updated:', updated)
                }
                break;
            }
            case 'student': {
                const scores = await StudentManager.viewMyScore(user.id);
                console.log('Your Scores:', scores);
                break;
            }
            default :
            console.log('Unknown Role.');
        }
    } catch (err) {
        console.error('Error:', err.message)
    }
})()