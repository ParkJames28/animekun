const animeList = [
  { title: "Demon Slayer", img: "DemonSlayer.jpg", desc: "A boy fights demons to save his sister.", genre: "Action" },
  { title: "One Piece", img: "img/onepiece.jpg", desc: "Pirates adventure in search of treasure.", genre: "Adventure" },
  { title: "Attack on Titan", img: "img/aot.jpg", desc: "Humanity fights against giant titans.", genre: "Fantasy" },
  { title: "Tokyo Ghoul", img: "", desc: "Humanity fights against ghouls.", genre: "Fantasy" }
];

const grid = document.getElementById('animeGrid');
const searchInput = document.getElementById('search');
const genreFilter = document.getElementById('genreFilter');
const modal = document.getElementById('animeModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalGenre = document.getElementById('modalGenre');
const closeBtn = document.querySelector('.close');
const watchBtn = document.getElementById('watchBtn');
const addWatchlistBtn = document.getElementById('addWatchlist');

let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
let historyList = JSON.parse(localStorage.getItem('history')) || [];

function renderAnime() {
  const search = searchInput.value.toLowerCase();
  const genre = genreFilter.value;
  grid.innerHTML = animeList
    .filter(a => a.title.toLowerCase().includes(search) && (genre === "" || a.genre === genre))
    .map((anime, idx) => `
      <div class="card" onclick="openModal(${idx})">
        <img src="${anime.img}" alt="${anime.title}">
        <h3>${anime.title}</h3>
      </div>
    `).join('');
}

function openModal(index) {
  const anime = animeList[index];
  modalImg.src = anime.img;
  modalTitle.textContent = anime.title;
  modalDesc.textContent = anime.desc;
  modalGenre.textContent = anime.genre;
  watchBtn.onclick = () => watchAnime(index);
  addWatchlistBtn.onclick = () => addWatchlist(anime.title);
  modal.style.display = "flex";
}

function addWatchlist(title) {
  if (!watchlist.includes(title)) {
    watchlist.push(title);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    alert("Added to Watchlist!");
  }
}

function watchAnime(index) {
  const anime = animeList[index];
  historyList.push(anime.title);
  localStorage.setItem('history', JSON.stringify(historyList));
  window.location.href = `player.html?anime=${encodeURIComponent(anime.title)}`;
}

closeBtn.onclick = () => modal.style.display = "none";
searchInput.addEventListener('input', renderAnime);
genreFilter.addEventListener('change', renderAnime);

renderAnime();
