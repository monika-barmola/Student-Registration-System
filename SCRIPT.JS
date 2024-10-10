document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addStudent();
});

function addStudent() {
    let name = document.getElementById('name').value;
    let studentID = document.getElementById('studentID').value;
    let className = document.getElementById('class').value;
    let rollNo = document.getElementById('rollNo').value;
    
    if (!name || !studentID || !className || !rollNo) {
        alert('All fields are required!');
        return;
    }

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push({ name, studentID, className, rollNo });
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
    clearForm();
}

function displayStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let tbody = document.getElementById('students');
    tbody.innerHTML = '';

    students.forEach((student, index) => {
        let row = `<tr>
                        <td>${student.name}</td>
                        <td>${student.studentID}</td>
                        <td>${student.className}</td>
                        <td>${student.rollNo}</td>
                        <td>
                            <button onclick="editStudent(${index})">Edit</button>
                            <button onclick="deleteStudent(${index})">Delete</button>
                        </td>
                   </tr>`;
        tbody.innerHTML += row;
    });
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('studentID').value = '';
    document.getElementById('class').value = '';
    document.getElementById('rollNo').value = '';
}

function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('studentID').value = student.studentID;
    document.getElementById('class').value = student.className;
    document.getElementById('rollNo').value = student.rollNo;

    deleteStudent(index);
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

window.onload = displayStudents;
