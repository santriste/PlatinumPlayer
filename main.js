const playerThumbnail = document.getElementById('playerThumbnail');
const playerTitle = document.getElementById('playerTitle');
const playerArtist = document.getElementById('playerArtist');
const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');

let albums = [];
let currentAlbumIndex = 0;
let currentSongIndex = 0;
let isPlaying = false;

function createAlbumCards(albums) {
  const albumCardsContainer = document.getElementById('albumCardsContainer');

  albums.forEach((album, index) => {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');
    card.innerHTML = `
        <div class="card" data-title="${album.title}" data-artist="${album.artist}">
            <img src="${album.thumbnail}" alt="${album.title} - ${album.artist}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${album.title}</h5>
                <p class="card-text">${album.artist}</p>
                <a class="btn btn-success" onclick="loadSong(${index}, 0)">Play</a>
            </div>
        </div>
    `;
    albumCardsContainer.appendChild(card);
  });
}

function loadSong(albumIndex, songIndex) {
  currentAlbumIndex = albumIndex;
  currentSongIndex = songIndex;
  const currentAlbum = albums[currentAlbumIndex];
  const currentSong = currentAlbum.songs[currentSongIndex];

  localStorage.setItem('lastSong', JSON.stringify({ albumIndex, songIndex }));

  audioSource.src = currentSong;
  audioPlayer.load();
  audioPlayer.play();
  updatePlayer();
}

function updatePlayer() {
  const currentAlbum = albums[currentAlbumIndex];
  const currentSong = currentAlbum.songs[currentSongIndex];

  playerThumbnail.src = currentAlbum.thumbnail;
  playerTitle.textContent = currentSong.split('/').pop().replace('.mp3', '');
  playerArtist.textContent = currentAlbum.artist;

  if (isPlaying) {
    audioPlayer.play();
  }
}

function playPause() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % albums[currentAlbumIndex].songs.length;
  loadSong(currentAlbumIndex, currentSongIndex);
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + albums[currentAlbumIndex].songs.length) % albums[currentAlbumIndex].songs.length;
  loadSong(currentAlbumIndex, currentSongIndex);
}

audioPlayer.addEventListener('ended', nextSong);

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    albums = data;
    createAlbumCards(albums);
    const lastSong = JSON.parse(localStorage.getItem('lastSong'));
    if (lastSong) {
      loadSong(lastSong.albumIndex, lastSong.songIndex);
    } else {
      updatePlayer();
    }
    filterCards();
  })
  .catch(error => console.error('Error loading data:', error));

function filterCards() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const title = card.getAttribute('data-title').toLowerCase();
    const artist = card.getAttribute('data-artist').toLowerCase();
    const cardElement = card.parentElement;

    if (title.includes(input) || artist.includes(input)) {
      cardElement.style.display = 'block';
    } else {
      cardElement.style.display = 'none';
    }
  });
}

document.getElementById('searchInput').addEventListener('input', filterCards);
