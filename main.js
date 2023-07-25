const playerThumbnail = document.getElementById('playerThumbnail');
const playerTitle = document.getElementById('playerTitle');
const playerArtist = document.getElementById('playerArtist');
const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');

let albums = [];
let currentAlbumIndex = 0;
let currentSongIndex = 0;
let isPlaying = false;

// Función para crear las cards de los discos
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
  audioSource.src = currentSong;
  audioPlayer.load();
  audioPlayer.play();
  updatePlayer();
}

function updatePlayer() {
  const currentAlbum = albums[currentAlbumIndex];
  const currentSong = currentAlbum.songs[currentSongIndex];

  playerThumbnail.src = currentAlbum.thumbnail;
  playerTitle.textContent = currentAlbum.title;
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

if (!localStorage.getItem('albums')) {
    albums = [
      {
        "title": "Sempiternal",
        "artist": "Bring Me The Horizon",
        "thumbnail": "images/sempiternal.jpg",
        "songs": [
          "Tracks/Sempiternal/01 - Can You Feel My Heart.mp3",
          "Tracks/Sempiternal/02 - The House Of Wolves.mp3",
          "Tracks/Sempiternal/03 - Empire (Let Them Sing).mp3",
          "Tracks/Sempiternal/04 - Sleepwalking.mp3",
          "Tracks/Sempiternal/05 - Go To Hell, For Heaven's Sake.mp3",
          "Tracks/Sempiternal/06 - Shadow Moses.mp3",
          "Tracks/Sempiternal/07 - And The Snakes Start To Sing.mp3",
          "Tracks/Sempiternal/08 - Seen It All Before.mp3",
          "Tracks/Sempiternal/09 - Antivist.mp3",
          "Tracks/Sempiternal/10 - Crooked Young.mp3",
          "Tracks/Sempiternal/11 - Hospital For Souls.mp3"
        ]
      },
      {
        "title": "Gore",
        "artist": "Deftones",
        "thumbnail": "images/gore.jpg",
        "songs": [
          "Tracks/Gore/01 - PrayersTriangles.mp3",
          "Tracks/Gore/02 - Acid Hologram.mp3",
          "Tracks/Gore/03 - Doomed User.mp3",
          "Tracks/Gore/04 - Geometric Headdress.mp3",
          "Tracks/Gore/05 - Heartswires.mp3",
          "Tracks/Gore/06 - Pittura Infamante.mp3",
          "Tracks/Gore/07 - Xenon.mp3",
          "Tracks/Gore/08 - (L)Mirl.mp3",
          "Tracks/Gore/09 - Gore.mp3",
          "Tracks/Gore/10 - Phantom Bride.mp3",
          "Tracks/Gore/11 - Rubicon.mp3"
        ]
      },
      {
        "title": "In Rainbows",
        "artist": "Radiohead",
        "thumbnail": "images/In rainbows.png",
        "songs": [
          "Tracks/In Rainbows/01 - 15 Step.mp3",
          "Tracks/In Rainbows/02 - Bodysnatchers.mp3",
          "Tracks/In Rainbows/03 - Nude.mp3",
          "Tracks/In Rainbows/04 - Weird FishesArpeggi.mp3",
          "Tracks/In Rainbows/05 - All I Need.mp3",
          "Tracks/In Rainbows/06 - Faust Arp.mp3",
          "Tracks/In Rainbows/07 - Reckoner.mp3",
          "Tracks/In Rainbows/08 - House Of Cards.mp3",
          "Tracks/In Rainbows/09 - Jigsaw Falling Into Place.mp3",
          "Tracks/In Rainbows/10 - Videotape.mp3"
        ]
      }
      // Add more albums here if needed
    ];
  
    localStorage.setItem('albums', JSON.stringify(albums));
  } else {
    albums = JSON.parse(localStorage.getItem('albums'));
  }
  

createAlbumCards(albums);
updatePlayer();

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
