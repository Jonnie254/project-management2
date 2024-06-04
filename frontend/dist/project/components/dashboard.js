"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDashboard = void 0;
const main_1 = require("../main");
const renderDashboard = () => {
    const mainBody = document.querySelector('.mainBody');
    mainBody.innerHTML = `<div class="cards">
    <div class="card">
      <ion-icon name="card-outline" class="card-icon"></ion-icon>
      <p>Projects</p>
      <h2>${main_1.projects.length}</h2>
    </div>
    <div class="card">
      <ion-icon name="people-outline" class="card-icon"></ion-icon>
      <p>Users</p>
      <h2>${main_1.users.length}</h2>
    </div>
    <div class="card">
      <ion-icon name="timer-outline" class="card-icon"></ion-icon>
      <p>Time Spent</p>
      <h2>20HRS</h2>
    </div>
  </div>`;
};
exports.renderDashboard = renderDashboard;
