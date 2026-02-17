const bubble_container = document.getElementById("water");
const number_of_bubbles = 20;
const containerHeight = bubble_container.offsetHeight;

for (let i = 0; i<number_of_bubbles; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add(`bubble`);

    const randomX = Math.random() * (bubble_container.offsetWidth - 30);
    bubble.style.left = randomX + "px";

    bubble.style.animationDuration = (Math.random() * 3 + 2) + "s";
    bubble.style.animationDelay = (Math.random() * 5) + "s";

    bubble_container.appendChild(bubble);
};