/* Triangle code */
const container = document.getElementById('triangle-container');
const triangle = document.getElementById('triangle-up');

container.addEventListener('click', function() {
    triangle.classList.toggle('visible');
});

/* Date code */
const date_picker = document.getElementById('party');
const date_area = document.getElementById('date_area');
const toggle_date_visible = document.getElementById('display-date');

date_picker.addEventListener('change', function() {
    const selected_date = date_picker.value;

    if(selected_date) {
        date_area.textContent = selected_date;
        toggle_date_visible.style.display = "block";
    } else {
        date_area.textContent = 'None Selected';
        toggle_date_visible.style.display = "none";
    }
});

/* Image code */
const img = document.getElementById('gato');

img.addEventListener('click', function() {
    this.classList.toggle('border-active');
});