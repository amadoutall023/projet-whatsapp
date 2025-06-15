import './style.css';


import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';

import { renderDashboard } from './vieuws/dashbord.vieuw.js';
import { renderLogin } from './vieuws/login.vieuw.js';

const currentUser = "alice"; // Utilisateur connecté

async function startApp() {
  try {
    const response = await fetch('https://json-server-lt3n.onrender.com/contacts');
    const appusers = await response.json();
    renderLogin(appusers); // ⚠️ Correction : variable correcte passée ici
  } catch (error) {
    console.error('Erreur lors du chargement des contacts :', error);
  }
}

startApp();

// Chargement des messages
async function fetchMessages() {
  try {
    const response = await fetch("https://json-server-lt3n.onrender.com/messages");
    const messages = await response.json();

    const container = document.getElementById("messagesContainer");
    if (!container) return;

    container.innerHTML = "";

    messages.forEach(msg => {
      const isSent = msg.from === currentUser;

      const bubble = document.createElement("div");
      bubble.className = `max-w-[60%] px-4 py-2 rounded-xl shadow message-bubble ${
        isSent
          ? "bg-orange-400 text-white self-end ml-auto"
          : "bg-white text-gray-800 self-start mr-auto"
      }`;

      const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      bubble.innerHTML = `
        <div class="text-sm">${msg.content}</div>
        <div class="text-xs text-right mt-1 opacity-70">${time}</div>
      `;

      container.appendChild(bubble);
    });

    container.scrollTop = container.scrollHeight;
  } catch (err) {
    console.error("Erreur lors du chargement des messages :", err);
  }
}

// Chargement des contacts
async function fetchContacts() {
  try {
    const res = await fetch("https://json-server-lt3n.onrender.com/contacts");
    const contacts = await res.json();

    const contactsContainer = document.getElementById("contactsList");
    if (!contactsContainer) return;

    contactsContainer.innerHTML = "";

    contacts.forEach(contact => {
      const div = document.createElement("div");
      div.className = "flex items-center space-x-3 p-2 rounded hover:bg-gray-100 cursor-pointer";

      div.innerHTML = `
        <div class="text-2xl">${contact.avatar || "👤"}</div>
        <div class="text-sm font-medium">${contact.name}</div>
      `;

      contactsContainer.appendChild(div);
    });
  } catch (err) {
    console.error("Erreur lors du chargement des contacts :", err);
  }
}

// Rafraîchissement régulier
setInterval(fetchMessages, 5000);

// Optionnel : expose les fonctions si besoin
window.fetchMessages = fetchMessages;
window.fetchContacts = fetchContacts;
