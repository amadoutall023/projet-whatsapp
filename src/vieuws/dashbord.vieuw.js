export async function renderDashboard(container) {
  const app = document.getElementById('app');

  try {
   const [contactsRes, messagesRes] = await Promise.all([
  fetch('https://json-server-lt3n.onrender.com/contacts'),
  fetch('https://json-server-lt3n.onrender.com/messages')
 
]);


    const contacts = await contactsRes.json();
    const messages = await messagesRes.json();
 const appHTML = `
      <div class="flex h-screen overflow-hidden bg-gray-100 w-[100%]">
        <!-- Sidebar Menu -->
        <div id="part1" class="w-[60px] h-full bg-[#f0f2f5] border-r border-gray-300 flex flex-col">
          <!-- Profile Section -->
          <div class="p-3 border-b border-gray-300">
            <div class="w-10 h-10 rounded-full bg-gray-400 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
              <img src="" 
                   alt="Profile" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Menu Items -->
          <div id="menu" class="flex-1 py-2">
            <div id="contact" class="menu-item active p-3 cursor-pointer flex justify-center items-center" data-tab="chats">
              <i class="fas fa-comment-dots text-[#54656f] text-xl"></i>
              <div class="menu-tooltip">Discussions</div>
            </div>
            
            <div class="menu-item p-3 cursor-pointer flex justify-center items-center" data-tab="status">
              <i class="fas fa-circle-notch text-[#54656f] text-xl"></i>
              <div class="menu-tooltip">Statuts</div>
            </div>
            
            <div class="menu-item p-3 cursor-pointer flex justify-center items-center" data-tab="channels">
              <i class="fas fa-bullhorn text-[#54656f] text-xl"></i>
              <div class="menu-tooltip">Chaînes</div>
            </div>
            
            <div id="groupe" class="menu-item p-3 cursor-pointer flex justify-center items-center" data-tab="communities">
              <i class="fas fa-users text-[#54656f] text-xl"></i>
              <div class="menu-tooltip">Communautés</div>
            </div>
          </div>

          <!-- Bottom Menu Items -->
          <div class="border-t border-gray-300 py-2">
            <div class="menu-item p-3 cursor-pointer flex justify-center items-center" data-tab="archived">
              <i class="fas fa-archive text-[#54656f] text-xl"></i>
              <div class="menu-tooltip">Archivées</div>
            </div>
            
            <div class="menu-item p-3 cursor-pointer flex justify-center items-center" data-tab="starred">
              <i class="fas fa-star text-[#54656f] text-xl"></i>
              <div class="menu-tooltip">Messages favoris</div>
            </div>
            
            <div class="menu-item p-3 cursor-pointer flex justify-center items-center" data-tab="settings">
              <i class="fas fa-cog text-[#54656f] text-xl"></i>
              <div class="menu-tooltip">Paramètres</div>
            </div>
            
            <div id="logout" onclick="logout()" class="menu-item p-3 cursor-pointer flex justify-center items-center" data-tab="logout">
              <i class="fas fa-sign-out-alt text-[#54656f] text-xl"></i>
              <div class="menu-tooltip">Se déconnecter</div>
            </div>
          </div>
        </div>

        <div class="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          <!-- Header -->
          <div class="instagram-gradient p-4 text-white">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h1 class="text-xl font-bold">WhatsApp</h1>
              </div>
              <div class="flex space-x-2">
                <button id="popup" class="p-2 rounded-full hover:bg-white/20 transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                  </svg>
                </button>
                <button  onclick="archiverElement(false)" class="p-2 rounded-full hover:bg-white/20 transition-colors">
                  <i class="fas fa-archive text-[#54656f] text-xl"></i>
                </button>
              </div>
            </div>

            <!-- Search Bar -->
            <div class="flex items-center bg-white rounded-lg p-2">
              <input id="searchInput" type="text" placeholder="Rechercher ou démarrer une nouvelle discussion" 
                     class="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button id="newChatBtn" class="ml-2 text-gray-600 hover:text-blue-600 hidden">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>

          <!-- Contacts List -->
          <div id="contactsList" class="flex-1 overflow-y-auto bg-white">
            <!-- Les contacts/chats seront injectés ici dynamiquement -->
          </div>
        </div>
        <div id="groupsList" class="p-4 hidden">
  <!-- Liste dynamique des groupes ici -->
</div>

        <!-- Main Chat Area -->
        <div class="flex-1 flex flex-col">
          <div class="instagram-gradient p-4 flex items-center justify-between text-white">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-white/20 overflow-hidden">
                <img src="" 
                     alt="Contact" class="w-full h-full object-cover" />
              </div>
              <div>
                <h2 class="text-lg font-semibold">Nom du contact</h2>
                <p class="text-sm opacity-80">En ligne</p>
              </div>
            </div>
            <div class="flex space-x-4">
              <button class="p-2 rounded-full hover:bg-white/20 transition-colors">
                <i class="fas fa-video"></i>
              </button>
              <button class="p-2 rounded-full hover:bg-white/20 transition-colors">
                <i class="fas fa-phone"></i>
              </button>
              <button class="p-2 rounded-full hover:bg-white/20 transition-colors">
                <i class="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>

          <!-- Messages Container -->
          <div id="messagesContainer" class="flex-1 overflow-y-auto p-4 bg-gray-50">
            <!-- Messages s'afficheront ici -->
          </div>

             <div class="bg-white border-t border-gray-200 p-4">
                <div class="flex items-center space-x-3">
                    <button class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                        </svg>
                    </button>
                    <button class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                    </button>
                    <div class="flex-1 relative">
                        <input type="text" id="messageInput" placeholder="Tapez votre message..." 
                               class="w-full bg-gray-100 rounded-full px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all">
                        <button class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors">
                            <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                            </svg>
                        </button>
                    </div>
                    <button onclick="handleSend()" class="instagram-gradient p-3 rounded-full text-white hover:shadow-lg transition-all transform hover:scale-105">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
      </div>
      <!-- Modale d'ajout de contact -->
<div id="addContactModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
  <div class="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
    <button id="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl">&times;</button>
    <h2 class="text-xl font-bold mb-4 text-gray-800">Ajouter un contact</h2>
    
    <form id="addContactForm" class="space-y-4">
      <div>
        <label class="block text-gray-600 mb-1">Nom complet</label>
        <input type="text" id="contactName" class="w-full border rounded px-4 py-2 focus:ring focus:ring-blue-500" required>
      </div>
      <div>
        <label class="block text-gray-600 mb-1">Téléphone</label>
        <input type="text" id="contactPhone" class="w-full border rounded px-4 py-2 focus:ring focus:ring-blue-500" required>
      </div>
      <div class="text-right">
        <button type="submit" class="instagram-gradient text-white px-4 py-2 rounded hover:bg-blue-600">
          Ajouter
        </button>
      </div>
    </form>
  </div>
</div>
<!-- Modal création groupe -->
<div id="createGroupModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center hidden">
  <div class="bg-white rounded-lg p-6 w-96 max-w-full">
    <h2 class="text-xl font-semibold mb-4">Créer un nouveau groupe</h2>

    <!-- Message d'erreur -->
    <p id="groupErrorMessage" class="text-red-600 text-sm mb-3"></p>

    <label class="block mb-2 font-medium">Nom du groupe :</label>
    <input id="groupNameInput" type="text" class="w-full border rounded px-3 py-2 mb-4" />

    <label class="block mb-2 font-medium">Sélectionnez les membres :</label>
    <div id="membersCheckboxList" class="max-h-40 overflow-y-auto border rounded p-2 mb-4"></div>

    <div class="flex justify-end space-x-2">
      <button id="cancelCreateGroup" class="px-4 py-2 rounded border hover:bg-gray-100">Annuler</button>
      <button id="confirmCreateGroup" class="px-4 py-2 rounded instagram-gradient text-white hover:bg-blue-700">Créer</button>
    </div>
  </div>
</div>


    `;


    app.innerHTML = appHTML;
fetchMessages();
fetchContacts();
selectContact();
const messageInput = document.getElementById('messageInput'); // or whatever your input ID is
const messageContent = messageInput.value;
await sendMessage(messageContent);
displayMessages();

//  selectContact(contact);
//     displayMessages();
document.getElementById("popup").addEventListener("click", () => {
  document.getElementById("addContactModal").classList.remove("hidden");
});
const communityTab = document.querySelector('[data-tab="communities"]');
if (communityTab) {
  communityTab.addEventListener('click', () => {
    afficherGroupesDansContactsList();
    document.getElementById('newChatBtn')?.classList.remove('hidden');
  });
} else {
  console.warn('Le bouton communautés est introuvable dans le DOM.');
}


 document.getElementById('contact').addEventListener('click', () => {
    fetchContacts();
    document.getElementById('newChatBtn')?.classList.add('hidden');
  });




document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("addContactModal").classList.add("hidden");
});

document.getElementById("addContactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  await handleAddContact();
  fetchContacts();
});

document.getElementById('cancelCreateGroup').addEventListener('click', () => {
  document.getElementById('createGroupModal').classList.add('hidden');
});

document.getElementById('confirmCreateGroup').addEventListener('click', async () => {
  const groupName = document.getElementById('groupNameInput').value.trim();
  if (!groupName) {
    alert('Veuillez entrer un nom pour le groupe.');
    return;
  }

  const checkedBoxes = [...document.querySelectorAll('#membersCheckboxList input[type="checkbox"]:checked')];
  const selectedMemberIds = checkedBoxes.map(cb => parseInt(cb.value));

  if (selectedMemberIds.length < 2) {
    alert('Veuillez sélectionner au moins 2 membres.');
    return;
  }

  await ajouterGroupe(groupName, selectedMemberIds);

  // Fermer modal et reset champs
  document.getElementById('createGroupModal').classList.add('hidden');
  document.getElementById('groupNameInput').value = '';
});
const newChatBtn = document.getElementById('newChatBtn');
newChatBtn.addEventListener('click', ouvrirCreateGroupModal);

document.getElementById('confirmCreateGroup').addEventListener('click', () => {
  const name = document.getElementById('groupNameInput').value.trim();
  const memberIds = Array.from(document.querySelectorAll('#membersCheckboxList input:checked'))
    .map(cb => parseInt(cb.value));
  const errorMessage = document.getElementById('groupErrorMessage');

  // Réinitialiser le message d'erreur
  errorMessage.textContent = '';

  if (!name) {
    errorMessage.textContent = '⚠️ Le groupe doit avoir un nom.';
    return;
  }

  if (memberIds.length < 2) {
    errorMessage.textContent = '⚠️ Sélectionnez au moins deux membres.';
    return;
  }

  ajouterGroupe(name, memberIds);
  document.getElementById('createGroupModal').classList.add('hidden');
});
document.getElementById('cancelCreateGroup').addEventListener('click', () => {
  document.getElementById('createGroupModal').classList.add('hidden');
  document.getElementById('groupErrorMessage').textContent = '';
});

// À ajouter dans votre fonction renderDashboard, après les autres événements

// Gestion de l'onglet Archives
const archivedTab = document.querySelector('[data-tab="archived"]');
if (archivedTab) {
  archivedTab.addEventListener('click', () => {
    // Masquer le bouton nouveau chat pour les archives
    const newChatBtn = document.getElementById('newChatBtn');
    if (newChatBtn) newChatBtn.classList.add('hidden');
    
    // Afficher les archives
    afficherArchives();
    
    // Optionnel : Ajouter une classe active pour l'onglet
    document.querySelectorAll('[data-tab]').forEach(tab => tab.classList.remove('active'));
    archivedTab.classList.add('active');
  });
}

// Vous devrez aussi modifier vos autres onglets pour retirer la classe active
const contactTab = document.getElementById('contact');
if (contactTab) {
  contactTab.addEventListener('click', () => {
    fetchContacts();
    const newChatBtn = document.getElementById('newChatBtn');
    if (newChatBtn) newChatBtn.classList.add('hidden');
    
    // Retirer la classe active des autres onglets
    document.querySelectorAll('[data-tab]').forEach(tab => tab.classList.remove('active'));
    contactTab.classList.add('active');
  });
}

const communityTab1 = document.querySelector('[data-tab="communities"]');
if (communityTab1) {
  communityTab1.addEventListener('click', () => {
    afficherGroupesDansContactsList();
    const newChatBtn = document.getElementById('newChatBtn');
    if (newChatBtn) newChatBtn.classList.remove('hidden');
    
    // Retirer la classe active des autres onglets
    document.querySelectorAll('[data-tab]').forEach(tab => tab.classList.remove('active'));
    communityTab.classList.add('active');
  });
}




  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
    app.innerHTML = `<p class="text-red-500 p-4">Erreur lors du chargement du tableau de bord</p>`;
  }
}

