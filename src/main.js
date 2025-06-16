import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import { renderDashboard } from './vieuws/dashbord.vieuw.js';
import { renderLogin } from './vieuws/login.vieuw.js';

let currentUser = "alice";
let selectedContact = null;
let messages = [];

async function startApp() {
  try {
    const response = await fetch('https://json-server-lt3n.onrender.com/contacts');
    const appusers = await response.json();
    renderLogin(appusers);
  } catch (error) {
    console.error('Erreur lors du chargement des contacts :', error);
  }
}

startApp();

async function fetchMessages() {
  try {
    const response = await fetch("https://json-server-lt3n.onrender.com/messages");
    messages = await response.json();

    if (!selectedContact) return;

    displayMessages();
  } catch (err) {
    console.error("Erreur lors du chargement des messages :", err);
  }
}

async function fetchContacts() {
  try {
    const res = await fetch("https://json-server-lt3n.onrender.com/contacts");
    const contacts = await res.json();

    const contactsContainer = document.getElementById("contactsList");
    if (!contactsContainer) return;

    contactsContainer.innerHTML = "";

    contacts.forEach(contact => {
      const div = document.createElement("div");
      div.className = `flex items-center space-x-3 p-3 rounded hover:bg-gray-100 cursor-pointer transition ${
        selectedContact && selectedContact.name === contact.name ? 'bg-blue-100' : ''
      }`;

      div.innerHTML = `
        <div class="relative w-10 h-10">
          <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
            ${contact.avatar || "👤"}
          </div>
          <span class="absolute bottom-0 right-0 w-3 h-3 ${
            contact.online ? 'bg-green-500' : 'bg-gray-400'
          } border-2 border-white rounded-full"></span>
        </div>
        <div class="flex flex-col">
          <div class="text-sm font-semibold text-gray-800">${contact.name}</div>
          <div class="text-xs text-gray-500">${contact.online ? 'En ligne' : 'Hors ligne'}</div>
        </div>
      `;

      div.addEventListener('click', () => {
        selectContact(contact);
      });

      contactsContainer.appendChild(div);
    });
  } catch (err) {
    console.error("Erreur lors du chargement des contacts :", err);
  }
}

function updateChatHeader(contact) {
  const headerAvatar = document.getElementById("header-avatar");
  const headerName = document.getElementById("header-name");

  if (headerAvatar) {
    headerAvatar.textContent = contact.avatar || "👤";
  }

  if (headerName) {
    headerName.textContent = contact.name || "Utilisateur inconnu";
  }
}

function selectContact(contact) {
  if (!contact) {
    console.error("Contact undefined in selectContact");
    return;
  }

  selectedContact = contact;
  updateChatHeader(contact);
  fetchContacts();
  displayMessages();
}

function displayMessages() {
  const container = document.getElementById('messagesContainer');

  // ✅ Vérifie si container ou selectedContact est null
  if (!container || !selectedContact || !selectedContact.name) {
    console.warn('Aucun contact sélectionné pour afficher les messages.');
    return;
  }

  container.innerHTML = "";

  // ✅ Filtrer uniquement les messages entre currentUser et selectedContact
  const conversation = messages.filter(msg =>
    (msg.from?.toLowerCase() === currentUser.toLowerCase() && msg.to?.toLowerCase() === selectedContact.name.toLowerCase()) ||
    (msg.to?.toLowerCase() === currentUser.toLowerCase() && msg.from?.toLowerCase() === selectedContact.name.toLowerCase())
  );

  if (conversation.length === 0) {
    container.innerHTML = `<div class="text-center text-gray-400 mt-10">Aucun message avec ${selectedContact.name}</div>`;
    return;
  }

  conversation.forEach(msg => {
    const isSent = msg.from?.toLowerCase() === currentUser.toLowerCase();
    const div = document.createElement('div');
    div.className = `flex ${isSent ? 'justify-end' : 'justify-start'} mb-3`;

    const bubble = document.createElement('div');
    bubble.className = `max-w-[60%] px-4 py-2 rounded-xl shadow ${
      isSent ? 'bg-orange-400 text-white' : 'bg-white text-gray-800'
    }`;

    const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    bubble.innerHTML = `<div class="text-sm">${msg.content}</div><div class="text-xs text-right mt-1 opacity-70">${time}</div>`;

    div.appendChild(bubble);
    container.appendChild(div);
  });

  container.scrollTop = container.scrollHeight;
}


async function sendMessage(content) {
  if (!content || !content.trim() || !selectedContact) {
    console.log('Impossible d\'envoyer:', { content, selectedContact });
    return;
  }

  const newMessage = {
    from: currentUser,
    to: selectedContact.name,
    content: content.trim(),
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch("https://json-server-lt3n.onrender.com/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage)
    });

    if (response.ok) {
      await fetchMessages();
    } else {
      console.error("Erreur lors de l'envoi:", response.status);
    }
  } catch (err) {
    console.error("Erreur réseau :", err);
  }
}

// Fonction déclenchée par le bouton "Envoyer"
function handleSend() {
  const input = document.getElementById("messageInput");
  const content = input?.value || "";

  if (!selectedContact) {
    alert("Veuillez sélectionner un contact.");
    return;
  }

  if (!content.trim()) {
    alert("Le message est vide.");
    return;
  }

  sendMessage(content);
  input.value = "";
}
function logout() {
  // Effacer l'utilisateur actuel
  currentUser = null;
  selectedContact = null;

  // Nettoyer l'affichage
  const app = document.getElementById("app");
  if (app) app.innerHTML = "";

  // Revenir à la page de connexion
  startApp();
}


// Rafraîchir automatiquement les messages
setInterval(fetchMessages, 5000);

// Rendre les fonctions disponibles globalement (facultatif)
window.fetchMessages = fetchMessages;
window.fetchContacts = fetchContacts;
window.selectContact = selectContact;
window.sendMessage = sendMessage;
window.displayMessages = displayMessages;
window.handleSend = handleSend;
window.logout = logout;
