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
exports.renderProjects = exports.projects = void 0;
const projectService_1 = require("../API/projectService");
const form_1 = require("./form");
exports.projects = [];
const renderProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.projects = yield (0, projectService_1.fetchProjects)();
    const mainBody = document.querySelector('.mainBody');
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
    exports.projects.forEach((project) => {
        var _a, _b;
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${project.name}</td>
      <td>${project.description}</td>
      <td>${project.assignedUser}</td>
      <td>${project.endDate}</td>
      <td>
        <div class="actions">
          <ion-icon name="create-outline" class="editBtn" ></ion-icon>
          <ion-icon name="trash-outline" class="deleteBtn"></ion-icon>
        </div>
      </td>`;
        table.appendChild(row);
        (_a = row.querySelector('.editBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => (0, form_1.renderProjectFormModal)(project));
        (_b = row.querySelector('.deleteBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => handleDeleteProject(project.projectId));
    });
    mainBody.appendChild(table);
});
exports.renderProjects = renderProjects;
const handleDeleteProject = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, projectService_1.deleteProject)(projectId);
        exports.projects = exports.projects.filter(project => project.projectId !== projectId);
        (0, exports.renderProjects)();
    }
    catch (error) {
        console.error('Error deleting project:', error);
    }
});
