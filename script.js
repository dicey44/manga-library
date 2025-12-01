const addNewBtn = document.getElementById("add-new-btn");
const statusDiv = document.getElementById("status-div");
const statusMenuBtn = document.querySelectorAll(".status-menu-btn");
const statusBtn = document.querySelectorAll(".status-btn");

const openStatusMenu = () => {
    statusDiv.style.display = "flex";
} 

statusBtn.forEach(btn => {
    btn.addEventListener("click", openStatusMenu);
});