/* ==========================================
        Bianca Portfolio V2
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initTyping();
    initProgressBar();
    initNavbar();
    initReveal();
    initSmoothScroll();
    initPhotoTilt();
    initRipple();
    initBugGame();
    initContactForm();

});

/* ==========================================
        Typing Effect
========================================== */

function initTyping() {

    const text = document.querySelector(".typing-text span");

    if (!text) return;

    const words = [
        "Computer Science Student",
        "Aspiring Front-End Developer",
        "Digital Artist",
        "UI/UX Enthusiast"
    ];

    let word = 0;
    let letter = 0;
    let deleting = false;

    function type() {

        const current = words[word];

        if (!deleting) {

            text.textContent = current.substring(0, letter);
            letter++;

            if (letter > current.length) {
                deleting = true;
                setTimeout(type, 1400);
                return;
            }

        } else {

            text.textContent = current.substring(0, letter);
            letter--;

            if (letter < 0) {
                deleting = false;
                word = (word + 1) % words.length;
            }

        }

        setTimeout(type, deleting ? 45 : 90);

    }

    type();

}

/* ==========================================
        Progress Bar
========================================== */

function initProgressBar() {

    const progress = document.getElementById("progress");

    if (!progress) return;

    window.addEventListener("scroll", () => {

        const total =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percent =
            (window.scrollY / total) * 100;

        progress.style.width = percent + "%";

    });

}

/* ==========================================
        Active Navigation
========================================== */

function initNavbar() {

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = window.scrollY;
            const offset = section.offsetTop - 180;
            const height = section.offsetHeight;

            if (top >= offset && top < offset + height) {
                current = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }

        });

    });

}

/* ==========================================
        Smooth Scroll
========================================== */

function initSmoothScroll() {

    document.querySelectorAll('nav a').forEach(link => {

        link.addEventListener('click', function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

}

/* ==========================================
        Scroll Reveal
========================================== */

function initReveal() {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: .15

    });

    document.querySelectorAll("section,.card").forEach(item => {

        observer.observe(item);

    });

}

/* ==========================================
        Photo Tilt
========================================== */

function initPhotoTilt() {

    const frame = document.querySelector(".photo-frame");

    if (!frame) return;

    frame.addEventListener("mousemove", e => {

        const rect = frame.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - .5) * 12;
        const rotateX = ((y / rect.height) - .5) * -12;

        frame.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.03)`;

    });

    frame.addEventListener("mouseleave", () => {

        frame.style.transform =
            "perspective(900px) rotateX(0) rotateY(0) scale(1)";

    });

}

/* ==========================================
        Button Ripple
========================================== */

function initRipple() {

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            const size = Math.max(
                this.clientWidth,
                this.clientHeight
            );

            circle.style.width = size + "px";
            circle.style.height = size + "px";

            circle.classList.add("ripple");

            const rect = this.getBoundingClientRect();

            circle.style.left =
                e.clientX - rect.left - size / 2 + "px";

            circle.style.top =
                e.clientY - rect.top - size / 2 + "px";

            this.appendChild(circle);

            setTimeout(() => {

                circle.remove();

            }, 600);

        });

    });

}

/* ==========================================
        Mini Game: Bug Squash
========================================== */

function initBugGame() {

    const board = document.getElementById("gameBoard");
    const startBtn = document.getElementById("gameStartBtn");
    const scoreEl = document.getElementById("gameScore");
    const timeEl = document.getElementById("gameTime");

    if (!board || !startBtn || !scoreEl || !timeEl) return;

    const bugEmojis = ["🐛", "🪲", "🐞"];
    const GAME_LENGTH = 20;

    let score = 0;
    let timeLeft = GAME_LENGTH;
    let spawnTimer = null;
    let countdownTimer = null;
    let playing = false;

    function clearBugs() {
        board.querySelectorAll(".bug").forEach(b => b.remove());
    }

    function spawnBug() {

        clearBugs();

        const bug = document.createElement("button");
        bug.className = "bug";
        bug.type = "button";
        bug.textContent =
            bugEmojis[Math.floor(Math.random() * bugEmojis.length)];

        const boardRect = board.getBoundingClientRect();
        const maxX = Math.max(boardRect.width - 50, 20);
        const maxY = Math.max(boardRect.height - 50, 20);

        bug.style.left = Math.random() * maxX + "px";
        bug.style.top = Math.random() * maxY + "px";

        bug.addEventListener("click", () => {

            if (!playing) return;

            score++;
            scoreEl.textContent = score;
            spawnBug();

        });

        board.appendChild(bug);

    }

    function endGame() {

        playing = false;

        clearInterval(spawnTimer);
        clearInterval(countdownTimer);

        clearBugs();

        const hint = document.createElement("p");
        hint.className = "game-hint";
        hint.textContent =
            `Time's up! Final score: ${score} 🐛 — Press "Start Game" to play again.`;

        board.appendChild(hint);

        startBtn.textContent = "Play Again";
        startBtn.disabled = false;

    }

    function startGame() {

        playing = true;
        score = 0;
        timeLeft = GAME_LENGTH;

        scoreEl.textContent = score;
        timeEl.textContent = timeLeft + "s";

        clearBugs();
        spawnBug();

        startBtn.textContent = "Playing...";
        startBtn.disabled = true;

        countdownTimer = setInterval(() => {

            timeLeft--;
            timeEl.textContent = Math.max(timeLeft, 0) + "s";

            if (timeLeft <= 0) {
                endGame();
            }

        }, 1000);

        spawnTimer = setInterval(() => {

            if (playing) spawnBug();

        }, 1600);

    }

    startBtn.addEventListener("click", startGame);

}

/* ==========================================
        Contact Form (no backend yet)
========================================== */

function initContactForm() {

    const form = document.querySelector(".contact-form");
    const submitBtn = document.getElementById("contactSubmit");

    if (!form || !submitBtn) return;

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        // NOTE: This form has no backend connected yet.
        // Hook this up to a service like Formspree, EmailJS,
        // or your own API endpoint to actually receive messages.

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Message Sent ✓ (demo)";
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 2200);

    });

}