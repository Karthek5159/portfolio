// =========================
// Typing Animation
// =========================

const textArray = [
    "Software Developer",
    ".NET Developer",
    "GIS Mapping Enthusiast",
    "ServiceNow Learner",
    "Problem Solver"
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {

    const typing = document.getElementById("typing-text");

    if (!typing) return;

    if (!isDeleting) {

        currentText = textArray[index].substring(0, charIndex++);
        typing.textContent = currentText;

        if (charIndex > textArray[index].length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }

    } else {

        currentText = textArray[index].substring(0, charIndex--);
        typing.textContent = currentText;

        if (charIndex < 0) {
            isDeleting = false;
            index = (index + 1) % textArray.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 40 : 80);
}

typeEffect();


// =========================
// Mobile Navigation
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


// =========================
// Smart Navbar
// =========================

const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    // Navbar background
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Active menu
    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


const form = document.getElementById("contact-form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        emailjs.sendForm(
            "service_fejgvl3",
            "template_ufgiru6",
            this
        )
        .then(() => {

            alert("✅ Message sent successfully!");
            form.reset();

        })
        .catch((error) => {

            console.error(error);
            alert("❌ Failed to send message.");

        });

    });

}
