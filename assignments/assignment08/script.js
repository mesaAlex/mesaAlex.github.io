// Helpers 
function show(el) { el.classList.remove("is-hidden"); }
function hide(el) { el.classList.add("is-hidden"); }

// Elements 
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");
const navArrow = document.getElementById("navArrow");

const btnEx1 = document.getElementById("btnEx1");
const btnEx2 = document.getElementById("btnEx2");

const exercise1 = document.getElementById("exercise1");
const exercise2 = document.getElementById("exercise2");

const minutesSlider = document.getElementById("minutesSlider");
const minutesValue = document.getElementById("minutesValue");
const ex1Message = document.getElementById("ex1Message");
const ex2Message = document.getElementById("ex2Message");

// This is the toggle for the small screens
function setMenuExpanded(isExpanded) {
	navToggle.setAttribute("aria-expanded", String(isExpanded));
	navList.classList.toggle("is-collapsed", !isExpanded);
	navArrow.textContent = isExpanded ? "▲" : "▼";
}

navToggle.addEventListener("click", () => {
	const expanded = navToggle.getAttribute("aria-expanded") === "true";
	setMenuExpanded(!expanded);
});

// start collapsed on small screens (CSS hides anyway, but keep ARIA consistent)
setMenuExpanded(false);

// Exercise switching
function openExercise1() {
	show(exercise1);
	hide(exercise2);
	updateExercise1Message();
}

function openExercise2() {
	hide(exercise1);
	show(exercise2);
	updateExercise2Message();
}

btnEx1.addEventListener("click", openExercise1);
btnEx2.addEventListener("click", openExercise2);

// Exercise 1
function updateExercise1Message() {
	const mins = Number(minutesSlider.value);
	minutesValue.textContent = String(mins);

	// Required ranges (0–60):
	// >45, 30–45, 15–30, <15
	let msg = "";
	if (mins > 45) {
		msg = "🍳 Plenty of time. Chill — you could even make breakfast.";
	} else if (mins >= 30) {
		msg = "🧃 You’re good. Grab a snack and head out soon.";
	} else if (mins >= 15) {
		msg = "☕ Time to move. Coffee in hand, let’s go.";
	} else {
		msg = "🏃‍♀️ Speed mode. You’re cutting it close!";
	}

	ex1Message.textContent = msg;
}

minutesSlider.addEventListener("input", updateExercise1Message);
updateExercise1Message(); // initialize

// Exercise 2
function updateExercise2Message() {
	const now = new Date();
	const dayOfWeek = now.getDay();

	// Check if it's Tuesday (2) or Thursday (4)
	const isTueThu = dayOfWeek === 2 || dayOfWeek === 4;

	if (!isTueThu) {
		ex2Message.textContent = "No class today (class is Tuesday & Thursday 8:30am-9:45am).";
		return;
	}

	// class start time: 8:30am
	const classStart = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		8, 30, 0, 0
	);

	// class end time: 9:45am
	const classEnd = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		9, 45, 0, 0
	);

	// minutes until class start: positive means still time left
	const diffMsStart = classStart - now;
	const diffMinStart = Math.round(diffMsStart / 60000);

	let msg = "";

	if (diffMinStart > 15) {
		msg = `You have ${diffMinStart} minutes. Plenty of time — maybe finish that snack.`;
	} else if (diffMinStart >= 10) {
		msg = `${diffMinStart} minutes left. Tidy up and roll out soon.`;
	} else if (diffMinStart >= 5) {
		msg = `${diffMinStart} minutes left. Time to hustle — shoes on!`;
	} else if (diffMinStart >= 0) {
		msg = `${diffMinStart} minutes left. It's basically go-time.`;
	} else {
		// diffMinStart < 0: class has started (might still be in session or already ended)
		const minutesSinceStart = Math.round((now - classStart) / 60000);
		if (now < classEnd) {
			// class is currently in session
			if (minutesSinceStart <= 5) {
				msg = `Class started ${minutesSinceStart} minutes ago. You're barely late — sneak in!`;
			} else if (minutesSinceStart <= 15) {
				msg = `Class started ${minutesSinceStart} minutes ago. Hop in — you haven't missed much!`;
			} else {
				msg = `Class started ${minutesSinceStart} minutes ago. You're pretty late, but join the fun.`;
			}
		} else {
			// class already ended — show missed-class message with minutes passed
			const minutesAfterEnd = Math.round((now - classEnd) / 60000);
			msg = `You missed class :( It ended ${minutesAfterEnd} minutes ago.`;
		}
	}

	ex2Message.textContent = msg;
}

// If user sits on Exercise 2, keep it updating
let ex2Interval = null;
function startEx2Timer() {
	if (ex2Interval) clearInterval(ex2Interval);
	updateExercise2Message();
	ex2Interval = setInterval(updateExercise2Message, 15000);
}

btnEx2.addEventListener("click", startEx2Timer);

// This initializes the page with Exercise 1 open
openExercise1();
 