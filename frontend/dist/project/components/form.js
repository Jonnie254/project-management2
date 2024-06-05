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
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateUsersDropdown = exports.renderProjectFormModal = void 0;
const projectService_1 = require("../API/projectService");
const userService_1 = require("../API/userService");
const projects_1 = require("./projects");
let users = [];
const renderProjectFormModal = (project) => {
    const modalOverlay = document.querySelector('.modal-overlay');
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
    // User dropdown
    const assignedUserLabel = document.createElement('label');
    assignedUserLabel.setAttribute('for', 'assignedUser');
    assignedUserLabel.textContent = 'Assign User';
    const assignedUserSelect = document.createElement('select');
    assignedUserSelect.id = 'assignedUserSelect';
    assignedUserSelect.value = project ? project.assignedUser : '';
    const assignedUserError = document.createElement('p');
    assignedUserError.className = 'error';
    assignedUserError.id = 'assignedUserError';
    assignedUserLabel.appendChild(assignedUserSelect);
    assignedUserLabel.appendChild(assignedUserError);
    // Submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.className = 'submitbtn';
    submitBtn.textContent = 'Save Project';
    projectForm.appendChild(nameLabel);
    projectForm.appendChild(descriptionLabel);
    projectForm.appendChild(endDateLabel);
    projectForm.appendChild(assignedUserLabel);
    projectForm.appendChild(submitBtn);
    // Attach form and close button to modal content
    modalContent.appendChild(closeIcon);
    modalContent.appendChild(projectForm);
    modalOverlay.appendChild(modalContent);
    modalOverlay.style.display = 'flex';
    submitBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = nameInput.value.trim();
        const description = descriptionInput.value.trim();
        const endDate = endDateInput.value;
        const assignedUser = assignedUserSelect.value;
        if (!name || !description || !endDate || !assignedUser) {
            if (!name)
                nameError.textContent = 'Name is required';
            if (!description)
                descriptionError.textContent = 'Description is required';
            if (!endDate)
                endDateError.textContent = 'End Date is required';
            if (!assignedUser)
                assignedUserError.textContent = 'Assigned User is required';
            return;
        }
        try {
            if (project && project.projectId) {
                yield (0, projectService_1.updateProject)(project.projectId, { name, description, endDate, assignedUser });
            }
            else {
                yield (0, projectService_1.createProject)({ name, description, endDate, assignedUser });
            }
            modalOverlay.style.display = 'none';
            (0, projects_1.renderProjects)();
        }
        catch (error) {
            console.error('Error saving project:', error);
        }
    }));
    // Populate users dropdown
    (0, userService_1.fetchUsers)().then(users => {
        (0, exports.populateUsersDropdown)(users, assignedUserSelect, (project === null || project === void 0 ? void 0 : project.assignedUser) || '');
    });
};
exports.renderProjectFormModal = renderProjectFormModal;
const populateUsersDropdown = (users, selectElement, selectedUserId) => {
    selectElement.innerHTML = '';
    users.forEach((user) => {
        const option = document.createElement('option');
        option.value = user.fullname;
        option.textContent = user.fullname;
        if (user.fullname === selectedUserId) {
            option.selected = true;
        }
        selectElement.appendChild(option);
    });
};
exports.populateUsersDropdown = populateUsersDropdown;
