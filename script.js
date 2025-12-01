//NOTE// const randomId = crypto.randomUUID();

const addNewBtn = document.querySelectorAll(".add-new-btn");
const statusDiv = document.getElementById("status-div");
const setPlannedBtn = document.getElementById("set-planned-btn");
const setReadingBtn = document.getElementById("set-reading-btn");
const setFinishedBtn = document.getElementById("set-finished-btn");
const list = document.getElementById("list");


const library = [];
let entryNumber = 0;
let selectedMangaId = null;

function Manga(title, author, status) {
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

function createManga(title, author, status) {
    entryNumber++;

    const newManga = new Manga("Naruto", "Bob", "Finished");

    const row = document.createElement("tr");
    row.id = newManga.id;
    row.innerHTML = `
        <td>${entryNumber}</td>
        <td><img src="https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"/></td>
        <td>${newManga.title}</td>
        <td>${newManga.author}</td>
        <td><button class="status-btn ${newManga.status.toLowerCase()}">${newManga.status}</button></td>
    `;
    list.appendChild(row);
    library.push(newManga);
    console.log(library);
}

const openStatusMenu = () => {
    statusDiv.style.display = "flex";
    console.log(selectedMangaId);
} 

const editStatus = (selected) => {
    //TO-DO
}


//Event Listeners

list.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (!row) return;

    const id = row.id;
    if (e.target.classList.contains("status-btn")) {
        selectedMangaId = id;
        openStatusMenu();
}
})

addNewBtn.forEach(btn => {
    btn.addEventListener("click", createManga);
});

statusDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("planned")) {
        editStatus("planned");
    }
})