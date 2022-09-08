// console.log("Welcome to the Notes taking website")
showNotes()
//when user add a note, added in local storage
var notesObj = []
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {

    let addText = document.getElementById("addText");
    // console.log(addText.value) 
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];

    } else {
        notesObj = JSON.parse(notes)
    }
    let myObj = {
        title: addTitle.value,
        text: addText.value
    }
    notesObj.push(myObj)
    // console.log(notesObj)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addText.value = ""
    addTitle.value = ""
    // console.log(notesObj)

    showNotes()
})

//function to show notes
function showNotes() {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];

    } else {
        notesObj = JSON.parse(notes)
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text">${element.text}</p>

                  <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-danger" id="dltBtn">Delete Note</button>
                  
                </div>
                
              </div>
        `
    })

    let notelElm = document.getElementById('notes');
    if (notesObj.length != 0) {

        notelElm.innerHTML = html;
    }
    else {
        notelElm.innerHTML = `Please use Add note section to add notes`
    }
}


// funtion to delete a note

function deleteNote(index) {
    // console.log("I am deleting a note", index)


    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];

    } else {
        notesObj = JSON.parse(notes)
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes()
}


let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value;
    // console.log('input event fired', inputVal)
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
        // console.log(cardTxt)
    })
})