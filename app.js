
// const songBtn = async() => {

//   const searchText = document.getElementById("songInput").value;
//   const url = `https://api.lyrics.ovh/suggest/${searchText}`
//  const res = await fetch(url)
//     const data = await res.json()
//     showSong(data.data);
// };

const songBtn = () => {

  const searchText = document.getElementById("songInput").value;
  const url = `https://api.lyrics.ovh/suggest/${searchText}`
  fetch(url)
    .then(res => res.json())
    .then(data => showSong(data.data))
    .catch(error => showError('Something went wrong! Please try again later'));
};

const showSong = (songs) => {
  const allSong = document.getElementById("songContainer");
  allSong.textContent = '';

  songs.forEach(song => {
    songDiv = document.createElement('div');

    songDiv.className = 'single-result row align-items-center my-3 p-3'
    songDiv.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>

        <source src="${song.preview}" type="audio/mpeg">
      </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="showLyric('${song.title}', '${song.artist.name}' )" class="btn btn-success">Get Lyrics</button>
    </div>
  
        `;
    allSong.appendChild(songDiv);

  });
};

const showLyric = async (title, artist) => {
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

  const res = await fetch(url)
  const data = await res.json()
  displayLyrics(data.lyrics);

};


// const showLyric = (title, artist) => {
//   const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//   fetch(url)
//   .then (res => res.json())
//   .then (data => displayLyrics(data.lyrics) )
//   .catch (error => console.log(error))

// };

const displayLyrics = lyric => {
  const lyricDiv = document.getElementById("showLyrics")
  if (lyric) {
    lyricDiv.innerText = lyric;
    lyricDiv.style.color = 'white';
  }
  else {
    lyricDiv.innerText = 'Sorry! I failed to load lyrics! Try later...';
    lyricDiv.style.color = 'red';
  }
}
const showError = (error) => {
  document.getElementById("errorID").innerText = error;
}