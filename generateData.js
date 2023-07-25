const fs = require('fs');
const path = require('path');

const songsDirectory = path.join(__dirname, 'Tracks/Sempiternal'); // Ajusta la ruta según tu estructura de directorios

// Función para recopilar la información de cada canción en un álbum
function collectSongs(albumPath) {
  const songs = fs.readdirSync(albumPath).map(songFile => {
    return {
      title: path.basename(songFile, path.extname(songFile)),
      audio: path.join(albumPath, songFile)
    };
  });

  return songs;
}

// Función principal para generar el objeto JSON
function generateJSON() {
  const albums = fs.readdirSync(songsDirectory).map(albumDir => {
    const albumPath = path.join(songsDirectory, albumDir);
    const songs = collectSongs(albumPath);

    return {
      title: albumDir,
      artist: 'Bring me the horizon', // Reemplaza esto con el nombre real del artista
      thumbnail: `images/Sempiternal.jpg`, // Ajusta la ruta de la imagen del álbum
      songs: songs
    };
  });

  const data = {
    albums: albums
  };

  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync('data.json', jsonData);
}

generateJSON();