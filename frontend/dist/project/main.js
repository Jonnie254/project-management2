"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projects = exports.users = void 0;
const dashboard_1 = require("./components/dashboard");
const projects_1 = require("./components/projects");
const users_1 = require("./components/users");
const settings_1 = require("./components/settings");
exports.users = [];
exports.projects = [];
document.addEventListener('DOMContentLoaded', () => {
    var _a;
    const modalOverlay = document.querySelector('.modal-overlay');
    const links = document.querySelectorAll('.links a');
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            links.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
            switch (link.id) {
                case 'dashboardLink':
                    (0, dashboard_1.renderDashboard)();
                    break;
                case 'projectsLink':
                    (0, projects_1.renderProjects)();
                    break;
                case 'usersLink':
                    (0, users_1.renderUsers)();
                    break;
                case 'settingsLink':
                    (0, settings_1.renderSettings)();
                    break;
            }
        });
    });
    // Default to dashboard
    (_a = document.getElementById('dashboardLink')) === null || _a === void 0 ? void 0 : _a.click();
});
