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
exports.createProject = exports.updateProject = exports.deleteProject = exports.fetchProjects = void 0;
const baseUrl = 'http://localhost:3000/projects';
const fetchProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(baseUrl);
    const data = yield response.json();
    return data;
});
exports.fetchProjects = fetchProjects;
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to delete a project with id: ${id}`);
    }
});
exports.deleteProject = deleteProject;
const updateProject = (id, updatedFields) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${baseUrl}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
    });
    if (!response.ok) {
        throw new Error(`Failed to update project with id ${id}`);
    }
});
exports.updateProject = updateProject;
const createProject = (projectData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
    });
    if (!response.ok) {
        throw new Error('Failed to add project');
    }
    const project = yield response.json();
    return project;
});
exports.createProject = createProject;
