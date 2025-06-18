import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import { renderDashboard } from './vieuws/dashbord.vieuw.js';
import { renderLogin } from './vieuws/login.vieuw.js';

let currentUser = "alice";
let selectedContact = null;
let messages = [];
let groups = [];

const API_BASE_URL = location.hostname === 'localhost'
  ? 'http://localhost:3002'  // Changer 3000 en 3002
  : 'https://json-server-lt3n.onrender.com';

async function startApp() {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts`);
    const appusers = await response.json();
    renderLogin(appusers);
  } catch (error) {
    console.error('Erreur lors du chargement des contacts :', error);
  }
}

startApp();

async function fetchMessages() {
  try {
    const response = await fetch(`${API_BASE_URL}/messages`);
    messages = await response.json();

    if (!selectedContact) return;

    displayMessages();
  } catch (err) {
    console.error("Erreur lors du chargement des messages :", err);
  }
}

async function fetchContacts() {
  try {
    const res = await fetch('https://json-server-lt3n.onrender.com/contacts');
    if (!res.ok) throw new Error('Erreur de récupération des contacts');
    
    const contacts = await res.json();

    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = ''; // On vide la liste actuelle

    contacts.forEach(contact => {
      const contactItem = document.createElement('div');
      contactItem.className = 'p-4 border-b hover:bg-gray-50 cursor-pointer';

      contactItem.innerHTML = `
        <div class="flex items-center space-x-4">
          <div class="relative w-12 h-12">
            <div class="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl">
              <i class="fas fa-user"></i>
            </div>
            <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h3 class="text-md font-semibold text-gray-800">${contact.name}</h3>
            <p class="text-sm text-gray-500">${contact.phone}</p>
            <p class="text-xs text-green-600 font-medium">Online</p>
          </div>
        </div>
      `;

      contactItem.addEventListener('click', () => {
        selectContact(contact);
      });

      contactsList.appendChild(contactItem);
    });
    
  } catch (err) {
    console.error('Erreur dans fetchContacts:', err);
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '<p class="text-red-500 p-2">Impossible de charger les contacts.</p>';
  }
}





async function handleAddContact() {
  const contactName = document.getElementById("contactName");
  const contactPhone = document.getElementById("contactPhone");
  const name = contactName.value.trim();
  const phone = contactPhone.value.trim();
  let valid = true;

  // Reset styles
  contactName.style.borderColor = "";
  contactPhone.style.borderColor = "";

  // Validation
  if (!name) {
    contactName.style.borderColor = "red";
    valid = false;
  }

  if (!phone || isNaN(phone) || !Number.isInteger(Number(phone))) {
    contactPhone.style.borderColor = "red";
    valid = false;
  }

  if (!valid) return;

  try {
    // Récupérer tous les contacts pour générer un id unique
    const resGet = await fetch("https://json-server-lt3n.onrender.com/contacts");
    const contacts = await resGet.json();
    const maxId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id || 0)) : 0;
    const newId = maxId + 1;

    const newContact = {
      id: newId,
      name,
      phone,
      avatar: "👤",
      online: false,
      idcontacts: [],
      messages: []
    };

    const res = await fetch("https://json-server-lt3n.onrender.com/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact)
    });

    if (res.ok) {
      document.getElementById("addContactModal").classList.add("hidden");
      document.getElementById("addContactForm").reset();

      // Recharge les contacts
      if (!document.getElementById("contactsList")) {
        const appusers = await (await fetch(`${API_BASE_URL}/contacts`)).json();
        renderDashboard(currentUser, appusers);
      }

      await fetchContacts(); // Assure que le contact est bien affiché
    } else {
      throw new Error("Erreur lors de l'enregistrement");
    }
  } catch (err) {
    console.error("❌ Erreur :", err);
    contactName.style.borderColor = "red";
    contactPhone.style.borderColor = "red";
    alert("❌ Une erreur est survenue lors de l'ajout du contact.");
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
  fetchMessages();
}

function displayMessages() {
  const container = document.getElementById('messagesContainer');

  if (!container || !selectedContact || !selectedContact.name) {
    console.warn('Aucun contact sélectionné pour afficher les messages.');
    return;
  }

  container.innerHTML = "";

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
    const response = await fetch(`${API_BASE_URL}/messages`, {
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
  currentUser = null;
  selectedContact = null;

  const app = document.getElementById("app");
  if (app) app.innerHTML = "";

  startApp();
}

async function afficherGroupesDansContactsList() {
  try {
    const response = await fetch(`http://localhost:3002/groups`);
    if (!response.ok) throw new Error("Endpoint /groups introuvable");

    const groupes = await response.json();
    const container = document.getElementById("contactsList");
    if (!container) return;

    container.innerHTML = ""; // Vide la liste avant d'ajouter

    groupes.forEach(groupe => {
      const div = document.createElement("div");
      div.className = `flex items-center space-x-3 p-3 rounded hover:bg-gray-100 cursor-pointer transition`;

      div.innerHTML = `
        <div class="relative w-10 h-10">
          <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
            ${groupe.avatar || "👥"}
          </div>
        </div>
        <div class="flex flex-col">
          <div class="text-sm font-semibold text-gray-800">${groupe.name}</div>
          <div class="text-xs text-gray-500">Groupe</div>
        </div>
      `;

      div.addEventListener('click', () => openGroupChat(groupe.id));
      container.appendChild(div);
    });

  } catch (err) {
    console.error("Erreur lors de l'affichage des groupes :", err);
    alert("❌ Impossible de charger les groupes. Vérifie que /groups existe sur ton serveur JSON.");
  }
}

async function ajouterGroupe(groupName, memberIds) {
  const newGroup = {
    name: groupName,
    avatar: "👪",
    members: memberIds,
    messages: []
  };

  try {
    const response = await fetch(`${API_BASE_URL}/groups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGroup)
    });

    if (response.ok) {
   
      afficherGroupesDansContactsList();
    } else {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Erreur lors de la création du groupe:', error);
  
  }
}
async function openGroupChat(groupId) {
  try {
    const res = await fetch(`${API_BASE_URL}/groups/${groupId}`);
    if (!res.ok) throw new Error("Groupe non trouvé");

    const group = await res.json();
    selectedContact = {
      name: group.name,
      avatar: group.avatar,
      isGroup: true,
      id: groupId
    };
    updateChatHeader(selectedContact);
    displayMessages(); // Tu devras adapter cette fonction si tu veux afficher des messages de groupe
  } catch (error) {
    console.error('Erreur ouverture chat groupe:', error);
 
  }
}
async function ouvrirCreateGroupModal() {
  try {
    const res = await fetch(`${API_BASE_URL}/contacts`);
    if (!res.ok) throw new Error('Erreur récupération contacts');
    const contacts = await res.json();

    const membersCheckboxList = document.getElementById('membersCheckboxList');
    const groupErrorMessage = document.getElementById('groupErrorMessage');

    membersCheckboxList.innerHTML = '';
    groupErrorMessage.textContent = '';

    contacts.forEach(contact => {
      const div = document.createElement('div');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `member-${contact.id}`;
      checkbox.value = contact.id;
      checkbox.addEventListener('change', updateCreateBtnState);

      const label = document.createElement('label');
      label.htmlFor = checkbox.id;
      label.textContent = contact.name;
      label.style.marginLeft = '6px';

      div.append(checkbox, label);
      membersCheckboxList.appendChild(div);
    });

    document.getElementById('groupNameInput').value = '';
    document.getElementById('confirmCreateGroup').disabled = true;

    document.getElementById('createGroupModal').classList.remove('hidden');
  } catch (err) {
    console.error('Erreur fetch contacts:', err);
    alert('Impossible de charger la liste des contacts.');
  }
}
function updateCreateBtnState() {
  const checked = Array.from(document.querySelectorAll('#membersCheckboxList input[type=checkbox]:checked'));
  document.getElementById('confirmCreateGroup').disabled = checked.length < 2;
}
// Fonction pour archiver un contact ou un groupe
async function archiverElement(isGroup = false) {
  if (!selectedContact) {
  
    return;
  }

  console.log('Archivage de:', selectedContact);

  try {
    // Créer l'objet archive avec un nouvel ID unique
    const timestamp = Date.now();
    const archivedItem = {
      id: timestamp, // Nouvel ID unique pour éviter les conflits
      originalId: selectedContact.id, // Garder l'ID original
      name: selectedContact.name,
      avatar: selectedContact.avatar || "👤",
      phone: selectedContact.phone || null,
      isGroup: isGroup || selectedContact.isGroup || false,
      archivedDate: new Date().toISOString(),
      originalData: selectedContact // Sauvegarder les données originales
    };

    console.log('Données à archiver:', archivedItem);

    // Vérifier d'abord si l'endpoint archives existe
    let archivesExist = true;
    try {
      const checkResponse = await fetch(`${API_BASE_URL}/archives`);
      if (checkResponse.status === 404) {
        archivesExist = false;
      }
    } catch (e) {
      archivesExist = false;
    }

    // Si archives n'existe pas, créer la première entrée
    if (!archivesExist) {
      console.log('Création de la collection archives...');
      // Créer un fichier db.json avec la collection archives si nécessaire
      // Pour JSON Server, on peut simplement faire le POST et il créera la collection
    }

    // Ajouter à la liste des archives
    const response = await fetch(`${API_BASE_URL}/archives`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(archivedItem)
    });

    console.log('Réponse archivage:', response.status);

    if (response.ok) {
      // Supprimer de la liste active (contacts ou groupes)
      const endpoint = isGroup ? 'groups' : 'contacts';
      console.log(`Suppression de ${endpoint}/${selectedContact.id}`);
      
      const deleteResponse = await fetch(`${API_BASE_URL}/${endpoint}/${selectedContact.id}`, {
        method: 'DELETE'
      });

      console.log('Réponse suppression:', deleteResponse.status);

      if (deleteResponse.ok) {
       
        
        // Réinitialiser la sélection
        selectedContact = null;
        
        // Rafraîchir la liste
        if (isGroup) {
          await afficherGroupesDansContactsList();
        } else {
          await fetchContacts();
        }
        
        // Vider la zone de chat
        const container = document.getElementById('messagesContainer');
        if (container) {
          container.innerHTML = '<div class="text-center text-gray-400 mt-10">Sélectionnez un contact pour commencer une conversation</div>';
        }
        
        // Réinitialiser l'en-tête du chat
        const headerName = document.getElementById("header-name");
        const headerAvatar = document.getElementById("header-avatar");
        if (headerName) headerName.textContent = "Sélectionnez un contact";
        if (headerAvatar) headerAvatar.textContent = "👤";
        
      } else {
        throw new Error(`Erreur lors de la suppression de la liste active: ${deleteResponse.status}`);
      }
    } else {
      const errorText = await response.text();
      throw new Error(`Erreur lors de l'archivage: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error('Erreur détaillée lors de l\'archivage:', error);
   
  }
}

// Fonction pour afficher les éléments archivés
async function afficherArchives() {
  try {
    const response = await fetch(`${API_BASE_URL}/archives`);
    if (!response.ok) {
      // Si l'endpoint n'existe pas encore, créer une collection vide
      if (response.status === 404) {
        console.log('Collection archives non trouvée, affichage d\'une liste vide');
        afficherListeArchivesVide();
        return;
      }
      throw new Error('Erreur lors de la récupération des archives');
    }

    const archives = await response.json();
    const container = document.getElementById("contactsList");
    if (!container) return;

    container.innerHTML = ""; // Vider la liste

    if (archives.length === 0) {
      container.innerHTML = `
        <div class="text-center text-gray-400 mt-10 p-4">
          <i class="fas fa-archive text-4xl mb-4"></i>
          <p>Aucun élément archivé</p>
        </div>
      `;
      return;
    }

    archives.forEach(archive => {
      const div = document.createElement("div");
      div.className = `flex items-center justify-between p-4 border-b hover:bg-gray-50 cursor-pointer transition`;

      const archivedDate = new Date(archive.archivedDate).toLocaleDateString('fr-FR');
      
      div.innerHTML = `
        <div class="flex items-center space-x-4">
          <div class="relative w-12 h-12">
            <div class="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl">
              ${archive.avatar}
            </div>
            <span class="absolute -top-1 -right-1 w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center">
              <i class="fas fa-archive text-white text-xs"></i>
            </span>
          </div>
          <div class="flex-1">
            <h3 class="text-md font-semibold text-gray-600">${archive.name}</h3>
            ${archive.phone ? `<p class="text-sm text-gray-400">${archive.phone}</p>` : ''}
            <p class="text-xs text-gray-400">
              ${archive.isGroup ? 'Groupe' : 'Contact'} archivé le ${archivedDate}
            </p>
          </div>
        </div>
        <div class="flex space-x-2">
          <button onclick="restaurerElement(${archive.id}, ${archive.isGroup})" 
                  class="p-2 rounded-full hover:bg-green-100 transition-colors" 
                  title="Restaurer">
            <i class="fas fa-undo text-green-600"></i>
          </button>
          <button onclick="supprimerDefinitivement(${archive.id})" 
                  class="p-2 rounded-full hover:bg-red-100 transition-colors" 
                  title="Supprimer définitivement">
            <i class="fas fa-trash text-red-600"></i>
          </button>
        </div>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error('Erreur lors de l\'affichage des archives:', error);
    const container = document.getElementById("contactsList");
    if (container) {
      container.innerHTML = '<p class="text-red-500 p-4">❌ Erreur lors du chargement des archives</p>';
    }
  }
}

// Fonction pour afficher une liste d'archives vide
function afficherListeArchivesVide() {
  const container = document.getElementById("contactsList");
  if (container) {
    container.innerHTML = `
      <div class="text-center text-gray-400 mt-10 p-4">
        <i class="fas fa-archive text-4xl mb-4"></i>
        <p>Aucun élément archivé</p>
        <p class="text-sm mt-2">Les contacts et groupes archivés apparaîtront ici</p>
      </div>
    `;
  }
}

// Fonction pour restaurer un élément archivé
async function restaurerElement(archiveId, isGroup = false) {
  try {
    // Récupérer l'élément archivé
    const response = await fetch(`${API_BASE_URL}/archives/${archiveId}`);
    if (!response.ok) throw new Error('Archive non trouvée');
    
    const archivedItem = await response.json();
    
    // Préparer les données à restaurer
    const restoredData = {
      ...archivedItem.originalData,
      id: archivedItem.id // Garder l'ID original
    };
    
    // Supprimer les champs spécifiques à l'archive
    delete restoredData.archivedDate;
    delete restoredData.originalData;
    
    // Restaurer dans la collection appropriée
    const endpoint = isGroup ? 'groups' : 'contacts';
    const restoreResponse = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restoredData)
    });
    
    if (restoreResponse.ok) {
      // Supprimer de la liste des archives
      const deleteResponse = await fetch(`${API_BASE_URL}/archives/${archiveId}`, {
        method: 'DELETE'
      });
      
      if (deleteResponse.ok) {
        alert(`${isGroup ? 'Groupe' : 'Contact'} restauré avec succès!`);
        afficherArchives(); // Rafraîchir la liste des archives
      } else {
        throw new Error('Erreur lors de la suppression de l\'archive');
      }
    } else {
      throw new Error('Erreur lors de la restauration');
    }
  } catch (error) {
    console.error('Erreur lors de la restauration:', error);
   
  }
}

// Fonction pour supprimer définitivement un élément archivé
async function supprimerDefinitivement(archiveId) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer définitivement cet élément ? Cette action est irréversible.')) {
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/archives/${archiveId}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
     
      afficherArchives(); // Rafraîchir la liste
    } else {
      throw new Error('Erreur lors de la suppression');
    }
  } catch (error) {
  
  }
}

    



// Quand on clique sur Créer


setInterval(fetchMessages, 5000);

window.fetchMessages = fetchMessages;
window.fetchContacts = fetchContacts;
window.selectContact = selectContact;
window.sendMessage = sendMessage;
window.displayMessages = displayMessages;
window.handleSend = handleSend;
window.logout = logout;
window.afficherGroupesDansContactsList = afficherGroupesDansContactsList;
window.ouvrirCreateGroupModal = ouvrirCreateGroupModal;
window.ajouterGroupe = ajouterGroupe;
window.openGroupChat = openGroupChat;
window.ouvrirCreateGroupModal = ouvrirCreateGroupModal;
window.handleAddContact = handleAddContact;
window.archiverElement = archiverElement;
window.afficherArchives = afficherArchives;
window.archiverElement = archiverElement;
window.afficherArchives = afficherArchives;
window.restaurerElement = restaurerElement;
window.supprimerDefinitivement = supprimerDefinitivement;
