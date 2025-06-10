// Gérer la soumission du formulaire de connexion
document.getElementById('submitText').addEventListener('click', (e) => {
  e.preventDefault();
  const num = document.getElementById('num').value.trim();

  if (num === '784541151') {
    localStorage.setItem('isLoggedIn', 'true'); // marque l'utilisateur comme connecté
    window.location.href = '/index.html';       // redirection vers l'app
  } else {
    alert('Numéro incorrect. Veuillez réessayer.');
  }
});
const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/dashbord.html'; // retour à la page de connexion
  });
}
 function animateQRScan() {
            const indicator = document.getElementById('scanIndicator');
            setInterval(() => {
                indicator.classList.add('opacity-50');
                setTimeout(() => {
                    indicator.classList.remove('opacity-50');
                }, 1000);
            }, 2000);
        }

        // Gestion des onglets
        function switchTab(activeTab) {
            const qrBtn = document.getElementById('qrBtn');
            const formBtn = document.getElementById('formBtn');
            const qrSection = document.getElementById('qrSection');
            const formSection = document.getElementById('formSection');
            const qrButton = document.getElementById('qrButton');

            if (activeTab === 'qr') {
                qrBtn.className = 'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-whatsapp-green text-white shadow-lg';
                formBtn.className = 'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 text-gray-600 hover:text-whatsapp-dark';
                qrSection.classList.remove('hidden');
                formSection.classList.add('hidden');
                qrButton.classList.remove('hidden');
            } else {
                formBtn.className = 'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-whatsapp-green text-white shadow-lg';
                qrBtn.className = 'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 text-gray-600 hover:text-whatsapp-dark';
                formSection.classList.remove('hidden');
                qrSection.classList.add('hidden');
                qrButton.classList.add('hidden');
            }
        }

        // Gestion du formulaire
        function handleFormSubmit(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const code = document.getElementById('code').value;
            const verificationSection = document.getElementById('verificationSection');
            const submitText = document.getElementById('submitText');

            if (!code) {
                // Première étape : demander le code
                verificationSection.style.display = 'block';
                submitText.textContent = 'Vérifier le code';
                
                // Simuler l'envoi du SMS
                setTimeout(() => {
                    alert(`Code de vérification envoyé au ${phone}\n(Code simulé: 123456)`);
                }, 1000);
            } else {
                // Deuxième étape : vérifier le code
                if (code === '123456') {
                    submitText.innerHTML = '<svg class="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Connexion...';
                    
                    setTimeout(() => {
                        alert(`Bienvenue ${name}! Connexion réussie.`);
                        // Ici vous pouvez rediriger vers l'interface principale de WhatsApp
                    }, 2000);
                } else {
                    alert('Code incorrect. Veuillez réessayer.');
                    document.getElementById('code').focus();
                }
            }
        }

        // Démarrer les animations
        document.addEventListener('DOMContentLoaded', function() {
            animateQRScan();
            
            // Gestionnaires d'événements
            document.getElementById('qrBtn').addEventListener('click', () => switchTab('qr'));
            document.getElementById('formBtn').addEventListener('click', () => switchTab('form'));
            document.getElementById('loginForm').addEventListener('submit', handleFormSubmit);
        });
