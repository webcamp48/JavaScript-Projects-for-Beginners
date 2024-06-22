'use strict';

const addBox = document.querySelector('.add-box');
let popupBox = document.querySelector('.popup-box');
let closePopBox = document.querySelector('header i');

let noteTitleInput = document.getElementById('title');
let noteDescInput = document.getElementById('desc');
let addNotes = document.getElementById('add-notes');
const noteList = document.querySelector('.noteList');

let noteIdCounter = 1; // Initialize a counter for generating unique IDs

addBox.addEventListener('click', () => {
    popupBox.classList.add('show');

});

closePopBox.addEventListener('click', () => {
    popupBox.classList.remove('show');
});


// Add Notes Functionality
addNotes.addEventListener('click', (e) => {
    e.preventDefault();
    const noteTitle = noteTitleInput.value.trim();
    const noteDesc = noteDescInput.value.trim();
    if (noteTitle && noteDesc) {
        let noteObj = {
            title: noteTitle,
            desc: noteDesc
        }
        if (addNotes.textContent === 'Add Note') {
            addNoteToUI(noteObj);
        } else {
            const noteId = addNotes.dataset.noteId; // Get the ID of the note being updated
            const noteItem = document.querySelector(`.note[data-note-id="${noteId}"]`);
            if (noteItem) {
                noteItem.querySelector('p').textContent = noteObj.title;
                noteItem.querySelector('span').textContent = noteObj.desc;
            }
            addNotes.textContent = 'Add Note';
            delete addNotes.dataset.noteId;
        }
        noteTitleInput.value = '';
        noteDescInput.value = '';
        popupBox.classList.remove('show');
    } else {
        alert('Please enter both title and description for the note.');
    }
});


// for edit and delete item
noteList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit')) {
        const noteItem = e.target.closest('.note');
        if (noteItem) {
            const title = noteItem.querySelector('p').textContent;
            const desc = noteItem.querySelector('span').textContent;
            noteTitleInput.value = title;
            noteDescInput.value = desc;
            popupBox.classList.add('show');
            addNotes.textContent = 'Update Note';
            addNotes.dataset.noteId = noteItem.dataset.noteId;
        }
    } else if (e.target.classList.contains('delete')) {
        const noteItem = e.target.closest('.note');
        if (noteItem) {
            noteItem.remove();
        }
    }
});



function addNoteToUI(note) {
    let newLi = document.createElement('li');
    const noteId = `note-${noteIdCounter++}`; // Generate a unique ID
    newLi.setAttribute('data-note-id', noteId); // Set the ID as a data attribute
    newLi.classList.add('note');
    newLi.innerHTML = `
        <div class="details">
            <p>${note.title}</p>
            <span>${note.desc}</span>
        </div>
        <div class="bottom-content">
            <span>${getCurrentDate()}</span>
            <div class="settings">
                <i class="uil uil-ellipsis-h"></i>
                <ul class="menu">
                    <li class="edit"><i class="uil uil-pen"></i>Edit</li>
                    <li class="delete"><i class="uil uil-trash"></i>Delete</li>
                </ul>
            </div>
        </div>
    `;
    noteList.appendChild(newLi);
}


function getCurrentDate() {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
}

