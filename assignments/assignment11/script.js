class Song {
    constructor(title, artist, album, year, genre, image, youtubeLink) {
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.year = year;
        this.genre = genre;
        this.image = image;
        this.youtubeLink = youtubeLink;
    }

    getSection() {
        const section = document.createElement("section");
        section.classList.add("song-item");
        
        // Add click event to open modal
        section.onclick = () => {
            this.populateModal();
            document.getElementById('id01').style.display = 'block';
        };

        const titleElem = document.createElement("h3");
        titleElem.innerText = this.title;
        section.appendChild(titleElem);

        const artistElem = document.createElement("p");
        artistElem.innerText = `Artist: ${this.artist}`;
        section.appendChild(artistElem);

        const imgElem = document.createElement("img");
        imgElem.src = `images/${this.image}`;
        imgElem.alt = this.title;
        imgElem.style.width = "100%"; // Ensure image fits
        section.appendChild(imgElem);

        return section;
    }

    populateModal() {
        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = ""; // Clear previous content

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("modal-details");
        detailsDiv.style.display = "flex";
        detailsDiv.style.gap = "20px";

        // Image/Video Section
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("modal-image-container");
        imageContainer.style.flex = "1";

        /* If you have the YouTube embed code (iframe), use it. otherwise display image */
        if (this.youtubeLink && this.youtubeLink.includes("iframe")) {
             imageContainer.innerHTML = this.youtubeLink;
        } else {
             const img = document.createElement("img");
             img.src = `images/${this.image}`;
             img.alt = this.title;
             img.style.width = "100%";
             imageContainer.appendChild(img);
        }

        detailsDiv.appendChild(imageContainer);

        // Info Section
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("modal-info");
        infoDiv.style.flex = "1";
        infoDiv.style.textAlign = "left";

        const title = document.createElement("h2");
        title.innerText = this.title;
        infoDiv.appendChild(title);

        const artist = document.createElement("p");
        artist.innerText = `By ${this.artist}`;
        infoDiv.appendChild(artist);

        const album = document.createElement("p");
        album.innerText = `Album: ${this.album}`;
        infoDiv.appendChild(album);

        const year = document.createElement("p");
        year.innerText = `Released: ${this.year}`;
        infoDiv.appendChild(year);

        const genre = document.createElement("p");
        genre.innerText = `Genre: ${this.genre}`;
        infoDiv.appendChild(genre);

        detailsDiv.appendChild(infoDiv);
        modalContent.appendChild(detailsDiv);
    }
}

const songs = [
    new Song(
        "Yukon", 
        "Justin Bieber", 
        "Changes", 
        "2020", 
        "Pop", 
        "Yukon.png", 
        '<iframe width="100%" height="315" src="https://www.youtube.com/embed/fXivMSJm_kA?si=5UkRcJUEWuETNAJH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    ),
    new Song(
        "Last Nite", 
        "Tommy Richman", 
        "Last Nite - Single", 
        "2023", 
        "R&B", 
        "LastNite.png", 
        '<iframe width="100%" height="315" src="https://www.youtube.com/embed/oQb3ks0ArpI?si=GMY0ktA9HpBWyb4Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    ),
    new Song(
        "Rolling Stone", 
        "Brent Faiyaz", 
        "Wasteland", 
        "2022", 
        "R&B", 
        "RollingStone.png", 
        '<iframe width="100%" height="315" src="https://www.youtube.com/embed/R17MlsD2fng?si=NpzHoj-C6FdEJznZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    ),
    new Song(
        "Hotline Bling", 
        "Drake", 
        "Views", 
        "2016", 
        "Hip Hop", 
        "HotlineBling.png", 
        '<iframe width="100%" height="315" src="https://www.youtube.com/embed/uxpDa-c-4Mc?si=KhjfD6VLZTFdg8S_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    )
];

const musicSection = document.getElementById("music_section");

songs.forEach(song => {
    musicSection.appendChild(song.getSection());
});

// Close the modal when clicking outside of the modal content
window.onclick = function(event) {
    const modal = document.getElementById('id01');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}