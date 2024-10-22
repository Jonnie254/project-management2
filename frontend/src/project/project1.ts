interface Project {
  id?: string;
  name: string;
  description: string;
  endDate: string;
  assignedUser: string;
}

interface User {
  id?: number;
  fullname: string;
  email: string;
}

// Arrays to store projects and users
let projects: Project[] = [];
let users: User[] = [];

// DOM elements
const backIcon = document.querySelector('.back-icon') as HTMLButtonElement;
const projectLink = document.querySelector('.project-link') as HTMLLIElement;
const mainBody = document.querySelector('.main-body') as HTMLDivElement;
const createIcon = document.querySelector('.icon') as HTMLButtonElement;
const modalOverlay = document.querySelector('.modal-overlay') as HTMLDivElement;
const nameInput = document.querySelector('#nameInput') as HTMLInputElement;
const descriptionInput = document.querySelector('#descriptionInput') as HTMLTextAreaElement;
const endDateInput = document.querySelector('#endDateInput') as HTMLInputElement;

<<<<<<< Updated upstream
// Create a project
const addProject = async (newProject: Project) => {
  try {
    const response = await fetch('http://localhost:3000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    });

    if (response.ok) {
      const project = await response.json();
      projects.push(project);
      renderProjects();
    } else {
      throw new Error('Failed to add project');
    }
  } catch (error) {
    console.error('Error adding project:', error);
  }
};

=======
>>>>>>> Stashed changes
// Fetch users from the server
const fetchUsers = async () => {
  const response = await fetch('http://localhost:3000/users');
  const data = await response.json();
  return data;
};

// Fetch projects from the server
const fetchProjects = async () => {
  const response = await fetch('http://localhost:3000/projects');
  const data = await response.json();
  return data;
};

// Delete project
const deleteProject = async (id: string) => {
  const response = await fetch(`http://localhost:3000/projects/${id}`, {
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
}

// Update project
const updateProject = async (
  id: string,
  updatedFields: Partial<Project>
): Promise<void> => {
  const response = await fetch(`http://localhost:3000/projects/${id}`, {
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
    projects[index] = { ...projects[index], ...updatedFields };
  }

  renderProjects(); // Re-render projects after update
};
  

// Populate the assign user dropdown with fetched users
const populateUsersDropdown = async () => {
  try {
    let assignUserInput = document.querySelector('#assignUser') as HTMLSelectElement;
    users = await fetchUsers();

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
  } catch (error) {
    console.log('Error fetching users:', error);
  }
};

// Render the project form modal
const renderProjectFormModal = (project?: Project) => {
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

  projectForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    handleFormSubmission(project?.id);
  });

  modalOverlay.style.display = 'block';
  populateUsersDropdown(); // Populate user dropdown when the modal is rendered
};

// Handle form submission
const handleFormSubmission = async (id?: string) => {
  const nameInput = document.querySelector('#nameInput') as HTMLInputElement;
  const descriptionInput = document.querySelector('#descriptionInput') as HTMLTextAreaElement;
  const endDateInput = document.querySelector('#endDateInput') as HTMLInputElement;
  const assignUserSelect = document.querySelector('#assignUser') as HTMLSelectElement;

  const nameError = document.querySelector('#nameError') as HTMLParagraphElement;
  const descriptionError = document.querySelector('#descriptionError') as HTMLParagraphElement;
  const endDateError = document.querySelector('#endDateError') as HTMLParagraphElement;
  const assignUserError = document.querySelector('#assignUserError') as HTMLParagraphElement;
<<<<<<< Updated upstream

  const successMessage = document.querySelector('#successMessage') as HTMLParagraphElement;
 
=======
  const successMessage = document.querySelector('#successMessage') as HTMLParagraphElement;
>>>>>>> Stashed changes

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
    const projectData: Partial<Project> = {
      name: nameInput.value,
      description: descriptionInput.value,
      endDate: endDateInput.value,
      assignedUser: assignUserSelect.value,
    };

<<<<<<< Updated upstream
=======
    console.log(projectData)
>>>>>>> Stashed changes

    try {
      if (id) {
        await updateProject(id, projectData);
<<<<<<< Updated upstream
        successMessage.style.display='block'
        successMessage.textContent='project updated successfully'
       
      } 
      else {
      //await addProject(projectData);
      successMessage.style.display='block';
      successMessage.textContent='project created successfully' 
      }
      
      
=======
        successMessage.textContent = 'Project updated successfully!';
      } 
      else {
        const response = await fetch('http://localhost:3000/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        });

        if (response.ok) {
          const project = await response.json();
          projects.push(project);
          successMessage.textContent = 'Project added successfully!';
        } else {
          throw new Error('Failed to add project');
        }
      }

      successMessage.style.color = 'green';
>>>>>>> Stashed changes

      // Reset form
      const form = document.querySelector('.projectForm') as HTMLFormElement;
      form.reset();
      renderProjects();
      populateUsersDropdown(); // Refresh user dropdown to reflect assignment
<<<<<<< Updated upstream

    } catch (error) {
      
=======
    } catch (error) {
>>>>>>> Stashed changes
      console.error('Error handling project:', error);
    }
  }
};

// Render the projects section
const renderProjects = async () => {
  projects = await fetchProjects();
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

  projects.forEach((project: Project) => {
<<<<<<< Updated upstream
    const row = document.createElement('tr') as HTMLTableRowElement;
   
=======
    const row = document.createElement('tr');
>>>>>>> Stashed changes
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
const editButtons = document.querySelectorAll('.editBtn') as NodeListOf<HTMLButtonElement>;
const deleteButtons = document.querySelectorAll('.deleteBtn') as NodeListOf<HTMLButtonElement>;

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
  deleteButton.addEventListener('click', async () => {
    const id = deleteButton.dataset.id;
    if (id) {
      try {
        await deleteProject(id);
        // Render projects after deletion
        renderProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  });
});

  

};

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
    const target = (event.currentTarget as HTMLElement).dataset.target;
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
