// ===============================
// SOL & SAVEUR
// script.js
// ===============================

// Menu mobile

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if(menuBtn){

menuBtn.addEventListener("click", () => {

navMenu.classList.toggle("show");

});

}

// Fermer le menu après clic

document.querySelectorAll("#navMenu a").forEach(link => {

link.addEventListener("click", () => {

if(window.innerWidth <= 768){

navMenu.classList.remove("show");

}

});

});

// Animation apparition au scroll

const reveals = document.querySelectorAll(".reveal");

function revealElements(){

reveals.forEach(element => {

const windowHeight = window.innerHeight;

const elementTop = element.getBoundingClientRect().top;

const revealPoint = 100;

if(elementTop < windowHeight - revealPoint){

element.classList.add("active");

}

});

}

window.addEventListener("scroll", revealElements);

revealElements();

// Header transparent puis blanc

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

if(window.scrollY > 50){

header.style.background = "rgba(255,255,255,.98)";
header.style.boxShadow = "0 5px 20px rgba(0,0,0,.08)";

}else{

header.style.background = "rgba(255,255,255,.95)";
header.style.boxShadow = "0 2px 20px rgba(0,0,0,.05)";

}

});

// Animation galerie

const galleryImages = document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(image => {

image.addEventListener("mouseenter", () => {

image.style.transform = "scale(1.05)";

});

image.addEventListener("mouseleave", () => {

image.style.transform = "scale(1)";

});

});

// Animation cartes produits

const productCards = document.querySelectorAll(".product-card");

productCards.forEach(card => {

card.addEventListener("mouseenter", () => {

card.style.transform = "translateY(-10px)";

});

card.addEventListener("mouseleave", () => {

card.style.transform = "translateY(0)";

});

});

// Formulaire de contact

const form = document.querySelector("form");

if(form){

form.addEventListener("submit", function(event){

event.preventDefault();

const button = form.querySelector("button");

button.innerHTML = "Message envoyé ✓";

button.style.background = "#1f6b2c";

setTimeout(() => {

button.innerHTML = "Envoyer le message";

},3000);

form.reset();

});

}

// Scroll fluide amélioré

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior: "smooth",
block: "start"

});

}

});

});

// Animation compteur (si ajout futur)

function animateCounter(element, target){

let current = 0;

const increment = target / 100;

const timer = setInterval(() => {

current += increment;

if(current >= target){

current = target;

clearInterval(timer);

}

element.textContent = Math.floor(current);

},20);

}

// Préchargement images

window.addEventListener("load", () => {

document.body.classList.add("loaded");

});

// Bouton WhatsApp effet pulse

const whatsappBtn = document.querySelector(".whatsapp-btn");

if(whatsappBtn){

setInterval(() => {

whatsappBtn.animate(

[
{ transform: "scale(1)" },
{ transform: "scale(1.1)" },
{ transform: "scale(1)" }
],

{
duration: 1200
}

);

},3000);

}
