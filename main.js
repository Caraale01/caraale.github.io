// Working The Note Area start
let noteArea = document.querySelector(".note-area");
let noteText = document.querySelector(".note-text");
let title = document.querySelector(".title");
let Note = document.querySelector(".note");
let Notes = document.querySelector("#notes");

// Function area 
const showNoteArea = () => {
  noteText.style = 'display: block;';
  noteArea.classList.add("note-now");
  title.setAttribute('placeholder', 'Title');
  title.style = 'font-size: 20px';
}
const hideNoteArea = () => {
  noteText.style = 'display: none';
  noteArea.classList.remove("note-now");
}

const addNoteToLocalStorage = (note) => {
  if (note.length < 0) {
    return;
  }
  console.log(note);

  let oldNote;
  if (localStorage.getItem("notes") === null) {
    oldNote = [];
  } else {
    oldNote = JSON.parse(localStorage.getItem('notes'));
  }
  oldNote.push(note);
  localStorage.setItem('notes', JSON.stringify(oldNote));
}

const getNoteFromLocalStorage = () => {
  let oldNote;
  if (localStorage.getItem("notes") === null) {
    oldNote = [];
  } else {
    oldNote = JSON.parse(localStorage.getItem('notes'));
  }
  oldNote.forEach(note => {

    // console.log(note);
    Notes.innerHTML += `
     <div class="note">
        <h3 class="title-text" id="title-text">${note[0]}</h3>
        <p class="blog" id="blog">${note[1]}</p>
        <i class="class fa fa-trash"></i>
      </div>`;
  });
}

const DeleteNoteFromLocalStorage = (deleteNote) => {

      let oldNote;
      if (localStorage.getItem("notes") === null) {
      oldNote = [];
      } else {
      oldNote = JSON.parse(localStorage.getItem('notes'));
  }
  
  oldNote.map((note, index) => {
    // console.log(note);
    if (note[0] == deleteNote.children[0].textContent && note[1] == deleteNote.children[1].textContent) {
      // console.log('yes')
      oldNote.splice(index, 1)
      return oldNote;
    }
  
  });

  localStorage.setItem('notes', JSON.stringify(oldNote));
}



document.addEventListener("DOMContentLoaded", getNoteFromLocalStorage);
const addNote = (t, N) => {
  Notes.innerHTML += `
     <div class="note">
        <h3 class="title-text" id="title-text">${t}</h3>
        <p class="blog" id="blog">${N}</p>
        <i class="class fa fa-trash"></i>
      </div>`;

  title.value = ''; noteText.value = '';
}



// Function area end 

noteArea.addEventListener("click", showNoteArea);
document.addEventListener('click', (event) => {
  // console.log("click");

  let isClicked = noteArea.contains(event.target);

  if (!isClicked) {
    hideNoteArea();

    if (title.value.length === 0 && noteText.value.length === 0) {
      return;
    } else {
      addNoteToLocalStorage([title.value, noteText.value]);
      addNote(title.value, noteText.value);
    }
  }
});

document.addEventListener("mouseover", (event) => {
  // console.log("moseovered");
  if (event.target.classList.contains("note")) {
    event.target.querySelector("i").classList.add("show");
  };
});
document.addEventListener("mouseout", (event) => {
  // console.log("moseovered");
  if (event.target.classList.contains("note")) {
    event.target.querySelector("i").classList.remove("show");
  }
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash")) {
    event.target.parentElement.remove();
    DeleteNoteFromLocalStorage(event.target.parentElement)
  }
});

// // localStorage erea
// localStorage.setItem('name', 'caraale');
// console.log(localStorage.getItem('name'));