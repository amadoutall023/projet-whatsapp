import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'



    const currentUser = "alice"; // Utilisateur connecté
    const container = document.getElementById("messagesContainer");

    async function fetchMessages() {
        const response = await fetch("https://json-server-lt3n.onrender.com/messages", );
        const messages = await response.json();

        // Nettoyer avant d'ajouter
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

        // Scroll en bas automatiquement
        container.scrollTop = container.scrollHeight;
    }

    fetchMessages(); // Appel initial

    // Optionnel : rafraîchir toutes les 5 secondes
    setInterval(fetchMessages, 5000);


    const contactsContainer = document.getElementById("contactsList");

    async function fetchContacts() {
        const res = await fetch("https://json-server-lt3n.onrender.com/contacts");
        const contacts = await res.json();

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
    }

    fetchContacts();


// if (!localStorage.getItem('isLoggedIn')) {
//   window.location.href = '/dashbord.html'; // redirection vers la page de connexion
// }
        
// // ================================================

// // Configuration et données
// const chatData = {
//     currentChat: null,
//     users: [
//         {
//             id: 1,
//             name: "Sarah Johnson",
//             avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c3a7?w=150&h=150&fit=crop&crop=face",
//             status: "online",
//             lastSeen: "14:30",
//             messages: [
//                 { id: 1, text: "Salut ! Comment ça se passe ton projet ?", time: "14:25", sender: "received" },
//                 { id: 2, text: "Ça avance bien ! Je suis en train de finaliser le design 🎨", time: "14:26", sender: "sent" },
//                 { id: 3, text: "Super ! Tu utilises quoi comme couleurs ?", time: "14:27", sender: "received" },
//                 { id: 4, text: "J'ai opté pour la palette Instagram ! Ça donne un look moderne et vibrant ✨", time: "14:28", sender: "sent" }
//             ]
//         },
//         {
//             id: 2,
//             name: "Alex Martin",
//             avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//             status: "offline",
//             lastSeen: "Hier",
//             messages: [
//                 { id: 1, text: "Parfait ! On se voit demain alors", time: "Hier", sender: "received" }
//             ]
//         },
//         {
//             id: 3,
//             name: "Emma Wilson",
//             avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
//             status: "online",
//             lastSeen: "13:45",
//             messages: [
//                 { id: 1, text: "✨ Photo", time: "13:45", sender: "received", type: "image", imageUrl: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=300&h=200&fit=crop" }
//             ]
//         },
//         {
//             id: 4,
//             name: "Groupe Projets",
//             avatar: null,
//             initial: "G",
//             status: "group",
//             lastSeen: "12:20",
//             messages: [
//                 { id: 1, text: "Marc: Oui, c'est parfait !", time: "12:20", sender: "received" }
//             ]
//         }
//     ]
// };

// // Utilitaires
// const utils = {
//     getCurrentTime() {
//         return new Date().toLocaleTimeString('fr-FR', { 
//             hour: '2-digit', 
//             minute: '2-digit' 
//         });
//     },

//     formatTime(time) {
//         if (time === "Hier" || time === "online") return time;
//         return time;
//     },

//     generateId() {
//         return Date.now() + Math.random();
//     },

//     scrollToBottom(element) {
//         element.scrollTop = element.scrollHeight;
//     },

//     addAnimation(element, animationClass = 'animate-slideIn') {
//         element.classList.add(animationClass);
//         setTimeout(() => element.classList.remove(animationClass), 300);
//     }
// };

// // Gestion des chats
// const chatManager = {
//     init() {
//         this.bindEvents();
//         this.loadChatList();
//         this.selectDefaultChat();
//     },

//     bindEvents() {
//         // Événements pour l'envoi de messages
//         const messageInput = document.getElementById('messageInput');
//         const sendButton = document.querySelector('[onclick="sendMessage()"]');
        
//         if (messageInput) {
//             messageInput.addEventListener('keypress', (e) => {
//                 if (e.key === 'Enter') {
//                     this.sendMessage();
//                 }
//             });
//         }

//         if (sendButton) {
//             sendButton.addEventListener('click', () => this.sendMessage());
//         }

//         // Événements pour la recherche
//         const searchInput = document.querySelector('input[placeholder*="Rechercher"]');
//         if (searchInput) {
//             searchInput.addEventListener('input', (e) => {
//                 this.searchChats(e.target.value);
//             });
//         }

//         // Événements pour les boutons d'actions
//         this.bindActionButtons();
//     },

//     bindActionButtons() {
//         // Bouton d'ajout de chat
//         const addChatBtn = document.querySelector('.instagram-gradient svg[viewBox="0 0 24 24"] path[d*="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"]');
//         if (addChatBtn) {
//             addChatBtn.parentElement.addEventListener('click', () => {
//                 this.showNewChatModal();
//             });
//         }

//         // Boutons d'appel et vidéo
//         const callButtons = document.querySelectorAll('.bg-white button');
//         callButtons.forEach(btn => {
//             btn.addEventListener('click', (e) => {
//                 this.handleActionButton(e.target);
//             });
//         });
//     },

//     loadChatList() {
//         const chatList = document.querySelector('.flex-1.overflow-y-auto');
//         if (!chatList) return;

//         chatList.innerHTML = '';
        
//         chatData.users.forEach((user, index) => {
//             const chatItem = this.createChatItem(user, index === 0);
//             chatList.appendChild(chatItem);
//         });
//     },

//     createChatItem(user, isActive = false) {
//         const chatItem = document.createElement('div');
//         chatItem.className = `chat-item flex items-center p-4 cursor-pointer border-b border-gray-100 ${isActive ? 'bg-gradient-to-r from-purple-50 to-pink-50' : ''}`;
//         chatItem.dataset.userId = user.id;

//         const lastMessage = user.messages[user.messages.length - 1];
//         const unreadCount = user.messages.filter(msg => msg.sender === 'received' && !msg.read).length;

//         chatItem.innerHTML = `
//             <div class="relative">
//                 ${user.avatar ? 
//                     `<img src="${user.avatar}" class="w-12 h-12 rounded-full object-cover ${user.status === 'online' ? 'border-2 border-gradient-to-r from-purple-400 to-pink-400' : ''}">` :
//                     `<div class="w-12 h-12 instagram-gradient rounded-full flex items-center justify-center text-white font-bold text-lg">${user.initial}</div>`
//                 }
//                 ${user.status === 'online' ? 
//                     '<div class="online-dot absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>' :
//                     user.status === 'offline' ? '<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-400 border-2 border-white rounded-full"></div>' : ''
//                 }
//             </div>
//             <div class="ml-3 flex-1">
//                 <div class="flex justify-between items-center">
//                     <h3 class="font-semibold text-gray-900">${user.name}</h3>
//                     <span class="text-xs ${user.status === 'online' ? 'instagram-gradient bg-clip-text text-transparent font-medium' : 'text-gray-500'}">${user.lastSeen}</span>
//                 </div>
//                 <p class="text-sm text-gray-600 truncate">${lastMessage ? lastMessage.text : 'Aucun message'}</p>
//             </div>
//             ${unreadCount > 0 ? `
//                 <div class="ml-2">
//                     <div class="instagram-gradient w-5 h-5 rounded-full flex items-center justify-center">
//                         <span class="text-xs text-white font-bold">${unreadCount}</span>
//                     </div>
//                 </div>
//             ` : ''}
//         `;

//         chatItem.addEventListener('click', () => this.selectChat(user.id, chatItem));
        
//         return chatItem;
//     },

//     selectChat(userId, chatElement) {
//         // Retirer la classe active de tous les chats
//         document.querySelectorAll('.chat-item').forEach(item => {
//             item.classList.remove('bg-gradient-to-r', 'from-purple-50', 'to-pink-50');
//         });

//         // Ajouter la classe active au chat sélectionné
//         if (chatElement) {
//             chatElement.classList.add('bg-gradient-to-r', 'from-purple-50', 'to-pink-50');
//         }

//         // Mettre à jour le chat actuel
//         chatData.currentChat = chatData.users.find(u => u.id === userId);
        
//         // Charger les messages
//         this.loadMessages();
//         this.updateChatHeader();
//     },

//     selectDefaultChat() {
//         if (chatData.users.length > 0) {
//             const firstChatElement = document.querySelector('.chat-item');
//             this.selectChat(chatData.users[0].id, firstChatElement);
//         }
//     },

//     updateChatHeader() {
//         if (!chatData.currentChat) return;

//         const user = chatData.currentChat;
//         const headerContainer = document.querySelector('.bg-white.border-b .flex.items-center.space-x-3');
        
//         if (headerContainer) {
//             headerContainer.innerHTML = `
//                 ${user.avatar ? 
//                     `<img src="${user.avatar}" class="w-10 h-10 rounded-full object-cover border-2 border-gradient-to-r from-purple-400 to-pink-400">` :
//                     `<div class="w-10 h-10 instagram-gradient rounded-full flex items-center justify-center text-white font-bold">${user.initial}</div>`
//                 }
//                 <div>
//                     <h2 class="font-semibold text-gray-900">${user.name}</h2>
//                     <p class="text-sm ${user.status === 'online' ? 'text-green-500' : 'text-gray-500'} font-medium">
//                         ${user.status === 'online' ? 'En ligne' : `Vu ${user.lastSeen}`}
//                     </p>
//                 </div>
//             `;
//         }
//     },

//     loadMessages() {
//         if (!chatData.currentChat) return;

//         const messagesContainer = document.getElementById('messagesContainer');
//         if (!messagesContainer) return;

//         messagesContainer.innerHTML = '';

//         chatData.currentChat.messages.forEach(message => {
//             const messageElement = this.createMessageElement(message);
//             messagesContainer.appendChild(messageElement);
//         });

//         utils.scrollToBottom(messagesContainer);
//     },

//     createMessageElement(message) {
//         const messageDiv = document.createElement('div');
//         messageDiv.className = 'message-bubble';

//         if (message.sender === 'sent') {
//             messageDiv.className += ' flex items-start justify-end';
//             messageDiv.innerHTML = `
//                 <div class="instagram-gradient rounded-2xl rounded-tr-md px-4 py-2 max-w-xs text-white shadow-sm">
//                     ${message.type === 'image' ? `<img src="${message.imageUrl}" class="w-full h-32 object-cover rounded-lg mb-2">` : ''}
//                     <p>${message.text}</p>
//                     <span class="text-xs text-white/70 mt-1 block text-right">${message.time}</span>
//                 </div>
//             `;
//         } else {
//             messageDiv.className += ' flex items-start space-x-2';
//             messageDiv.innerHTML = `
//                 ${chatData.currentChat.avatar ? 
//                     `<img src="${chatData.currentChat.avatar}" class="w-8 h-8 rounded-full object-cover">` :
//                     `<div class="w-8 h-8 instagram-gradient rounded-full flex items-center justify-center text-white font-bold text-xs">${chatData.currentChat.initial}</div>`
//                 }
//                 <div class="bg-white rounded-2xl rounded-tl-md px-4 py-2 max-w-xs shadow-sm">
//                     ${message.type === 'image' ? `<img src="${message.imageUrl}" class="w-full h-32 object-cover rounded-lg mb-2">` : ''}
//                     <p class="text-gray-800">${message.text}</p>
//                     <span class="text-xs text-gray-500 mt-1 block">${message.time}</span>
//                 </div>
//             `;
//         }

//         utils.addAnimation(messageDiv);
//         return messageDiv;
//     },

//     sendMessage() {
//         const messageInput = document.getElementById('messageInput');
//         if (!messageInput || !chatData.currentChat) return;

//         const messageText = messageInput.value.trim();
//         if (!messageText) return;

//         // Créer le nouveau message
//         const newMessage = {
//             id: utils.generateId(),
//             text: messageText,
//             time: utils.getCurrentTime(),
//             sender: 'sent'
//         };

//         // Ajouter le message au chat actuel
//         chatData.currentChat.messages.push(newMessage);

//         // Afficher le message
//         const messageElement = this.createMessageElement(newMessage);
//         const messagesContainer = document.getElementById('messagesContainer');
//         messagesContainer.appendChild(messageElement);
        
//         // Vider l'input
//         messageInput.value = '';
        
//         // Scroll vers le bas
//         utils.scrollToBottom(messagesContainer);

//         // Mettre à jour la liste des chats
//         this.updateChatListPreview();

//         // Simuler une réponse
//         this.simulateResponse();
//     },

//     simulateResponse() {
//         if (!chatData.currentChat) return;

//         const responses = [
//             "Merci pour votre message ! 😊",
//             "C'est intéressant !",
//             "Je vais y réfléchir 🤔",
//             "Parfait ! 👍",
//             "Super idée !",
//             "Je suis d'accord avec vous",
//             "Pouvez-vous me donner plus de détails ?",
//             "C'est exactement ce que je pensais !"
//         ];

//         setTimeout(() => {
//             const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
//             const responseMessage = {
//                 id: utils.generateId(),
//                 text: randomResponse,
//                 time: utils.getCurrentTime(),
//                 sender: 'received'
//             };

//             chatData.currentChat.messages.push(responseMessage);
            
//             const messageElement = this.createMessageElement(responseMessage);
//             const messagesContainer = document.getElementById('messagesContainer');
//             messagesContainer.appendChild(messageElement);
            
//             utils.scrollToBottom(messagesContainer);
//             this.updateChatListPreview();
//         }, 1500 + Math.random() * 2000); // Délai aléatoire entre 1.5 et 3.5 secondes
//     },

//     updateChatListPreview() {
//         // Recharger la liste des chats pour mettre à jour les aperçus
//         this.loadChatList();
        
//         // Re-sélectionner le chat actuel
//         if (chatData.currentChat) {
//             const currentChatElement = document.querySelector(`[data-user-id="${chatData.currentChat.id}"]`);
//             if (currentChatElement) {
//                 currentChatElement.classList.add('bg-gradient-to-r', 'from-purple-50', 'to-pink-50');
//             }
//         }
//     },

//     searchChats(query) {
//         const chatItems = document.querySelectorAll('.chat-item');
        
//         chatItems.forEach(item => {
//             const name = item.querySelector('h3').textContent.toLowerCase();
//             const message = item.querySelector('p').textContent.toLowerCase();
            
//             if (name.includes(query.toLowerCase()) || message.includes(query.toLowerCase())) {
//                 item.style.display = 'flex';
//             } else {
//                 item.style.display = query ? 'none' : 'flex';
//             }
//         });
//     },

//     handleActionButton(button) {
//         const svg = button.querySelector('svg');
//         if (!svg) return;

//         const path = svg.querySelector('path');
//         if (!path) return;

//         const pathData = path.getAttribute('d');
        
//         // Identifier le type d'action basé sur le path SVG
//         if (pathData.includes('6.62 10.79')) {
//             // Bouton d'appel
//             this.showNotification('Appel en cours...', 'success');
//         } else if (pathData.includes('17 10.5V7')) {
//             // Bouton vidéo
//             this.showNotification('Appel vidéo en cours...', 'success');
//         } else {
//             // Bouton menu
//             this.showChatMenu();
//         }
//     },

//     showNotification(message, type = 'info') {
//         const notification = document.createElement('div');
//         notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 text-white transform transition-all duration-300 translate-x-full`;
        
//         if (type === 'success') {
//             notification.className += ' instagram-gradient';
//         } else {
//             notification.className += ' bg-gray-800';
//         }
        
//         notification.textContent = message;
//         document.body.appendChild(notification);

//         // Animation d'entrée
//         setTimeout(() => {
//             notification.classList.remove('translate-x-full');
//         }, 100);

//         // Animation de sortie
//         setTimeout(() => {
//             notification.classList.add('translate-x-full');
//             setTimeout(() => notification.remove(), 300);
//         }, 3000);
//     },

//     showNewChatModal() {
//         this.showNotification('Fonctionnalité en cours de développement', 'info');
//     },

//     showChatMenu() {
//         this.showNotification('Menu du chat', 'info');
//     }
// };

// // Gestion des thèmes et animations
// const themeManager = {
//     init() {
//         this.addCustomStyles();
//         this.setupAnimations();
//     },

//     addCustomStyles() {
//         const style = document.createElement('style');
//         style.textContent = `
//             .animate-slideIn {
//                 animation: slideIn 0.3s ease-out;
//             }
            
//             @keyframes slideIn {
//                 from {
//                     opacity: 0;
//                     transform: translateY(10px);
//                 }
//                 to {
//                     opacity: 1;
//                     transform: translateY(0);
//                 }
//             }
            
//             .chat-item {
//                 transition: all 0.2s ease;
//             }
            
//             .chat-item:hover {
//                 background: rgba(240, 148, 51, 0.1);
//                 transform: translateX(2px);
//             }
            
//             .message-bubble {
//                 animation: messageSlide 0.4s ease-out;
//             }
            
//             @keyframes messageSlide {
//                 from {
//                     opacity: 0;
//                     transform: translateY(20px) scale(0.9);
//                 }
//                 to {
//                     opacity: 1;
//                     transform: translateY(0) scale(1);
//                 }
//             }
            
//             .instagram-gradient {
//                 background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
//             }
            
//             .glass-effect {
//                 background: rgba(255, 255, 255, 0.9);
//                 backdrop-filter: blur(10px);
//                 border: 1px solid rgba(255, 255, 255, 0.2);
//             }
//         `;
//         document.head.appendChild(style);
//     },

//     setupAnimations() {
//         // Ajouter des animations au survol pour les boutons
//         const buttons = document.querySelectorAll('button');
//         buttons.forEach(button => {
//             button.addEventListener('mouseenter', () => {
//                 button.style.transform = 'scale(1.05)';
//             });
            
//             button.addEventListener('mouseleave', () => {
//                 button.style.transform = 'scale(1)';
//             });
//         });
//     }
// };

// // Gestionnaire principal de l'application
// const app = {
//     init() {
//         console.log('🚀 Initialisation de WhatsApp Clone...');
        
//         // Attendre que le DOM soit chargé
//         if (document.readyState === 'loading') {
//             document.addEventListener('DOMContentLoaded', () => {
//                 this.start();
//             });
//         } else {
//             this.start();
//         }
//     },

//     start() {
//         try {
//             themeManager.init();
//             chatManager.init();
            
//             console.log('✅ WhatsApp Clone initialisé avec succès !');
            
//             // Afficher une notification de bienvenue
//             setTimeout(() => {
//                 chatManager.showNotification('Bienvenue sur WhatsApp Clone ! 🎉', 'success');
//             }, 1000);
            
//         } catch (error) {
//             console.error('❌ Erreur lors de l\'initialisation:', error);
//         }
//     }
// };

// // Fonctions globales pour la compatibilité
// window.selectChat = function(element) {
//     const userId = parseInt(element.dataset.userId);
//     if (userId) {
//         chatManager.selectChat(userId, element);
//     }
// };

// window.sendMessage = function() {
//     chatManager.sendMessage();
// };

// window.handleKeyPress = function(event) {
//     if (event.key === 'Enter') {
//         chatManager.sendMessage();
//     }
// };

// // Initialisation de l'application
// app.init();

// // Export pour les modules (si nécessaire)
// export { chatManager, themeManager, utils };