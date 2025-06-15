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
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" 
                   alt="Profile" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Menu Items -->
          <div id="menu" class="flex-1 py-2">
            <div class="menu-item active p-3 cursor-pointer flex justify-center items-center" data-tab="chats">
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
            
            <div class="menu-item p-3 cursor-pointer flex justify-center items-center" data-tab="communities">
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
            
            <div id="logout" class="menu-item p-3 cursor-pointer flex justify-center items-center" data-tab="logout">
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
                <button class="p-2 rounded-full hover:bg-white/20 transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                  </svg>
                </button>
                <button class="p-2 rounded-full hover:bg-white/20 transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Search Bar -->
            <div class="flex items-center bg-white rounded-lg p-2">
              <input id="searchInput" type="text" placeholder="Rechercher ou démarrer une nouvelle discussion" 
                     class="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button id="newChatBtn" class="ml-2 text-gray-600 hover:text-blue-600">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>

          <!-- Contacts List -->
          <div id="contactsList" class="flex-1 overflow-y-auto bg-white">
            <!-- Les contacts/chats seront injectés ici dynamiquement -->
          </div>
        </div>

        <!-- Main Chat Area -->
        <div class="flex-1 flex flex-col">
          <div class="instagram-gradient p-4 flex items-center justify-between text-white">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-white/20 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" 
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

          <!-- Message Input -->
          <div class="p-4 border-t border-gray-300 bg-white flex items-center space-x-4">
            <input id="messageInput" type="text" placeholder="Écrire un message..." 
                   class="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button id="sendMessageBtn" class="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    `;


    app.innerHTML = appHTML;
fetchMessages();
fetchContacts();
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
    app.innerHTML = `<p class="text-red-500 p-4">Erreur lors du chargement du tableau de bord</p>`;
  }
}

