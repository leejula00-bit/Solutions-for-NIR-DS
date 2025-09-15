let errorsData = [];

// Load JSON khi mở web
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    errorsData = data;
    renderErrorList(errorsData);
  })
  .catch(err => console.error("Error loading JSON:", err));

function renderErrorList(data) {
  const list = document.getElementById("error-list");
  list.innerHTML = "";
  data.forEach(error => {
    const item = document.createElement("div");
    item.className = "error-item";
    item.innerHTML = `
      <h3>${error.title}</h3>
      <p>${error.description.substring(0, 80)}...</p>
    `;
    item.onclick = () => openModal(error.id);
    list.appendChild(item);
  });
}

function openModal(id) {
  const error = errorsData.find(e => e.id === id);
  if (!error) return;

  document.getElementById("modalTitle").innerText = error.title;
  document.getElementById("modalDescription").innerText = error.description;
  document.getElementById("modalImage").src = error.image;

  document.getElementById("errorModal").style.display = "block";
}

function closeModal() {
  document.getElementById("errorModal").style.display = "none";
}

function filterErrors() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const filtered = errorsData.filter(e =>
    e.title.toLowerCase().includes(query) ||
    e.description.toLowerCase().includes(query)
  );
  renderErrorList(filtered);
}
