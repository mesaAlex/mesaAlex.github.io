const dropdown = document.querySelector(".dropdown");
const dropdownBtn = document.getElementsByClassName("dropdown_btn")[0];
const dropdownContent = document.querySelector(".dropdown_content");


dropdown.addEventListener("mouseover", function() {
    dropdownContent.classList.remove("disappear");
});

dropdown.addEventListener("mouseout", function() {
    dropdownContent.classList.add("disappear");
});

// Define mood arrays
const happy = ["Tyla | Chanel", "Justin Bieber | Beauty and the Beat", "Raymix | Primer Beso", "Banda Sinaloense | Cacajuates, Pistaches", "Coldplay | Adventure of a Lifetime"];
const happyLinks = ['https://www.youtube.com/embed/3tA6KH07u_Y?si=mO-8z7q-Gdewv6G_', 'https://www.youtube.com/embed/Ys7-6_t7OEQ?si=eAgH4hDme_LnRzyE', 'https://www.youtube.com/embed/hJYdnD0Vkxw?si=1dE47Vg4Ncs2sN25', 'https://www.youtube.com/embed/1bTR_Op0Ges?si=hDgiLTMY46MVANKA', 'https://www.youtube.com/embed/QtXby3twMmI?si=5llwk4fjvmiNklMf'];

const sad = ["Lauv | Who Are You?", "Kurt Kobain | And I Love Her", "\"Fallen Kingdom\" | A Minecraft Parody of Coldplay's Viva la Vida", "The Weeknd | Call Out My Name", "Joji | Dancing in the Dark"];
const sadLinks = ['https://www.youtube.com/embed/vS0YXAfUo4k?si=oWJo5xDfaSMS6Fle', 'https://www.youtube.com/embed/rBzA4shGmw8?si=u60I_GbXiXpsPpSS', 'https://www.youtube.com/embed/I-sH53vXP2A?si=71k7Dk_SBs9bcGgH', 'https://www.youtube.com/embed/M4ZoCHID9GI?si=zqLZfPO0aQgp-3V7', 'https://www.youtube.com/embed/K3Qzzggn--s?si=piNV-YaxknkEVFx4'];

// Get all links in the dropdown
const dropdownLinks = document.querySelectorAll(".dropdown_content a");

// Add click event listener to each mood option
dropdownLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default link behavior
        
        const selectedMood = this.textContent; // Get the clicked mood
        const displayArea = document.getElementById("display_selection"); 
        
        let songsArray = [];
        let linksArray = [];
        
        if (selectedMood === "Happy") {
            songsArray = happy;
            linksArray = happyLinks;
            dropdownBtn.innerHTML = "Happy &#9660;";
        } else if (selectedMood === "Sad") {
            songsArray = sad;
            linksArray = sadLinks;
            dropdownBtn.innerHTML = "Sad &#9660;";
        }
        
        // let songListHTML = `<p>You selected: <strong>${selectedMood}</strong></p><ul>`;
        let songListHTML = `<ul>`;
        songsArray.forEach(function(song, index) {
            songListHTML += `<li><a href="#" class="song-link" data-video-url="${linksArray[index]}">${song}</a></li>`;
        });
        songListHTML += `</ul>`;
        
        displayArea.innerHTML = songListHTML;
        
        const songLinks = document.querySelectorAll(".song-link");
        songLinks.forEach(function(songLink) {
            songLink.addEventListener("click", function(e) {
                e.preventDefault();
                const videoUrl = this.getAttribute("data-video-url");
                const videoIframe = document.querySelector(".video");
                videoIframe.src = videoUrl;
                videoIframe.classList.remove("hidden"); // Show video
            });
        });
        
        // Hide dropdown after selection
        document.querySelector(".dropdown_content").classList.add("disappear");
    });
});