//NOTE// const randomId = crypto.randomUUID();

const addNewBtn = document.querySelectorAll(".add-new-btn");
const statusDiv = document.getElementById("status-div");
const setPlannedBtn = document.getElementById("set-planned-btn");
const setReadingBtn = document.getElementById("set-reading-btn");
const setFinishedBtn = document.getElementById("set-finished-btn");
const list = document.getElementById("list");
const addMangaForm = document.getElementById("add-manga-form");


const library = [];
let entryNumber = 0;
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
    this.setPlanned = () => {
        this.status = "Planned";
    }
}

const openAddManga = () => {
    addMangaForm.style.display = "flex";
}

const closeAddManga = () => {
    addMangaForm.style.display = "none";
}

function createManga(image, title, author, status) {
    entryNumber++;

    const newManga = new Manga(image, title, author, status);

    const row = document.createElement("tr");
    row.dataset.id = newManga.id;
    if (!image) {
        row.innerHTML = `
        <td>${entryNumber}</td>
        <td><img src="https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"/></td>
        <td>${newManga.title}</td>
        <td>${newManga.author}</td>
        <td><button class="status-btn ${newManga.status.toLowerCase()}">${newManga.status}</button></td>
    `;
    } else {
        row.innerHTML = `
        <td>${entryNumber}</td>
        <td><img src="${newManga.image}"/></td>
        <td>${newManga.title}</td>
        <td>${newManga.author}</td>
        <td><button class="status-btn ${newManga.status.toLowerCase()}">${newManga.status}</button></td>
    `;
    }
    
    list.appendChild(row);
    library.push(newManga);
    console.log(library);
}

const openStatusMenu = () => {
    statusDiv.style.display = "flex";
    console.log(selectedMangaId);
} 

const closeStatusMenu = () => {
    statusDiv.style.display = "none";
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


//Event Listeners

list.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (!row) return;

    const id = row.dataset.id;
    if (e.target.classList.contains("status-btn")) {
        selectedMangaId = id;
        openStatusMenu();
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
});

addMangaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const image = event.target.elements.image.value;
    const title = event.target.elements.title.value;
    const author = event.target.elements.author.value;
    const status = event.target.elements.status.value;

    createManga(image, title, author, status);

    closeAddManga();
});