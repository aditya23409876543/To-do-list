// Variables to store notes by date
const notesByDate = {};

// Show the dashboard and hide the landing page
function enterDashboard() {
    document.querySelector('.landing-page').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
}

// Show the task modal
function addTask() {
    document.getElementById('task-modal').style.display = 'flex';
}

// Close the task modal
function closeModal() {
    document.getElementById('task-modal').style.display = 'none';
}

// Save a new task
function saveTask() {
    const taskName = document.getElementById('task-name').value;
    const taskDetails = document.getElementById('task-details').value;

    if (taskName && taskDetails) {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.className = 'task-checkbox';
        taskCheckbox.onclick = function() {
            toggleTaskCompleted(this);
        };

        const taskLabel = document.createElement('label');

        const taskTitle = document.createElement('h3');
        taskTitle.textContent = taskName;

        const taskDescription = document.createElement('p');
        taskDescription.textContent = taskDetails;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteTask(this);
        };

        taskLabel.appendChild(taskTitle);
        taskLabel.appendChild(taskDescription);

        taskCard.appendChild(taskCheckbox);
        taskCard.appendChild(taskLabel);
        taskCard.appendChild(deleteButton);

        document.getElementById('task-list').appendChild(taskCard);

        // Clear the modal inputs and close it
        document.getElementById('task-name').value = '';
        document.getElementById('task-details').value = '';
        closeModal();
    } else {
        alert('Please fill out both fields.');
    }
}

// Toggle task completion
function toggleTaskCompleted(checkbox) {
    const taskCard = checkbox.closest('.task-card');
    if (checkbox.checked) {
        taskCard.classList.add('completed');
    } else {
        taskCard.classList.remove('completed');
    }
}

// Delete a task
function deleteTask(deleteButton) {
    const taskCard = deleteButton.closest('.task-card');
    taskCard.remove();
}

// Delete all tasks
function deleteAllTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clears all tasks
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Show the tasks section and hide the notes section
function showTasksSection() {
    document.getElementById('tasks-section').style.display = 'block';
    document.getElementById('notes-section').style.display = 'none';
}

// Show the notes section and hide the tasks section
function showNotesSection() {
    document.getElementById('tasks-section').style.display = 'none';
    document.getElementById('notes-section').style.display = 'block';
}

// Show the note modal
function addNote() {
    document.getElementById('note-modal').style.display = 'flex';
}

// Close the note modal
function closeNoteModal() {
    document.getElementById('note-modal').style.display = 'none';
}

// Save a new note
function saveNote() {
    const noteTitle = document.getElementById('note-title').value;
    const noteDate = document.getElementById('note-date').value;
    const noteContent = document.getElementById('note-content').value;

    if (noteTitle && noteDate && noteContent) {
        const noteKey = `${noteDate}-${noteTitle}`; // Unique key combining date and title
        notesByDate[noteKey] = { title: noteTitle, content: noteContent };

        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';

        const noteHeader = document.createElement('div');
        noteHeader.className = 'note-header';

        const noteDateTitle = document.createElement('h3');
        noteDateTitle.textContent = `${noteDate} - ${noteTitle}`;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteNote(this);
        };

        noteHeader.appendChild(noteDateTitle);
        noteHeader.appendChild(deleteButton);

        const noteDescription = document.createElement('p');
        noteDescription.textContent = noteContent;

        noteCard.appendChild(noteHeader);
        noteCard.appendChild(noteDescription);

        document.getElementById('notes-list').appendChild(noteCard);

        // Clear the modal inputs and close it
        document.getElementById('note-title').value = '';
        document.getElementById('note-date').value = '';
        document.getElementById('note-content').value = '';
        closeNoteModal();
    } else {
        alert('Please provide title, date, and note content.');
    }
}

// Delete a note
function deleteNote(deleteButton) {
    const noteCard = deleteButton.closest('.note-card');
    const noteDateTitle = noteCard.querySelector('.note-header h3').textContent;
    delete notesByDate[noteDateTitle];
    noteCard.remove();
}
