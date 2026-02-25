class Music {
    constructor(songName, artist, image, album, yearReleased, genre) {
        this.songName = songName;
        this.artist = artist;
        this.image = image;
        this.album = album;
        this.yearReleased = yearReleased;
        this.genre = genre;
    }
}

get item() {
    const songSection = document.createElement("section");
    songSection.classList.add("song-item");

    
}