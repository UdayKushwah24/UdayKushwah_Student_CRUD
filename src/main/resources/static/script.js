const API_BASE_URL = 'http://localhost:8080';

const studentForm = document.getElementById('studentForm');
const studentIdField = document.getElementById('studentId');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const courseField = document.getElementById('course');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const refreshBtn = document.getElementById('refreshBtn');
const studentsTableBody = document.getElementById('studentsTableBody');
const message = document.getElementById('message');

let editingStudentId = null;

function setMessage(text, isError = false) {
    message.textContent = text;
    message.classList.toggle('error', isError);
}

function resetForm() {
    studentForm.reset();
    studentIdField.value = '';
    editingStudentId = null;
    submitBtn.textContent = 'Add Student';
    cancelBtn.classList.add('hidden');
}

function populateForm(student) {
    editingStudentId = student.id;
    studentIdField.value = student.id;
    nameField.value = student.name;
    emailField.value = student.email;
    courseField.value = student.course;
    submitBtn.textContent = 'Update Student';
    cancelBtn.classList.remove('hidden');
    nameField.focus();
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function renderStudents(students) {
    if (!students.length) {
        studentsTableBody.innerHTML = '<tr><td colspan="5" class="empty-state">No students found.</td></tr>';
        return;
    }

    studentsTableBody.innerHTML = students
        .map((student) => `
            <tr>
                <td>${student.id}</td>
                <td>${escapeHtml(student.name)}</td>
                <td>${escapeHtml(student.email)}</td>
                <td>${escapeHtml(student.course)}</td>
                <td>
                    <div class="actions-cell">
                        <button class="action-btn edit-btn" data-action="edit" data-id="${student.id}">Edit</button>
                        <button class="action-btn delete-btn" data-action="delete" data-id="${student.id}">Delete</button>
                    </div>
                </td>
            </tr>
        `)
        .join('');
}

async function loadStudents() {
    try {
        setMessage('Loading students...');
        const response = await fetch(`${API_BASE_URL}/students`);
        if (!response.ok) {
            throw new Error(`Failed to load students: ${response.status}`);
        }

        const students = await response.json();
        renderStudents(students);
        setMessage(`Loaded ${students.length} student${students.length === 1 ? '' : 's'}.`);
    } catch (error) {
        console.error(error);
        studentsTableBody.innerHTML = '<tr><td colspan="5" class="empty-state">Unable to load students.</td></tr>';
        setMessage('Unable to load students from the backend.', true);
    }
}

async function saveStudent(event) {
    event.preventDefault();

    const student = {
        name: nameField.value.trim(),
        email: emailField.value.trim(),
        course: courseField.value.trim()
    };

    if (!student.name || !student.email || !student.course) {
        setMessage('All fields are required.', true);
        return;
    }

    const isEditing = editingStudentId !== null;
    const endpoint = isEditing
        ? `${API_BASE_URL}/students/${editingStudentId}`
        : `${API_BASE_URL}/students`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
        const response = await fetch(endpoint, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        setMessage(isEditing ? 'Student updated successfully.' : 'Student added successfully.');
        resetForm();
        await loadStudents();
    } catch (error) {
        console.error(error);
        setMessage('Could not save the student record.', true);
    }
}

async function deleteStudent(id) {
    const confirmed = window.confirm('Delete this student record?');
    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/students/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Delete failed with status ${response.status}`);
        }

        if (editingStudentId === id) {
            resetForm();
        }

        setMessage('Student deleted successfully.');
        await loadStudents();
    } catch (error) {
        console.error(error);
        setMessage('Could not delete the student record.', true);
    }
}

studentsTableBody.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);
    const action = button.dataset.action;
    const studentRow = button.closest('tr');
    const student = {
        id,
        name: studentRow.children[1].textContent,
        email: studentRow.children[2].textContent,
        course: studentRow.children[3].textContent
    };

    if (action === 'edit') {
        populateForm(student);
    }

    if (action === 'delete') {
        deleteStudent(id);
    }
});

studentForm.addEventListener('submit', saveStudent);
cancelBtn.addEventListener('click', () => {
    resetForm();
    setMessage('Edit cancelled.');
});
refreshBtn.addEventListener('click', loadStudents);

document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
});
