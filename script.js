//NOTE// const randomId = crypto.randomUUID();

const addNewBtn = document.querySelectorAll(".add-new-btn");
const statusDiv = document.getElementById("status-div");
const setPlannedBtn = document.getElementById("set-planned-btn");
const setReadingBtn = document.getElementById("set-reading-btn");
const setFinishedBtn = document.getElementById("set-finished-btn");
const list = document.getElementById("list");
const addMangaForm = document.getElementById("add-manga-form");
const darkDiv = document.getElementById("dark-div");


const library = [];
let selectedMangaId = null;

function Manga(image, title, author, status) {
    this.image = image;
    this.title = title;
    this.author = author;
    this.status = status;
    this.id = crypto.randomUUID();
    this.info = () => {
        return `${this.title} by ${this.author}. ${this.status}`;
    }
    this.entryNumber = () => {
        return library.findIndex(item => item.id === this.id) + 1;
    }
}

const openAddManga = () => {
    closeStatusMenu();
    enableForm(addMangaForm);
    function enableForm(formElement) {
        formElement.querySelectorAll("input, textarea, select, button").forEach(el => {
        el.disabled = false;
        });
    }
    addMangaForm.classList.remove("closed");
    addMangaForm.classList.add("open");
    openDarkDiv();

}

const closeAddManga = () => {
    addMangaForm.classList.remove("open");
    addMangaForm.classList.add("closed");
    addMangaForm.reset();
    disableForm(addMangaForm);
    function disableForm(formElement) {
    formElement.querySelectorAll("input, textarea, select, button").forEach(el => {
    el.disabled = true;
    });
    }
    closeDarkDiv();
}

function createManga(image, title, author, status, id = null) {

    const newManga = new Manga(image, title, author, status);

    if(id) {
        newManga.id = id;
    }

    const row = document.createElement("tr");
    row.dataset.id = newManga.id;
    library.push(newManga);
    console.log(library); 

    if (!image) {
        row.innerHTML = `
        <td>${newManga.entryNumber()}</td>
        <td><img src="https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"/></td>
        <td>${newManga.title}</td>
        <td>${newManga.author}</td>
        <td><button class="status-btn ${newManga.status.toLowerCase()}">${newManga.status}</button></td>
        <td><svg class="remove-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Delete</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg></td>
    `;
    } else {
        row.innerHTML = `
        <td>${newManga.entryNumber()}</td>
        <td><img src="${newManga.image}"/></td>
        <td>${newManga.title}</td>
        <td>${newManga.author}</td>
        <td><button class="status-btn ${newManga.status.toLowerCase()}">${newManga.status}</button></td>
        <td><svg class="remove-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Delete</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg></td>
    `;
    }
    
    list.appendChild(row);
    updateEntryNumbers();
}

const openStatusMenu = () => {
    closeAddManga();
    statusDiv.classList.remove("closed");
    statusDiv.classList.add("open");
    openDarkDiv();
    console.log(selectedMangaId);
} 

const closeStatusMenu = () => {
    statusDiv.classList.remove("open");
    statusDiv.classList.add("closed");
    closeDarkDiv();
}

const openDarkDiv = () => {
    darkDiv.classList.remove("closed");
    darkDiv.classList.add("open");
}

const closeDarkDiv = () => {
    darkDiv.classList.remove("open");
    darkDiv.classList.add("closed");
}

const editStatus = (selected) => {
    const mangaToChange = document.querySelector(`tr[data-id="${selectedMangaId}"]`);
    const btnToChange = mangaToChange.querySelector(".status-btn");
    const mangaObj = library.find(m => m.id === selectedMangaId);
    if (selected === "planned") {
        console.log("you selected planned");
        if (btnToChange.classList.contains("planned")) {
            selectedMangaId = null;
            console.log(selectedMangaId);
            closeStatusMenu();
            return;
        } else {
            closeStatusMenu();
            btnToChange.classList.remove("finished", "reading");
            btnToChange.classList.add("planned");
            btnToChange.textContent = "Planned";
            mangaObj.status = "Planned";
            console.log(mangaObj);
            selectedMangaId = null;
        }
    } else if (selected === "reading") {
        console.log("you selected reading");
        if (btnToChange.classList.contains("reading")) {
            selectedMangaId = null;
            closeStatusMenu();
            return;
        } else {
            closeStatusMenu();
            btnToChange.classList.remove("finished", "planned");
            btnToChange.classList.add("reading");
            btnToChange.textContent = "Reading";
            mangaObj.status = "Reading";
            console.log(mangaObj);
            selectedMangaId = null;
        }
    } else if (selected === "finished") {
        console.log("you selected finished");
        if (btnToChange.classList.contains("finished")) {
            selectedMangaId = null;
            closeStatusMenu();
            return;
        } else {
            closeStatusMenu();
            btnToChange.classList.remove("planned", "reading");
            btnToChange.classList.add("finished");
            btnToChange.textContent = "Finished";
            mangaObj.status = "Finished";
            console.log(mangaObj);
            selectedMangaId = null;           
        }
    }


}

const updateEntryNumbers = () => {
    const rows = list.querySelectorAll("tr");
    rows.forEach((row, index) => {
        const firstCell = row.querySelector("td");
        if (firstCell) {
            firstCell.textContent = index + 1;
        }
    });
}

const deleteManga = () => {
    const mangaToChange = document.querySelector(`tr[data-id="${selectedMangaId}"]`);
    const mangaIndex = library.findIndex(m => m.id === selectedMangaId);
    if (mangaIndex !== -1) {
        library.splice(mangaIndex, 1);
    }
    mangaToChange.remove();
    console.log(library);
    updateEntryNumbers();
    selectedMangaId = null;
    saveLibrary();
}

const saveLibrary = () => {
    localStorage.setItem("myLibrary", JSON.stringify(library));
}

const loadLibrary = () => {
    const data = localStorage.getItem("myLibrary");

    if (data) {
        const loaded = JSON.parse(data);
        loaded.forEach(m => {
            createManga(m.image, m.title, m.author, m.status, m.id);
        });
    }
}


//Event Listeners

window.addEventListener("DOMContentLoaded", loadLibrary);

list.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (!row) return;

    const id = row.dataset.id;
    if (e.target.classList.contains("status-btn")) {
        selectedMangaId = id;
        openStatusMenu();
    }

    if (e.target.classList.contains("remove-svg")) {
        selectedMangaId = id;
        deleteManga();
    }
    return;
});

addNewBtn.forEach(btn => {
    btn.addEventListener("click", openAddManga);
});

statusDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("planned")) {
        editStatus("planned");
    } else if (e.target.classList.contains("reading")) {
        editStatus("reading");
    } else if (e.target.classList.contains("finished")) {
        editStatus("finished");
    }
    saveLibrary();
});

addMangaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const image = event.target.elements.image.value;
    const title = event.target.elements.title.value;
    const author = event.target.elements.author.value;
    let status = event.target.elements.status.value;
    status = status.charAt(0).toUpperCase() + status.slice(1);

    createManga(image, title, author, status);

    closeAddManga(); 
    
    saveLibrary();
});

document.addEventListener("click", (e) => {

    if (statusDiv.contains(e.target)) return;

    if (e.target.classList.contains("status-btn")) return;

    if (addMangaForm.contains(e.target)) return;

    if (e.target.classList.contains("add-new-btn")) return;

    if (statusDiv.classList.contains("open")) {closeStatusMenu()};

    if (addMangaForm.classList.contains("open")) {closeAddManga()};

    return
});

updateEntryNumbers();