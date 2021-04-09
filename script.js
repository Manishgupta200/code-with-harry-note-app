console.log("create a note app");
showNotes();

// function to add a note in local storage by writing a note and ckick on button
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        notes: addTxt.value,
        title: addTitle.value
    };
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';
    addTitle.value = '';
    console.log("note stored");

    showNotes();
});

// function to display notes from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard card row mx-3 my-3" style="width: 18rem;">
                 <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.notes}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">delete note</button>
                 </div>
              </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show, click Add note to show here`;
    }
    console.log("notes added");

}

// function to delete a note from display and local storage both
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    console.log("note deleted ", index);
    showNotes();
}

// function to search a note and thow only matched text note or notes
let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input', function () {
    searchVal = searchTxt.value;

    let pContainer = document.getElementsByClassName('noteCard');
    Array.from(pContainer).forEach(function (e) {
        let tText = e.getElementsByTagName('h5')[0].innerText;   //element.
        if (tText.includes(searchVal)) {
            e.style.display = 'block'
        }
        else {
            e.style.display = 'none';
        }
    });
    console.log('y searched', searchVal);
});