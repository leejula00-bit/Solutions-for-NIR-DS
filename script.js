let errorsData = [];

// Load JSON
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    errorsData = data;
    displayErrors(errorsData);
  });

// Hiển thị danh sách lỗi
function displayErrors(data) {
  const container = document.getElementById("error-list");
  container.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.solution.substring(0, 80)}...</p>
    `;

    card.addEventListener("click", () => openModal(item));
    container.appendChild(card);
  });
}

// Lọc theo từ khóa
function filterErrors() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const filtered = errorsData.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.solution.toLowerCase().includes(query)
  );
  displayErrors(filtered);
}

// Modal mở
function openModal(item) {
  document.getElementById("modalTitle").innerText = item.title;
  document.getElementById("modalDescription").innerText = item.solution;
  document.getElementById("modalImage").src = item.image;
  document.getElementById("errorModal").style.display = "block";
}

// Modal đóng
function closeModal() {
  document.getElementById("errorModal").style.display = "none";
}
