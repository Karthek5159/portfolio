// =========================
// EmailJS Initialization
// =========================

emailjs.init({
    publicKey: "1eBh6Tm_gxmLE9Th2"
});

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
let isDeleting = false;

function typeEffect() {

    const typing = document.getElementById("typing-text");

    if (!typing) return;

    const currentText = textArray[index];

    if (!isDeleting) {

        typing.textContent = currentText.substring(0, charIndex++);
        
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }

    } else {

        typing.textContent = currentText.substring(0, charIndex--);

        if (charIndex < 0) {
            isDeleting = false;
            index = (index + 1) % textArray.length;
        }

    }

    setTimeout(typeEffect, isDeleting ? 40 : 80);

}

window.addEventListener("DOMContentLoaded", typeEffect);

// =========================
// Mobile Navigation
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

// =========================
// Smart Navbar
// =========================

const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    if (navbar) {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
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

// Close menu after clicking link

navItems.forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

    });

});

// =========================
// Contact Form (EmailJS)
// =========================

const form = document.getElementById("contact-form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const button = form.querySelector("button");

        if (button) {

            button.disabled = true;
            button.innerHTML = "Sending...";

        }

        emailjs.sendForm(
            "service_fejgvl3",
            "template_ufgiru6",
            form
        )

        .then(() => {

            alert("✅ Message sent successfully!");

            form.reset();

            if (button) {

                button.disabled = false;
                button.innerHTML = `
                    <i class="fas fa-paper-plane"></i>
                    Send Message
                `;

            }

        })

        .catch((error) => {

            console.error(error);

            alert("❌ Failed to send message\n\n" + error.text);

            if (button) {

                button.disabled = false;
                button.innerHTML = `
                    <i class="fas fa-paper-plane"></i>
                    Send Message
                `;

            }

        });

    });

}

// =========================
// Certificate Modal
// =========================

function openCertificate(image) {

    document.getElementById("certificateImage").src = image;
    document.getElementById("certificateModal").style.display = "flex";

}

function closeCertificate() {

    document.getElementById("certificateModal").style.display = "none";

}

window.addEventListener("click", function (event) {

    const modal = document.getElementById("certificateModal");

    if (modal && event.target === modal) {

        closeCertificate();

    }

});

// =========================
// Counter Animation
// =========================

const counters = document.querySelectorAll(".counter");
const speed = 150;

counters.forEach(counter => {

    const update = () => {

        const target = +counter.dataset.target;
        const count = +counter.innerText;

        const increment = Math.ceil(target / speed);

        if (count < target) {

            counter.innerText = count + increment;
            setTimeout(update, 15);

        } else {

            counter.innerText = target;

        }

    };

    update();

});

// =========================
// Visitor Counter
// =========================

const visitor = document.getElementById("visitor-count");

if (visitor) {

    fetch("https://api.countapi.xyz/hit/karthek-portfolio/visits")
        .then(res => res.json())
        .then(data => {

            visitor.textContent = data.value.toLocaleString();

        })
        .catch(() => {

            visitor.textContent = "0";

        });

}
