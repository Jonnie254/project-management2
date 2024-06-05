"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Arrays to store projects and users
let projects = [];
let users = [];
// DOM elements
const backIcon = document.querySelector('.back-icon');
const projectLink = document.querySelector('.project-link');
const mainBody = document.querySelector('.main-body');
const createIcon = document.querySelector('.icon');
const modalOverlay = document.querySelector('.modal-overlay');
const nameInput = document.querySelector('#nameInput');
const descriptionInput = document.querySelector('#descriptionInput');
const endDateInput = document.querySelector('#endDateInput');
<<<<<<< Updated upstream
// Create a project
const addProject = (newProject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject),
        });
        if (response.ok) {
            const project = yield response.json();
            projects.push(project);
            renderProjects();
        }
        else {
            throw new Error('Failed to add project');
        }
    }
    catch (error) {
        console.error('Error adding project:', error);
    }
});
=======
>>>>>>> Stashed changes
// Fetch users from the server
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:3000/users');
    const data = yield response.json();
    return data;
});
// Fetch projects from the server
const fetchProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:3000/projects');
    const data = yield response.json();
    return data;
});
// Delete project
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:3000/projects/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to delete a project with id: ${id}`);
    }
    // Remove project from the array and re-render projects
    projects = projects.filter(project => project.id !== id);
    renderProjects();
});
// Update project
const updateProject = (id, updatedFields) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:3000/projects/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
    });
    if (!response.ok) {
        throw new Error(`Failed to update project with id ${id}`);
    }
    // Find the index of the project to be updated
    const index = projects.findIndex(project => project.id === id);
    // If the project is found, update it
    if (index !== -1) {
        projects[index] = Object.assign(Object.assign({}, projects[index]), updatedFields);
    }
    renderProjects(); // Re-render projects after update
});
// Populate the assign user dropdown with fetched users
const populateUsersDropdown = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let assignUserInput = document.querySelector('#assignUser');
        users = yield fetchUsers();
        assignUserInput.innerHTML = ''; // Clear existing options
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.email;
            option.textContent = user.fullname;
            if (user.id === 1) {
                option.selected = true;
            }
            assignUserInput.appendChild(option);
        });
    }
    catch (error) {
        console.log('Error fetching users:', error);
    }
});
// Render the project form modal
const renderProjectFormModal = (project) => {
    modalOverlay.innerHTML = '';
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    const closeIcon = document.createElement('ion-icon');
    closeIcon.setAttribute('name', 'close-circle-outline');
    closeIcon.className = 'close';
    closeIcon.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });
    const projectForm = document.createElement('form');
    projectForm.className = 'projectForm';
    // Name input
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.textContent = 'Name';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'nameInput';
    nameInput.placeholder = 'Name here ..';
    nameInput.value = project ? project.name : '';
    const nameError = document.createElement('p');
    nameError.className = 'error';
    nameError.id = 'nameError';
    nameLabel.appendChild(nameInput);
    nameLabel.appendChild(nameError);
    // Description input
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description';
    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'descriptionInput';
    descriptionInput.cols = 30;
    descriptionInput.rows = 5;
    descriptionInput.value = project ? project.description : '';
    const descriptionError = document.createElement('p');
    descriptionError.className = 'error';
    descriptionError.id = 'descriptionError';
    descriptionLabel.appendChild(descriptionInput);
    descriptionLabel.appendChild(descriptionError);
    // End date input
    const endDateLabel = document.createElement('label');
    endDateLabel.setAttribute('for', 'endDate');
    endDateLabel.textContent = 'End Date';
    const endDateInput = document.createElement('input');
    endDateInput.type = 'date';
    endDateInput.id = 'endDateInput';
    endDateInput.placeholder = 'End date here ..';
    endDateInput.value = project ? project.endDate : '';
    const endDateError = document.createElement('p');
    endDateError.className = 'error';
    endDateError.id = 'endDateError';
    endDateLabel.appendChild(endDateInput);
    endDateLabel.appendChild(endDateError);
    // Assign user dropdown
    const assignUserLabel = document.createElement('label');
    assignUserLabel.setAttribute('for', 'assignUser');
    assignUserLabel.textContent = 'Assign User';
    const assignUserSelect = document.createElement('select');
    assignUserSelect.id = 'assignUser';
    const assignUserError = document.createElement('p');
    assignUserError.className = 'error';
    assignUserError.id = 'assignUserError';
    assignUserLabel.appendChild(assignUserSelect);
    assignUserLabel.appendChild(assignUserError);
    // Submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'submitbtn';
    submitButton.textContent = project ? 'Update Project' : 'Create Project';
    // Success message
    const successMessage = document.createElement('p');
    successMessage.className = 'success';
    successMessage.id = 'successMessage';
    // Append elements to form
<<<<<<< Updated upstream
    projectForm.appendChild(successMessage);
=======
>>>>>>> Stashed changes
    projectForm.appendChild(nameLabel);
    projectForm.appendChild(descriptionLabel);
    projectForm.appendChild(endDateLabel);
    projectForm.appendChild(assignUserLabel);
<<<<<<< Updated upstream
=======
    projectForm.appendChild(successMessage);
>>>>>>> Stashed changes
    projectForm.appendChild(submitButton);
    // Append elements to modal content
    modalContent.appendChild(closeIcon);
    modalContent.appendChild(projectForm);
    // Append modal content to overlay
    modalOverlay.appendChild(modalContent);
    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleFormSubmission(project === null || project === void 0 ? void 0 : project.id);
    });
    modalOverlay.style.display = 'block';
    populateUsersDropdown(); // Populate user dropdown when the modal is rendered
};
// Handle form submission
const handleFormSubmission = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const nameInput = document.querySelector('#nameInput');
    const descriptionInput = document.querySelector('#descriptionInput');
    const endDateInput = document.querySelector('#endDateInput');
    const assignUserSelect = document.querySelector('#assignUser');
    const nameError = document.querySelector('#nameError');
    const descriptionError = document.querySelector('#descriptionError');
    const endDateError = document.querySelector('#endDateError');
    const assignUserError = document.querySelector('#assignUserError');
    const successMessage = document.querySelector('#successMessage');
    let isValid = true;
    // Reset error messages
    nameError.textContent = '';
    descriptionError.textContent = '';
    endDateError.textContent = '';
    assignUserError.textContent = '';
    successMessage.textContent = '';
    // Validate form inputs
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required';
        isValid = false;
    }
    if (!descriptionInput.value.trim()) {
        descriptionError.textContent = 'Description is required';
        isValid = false;
    }
    if (!endDateInput.value.trim()) {
        endDateError.textContent = 'End Date is required';
        isValid = false;
    }
    if (!assignUserSelect.value.trim()) {
        assignUserError.textContent = 'User assignment is required';
        isValid = false;
    }
    // If form is valid, post or update the project data
    if (isValid) {
        const projectData = {
            name: nameInput.value,
            description: descriptionInput.value,
            endDate: endDateInput.value,
            assignedUser: assignUserSelect.value,
        };
<<<<<<< Updated upstream
        try {
            if (id) {
                yield updateProject(id, projectData);
                successMessage.style.display = 'block';
                successMessage.textContent = 'project updated successfully';
            }
            else {
                //await addProject(projectData);
                successMessage.style.display = 'block';
                successMessage.textContent = 'project created successfully';
            }
=======
        console.log(projectData);
        try {
            if (id) {
                yield updateProject(id, projectData);
                successMessage.textContent = 'Project updated successfully!';
            }
            else {
                const response = yield fetch('http://localhost:3000/projects', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(projectData),
                });
                if (response.ok) {
                    const project = yield response.json();
                    projects.push(project);
                    successMessage.textContent = 'Project added successfully!';
                }
                else {
                    throw new Error('Failed to add project');
                }
            }
            successMessage.style.color = 'green';
>>>>>>> Stashed changes
            // Reset form
            const form = document.querySelector('.projectForm');
            form.reset();
            renderProjects();
            populateUsersDropdown(); // Refresh user dropdown to reflect assignment
        }
        catch (error) {
            console.error('Error handling project:', error);
        }
    }
});
// Render the projects section
const renderProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    projects = yield fetchProjects();
    mainBody.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'projectTable';
    const headerRow = document.createElement('tr');
    ['Name', 'Description', 'User', 'EndDate', 'Actions'].forEach((header) => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    projects.forEach((project) => {
        const row = document.createElement('tr');
        row.innerHTML = `
  
    <td>${project.name}</td>
    <td>${project.description}</td>
    <td>${project.assignedUser}</td>
    <td>${project.endDate}</td>
    <td>
      <div class="actions">
       
        <ion-icon name="create-outline" class="editBtn" data-id="${project.id}"></ion-icon>
      
        <ion-icon name="trash-outline" class="deleteBtn" data-id="${project.id}"></ion-icon>
      </div>
    </td>
  
  `;
        table.appendChild(row);
    });
    mainBody.appendChild(table);
    // Add event listeners for edit and delete buttons
    const editButtons = document.querySelectorAll('.editBtn');
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    editButtons.forEach(editButton => {
        editButton.addEventListener('click', () => {
            const id = editButton.dataset.id;
            const project = projects.find(proj => proj.id === id);
            if (project) {
                renderProjectFormModal(project);
            }
        });
    });
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = deleteButton.dataset.id;
            if (id) {
                try {
                    yield deleteProject(id);
                    // Render projects after deletion
                    renderProjects();
                }
                catch (error) {
                    console.error('Error deleting project:', error);
                }
            }
        }));
    });
});
// Render the dashboard section
const renderDashboard = () => {
    mainBody.innerHTML = `<div class="cards">
    <div class="card">
      <ion-icon name="card-outline" class="card-icon"></ion-icon>
      <p>Projects</p>
      <h2>${projects.length}</h2>
    </div>
    <div class="card">
      <ion-icon name="people-outline" class="card-icon"></ion-icon>
      <p>Users</p>
      <h2>${users.length}</h2>
    </div>
    <div class="card">
      <ion-icon name="timer-outline" class="card-icon"></ion-icon>
      <p>Time Spent</p>
      <h2>20HRS</h2>
    </div>
  </div>`;
};
// Render the users section
const renderUsers = () => {
<<<<<<< Updated upstream
    mainBody.innerHTML = '<h1>Users</h1>';
=======
    mainBody.innerHTML = '<h1>Users Section</h1> <p>This is the Users section.</p>';
>>>>>>> Stashed changes
};
// Render the settings section
const renderSettings = () => {
    mainBody.innerHTML = '<h1>Settings Section</h1> <p>This is the Settings section.</p>';
};
// Event listener for the "Create Project" icon
createIcon.addEventListener('click', () => {
    renderProjectFormModal();
});
// Event listeners for sidebar links
const links = document.querySelectorAll('.links a');
links.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.currentTarget.dataset.target;
        switch (target) {
            case 'dashboard':
                renderDashboard();
                break;
            case 'projects':
                renderProjects();
                break;
            case 'users':
                renderUsers();
                break;
            case 'settings':
                renderSettings();
                break;
            default:
                renderDashboard();
                break;
        }
    });
});
// Set default content to Dashboard on page load
<<<<<<< Updated upstream
//renderDashboard();
=======
renderDashboard();
>>>>>>> Stashed changes
