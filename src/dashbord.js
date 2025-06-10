/**
 * Script de gestion de la connexion WhatsApp
 * Gère l'authentification par numéro et par formulaire avec code de vérification
 */

// Variables globales
let currentTab = 'qr';
let verificationStep = false;
let scanInterval;
document.getElementById('submitText').addEventListener('click', (e) => {
  e.preventDefault();
  const num = document.getElementById('num').value.trim();

  if (num === '784541151') {
    localStorage.setItem('isLoggedIn', 'true'); // marque l'utilisateur comme connecté
    window.location.href = '/index.html';       // redirection vers l'app
  } else {
    num.classList.add('border-red-500'); // ajoute une bordure rouge si le numéro est incorrect
  }
});


 const qrBtn = document.getElementById("qrBtn");
    const formBtn = document.getElementById("formBtn");
    const qrSection = document.getElementById("qrSection");
    const formSection = document.getElementById("formSection");
    const loginForm = document.getElementById("loginForm");

    // Toggle entre QR et téléphone
    qrBtn.addEventListener("click", () => {
        qrSection.classList.remove("hidden");
        formSection.classList.add("hidden");
        qrBtn.classList.add("instagram-gradient", "text-white");
        formBtn.classList.remove("instagram-gradient", "text-white");
    });

    formBtn.addEventListener("click", () => {
        formSection.classList.remove("hidden");
        qrSection.classList.add("hidden");
        formBtn.classList.add("instagram-gradient", "text-white");
        qrBtn.classList.remove("instagram-gradient", "text-white");
    });

    // Validation du formulaire
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const phone = document.getElementById("phone").value.trim();

        const phoneRegex = /^7[0-9]{8}$/;
        if (!phoneRegex.test(phone)) {
            phoneInput.classList.add("border-red-500");
        }

        // Ici on simule la connexion (tu peux remplacer par une requête API)
        if (phone === "784541151") {
           
            // Rediriger ou ouvrir l'espace utilisateur...
        } else {
            alert("Numéro non reconnu !");
        }
    });
// Fonction pour valider le numéro de connexion directe
function validateDirectNumber(num) {
    return num === '784541151';
}

// Fonction pour marquer l'utilisateur comme connecté
function setUserLoggedIn() {
    // Note: localStorage n'est pas disponible dans cet environnement
    // En production, remplacez par votre système d'authentification
    console.log('Utilisateur connecté');
}

// Fonction pour rediriger vers l'application
function redirectToApp() {
    // window.location.href = '/index.html';
   
  
}

// Fonction pour afficher les erreurs
function showError(message) {
    alert(message);
}

// Fonction pour afficher les succès
function showSuccess(message) {
    alert(message);
}

// Gestion de la connexion directe par numéro
function handleDirectLogin(e) {
    e.preventDefault();
    const numInput = document.getElementById('num');
    
    if (!numInput) {
        console.error('Champ numéro introuvable');
        return;
    }

    const num = numInput.value.trim();
    
    if (validateDirectNumber(num)) {
        setUserLoggedIn();
        redirectToApp();
    } else {
        showError('Numéro incorrect. Veuillez réessayer.');
    }
}

// Gestion de la déconnexion
function handleLogout() {
    // localStorage.removeItem('isLoggedIn');
    // window.location.href = '/dashbord.html';
    console.log('Déconnexion effectuée');
    showSuccess('Déconnexion réussie');
}

// Animation du scan QR
function animateQRScan() {
    const indicator = document.getElementById('scanIndicator');
    if (!indicator) return;
    
    scanInterval = setInterval(() => {
        indicator.classList.add('opacity-50');
        setTimeout(() => {
            indicator.classList.remove('opacity-50');
        }, 1000);
    }, 2000);
}

// Arrêter l'animation QR
function stopQRAnimation() {
    if (scanInterval) {
        clearInterval(scanInterval);
    }
}

// Gestion des onglets
function switchTab(activeTab) {
    const qrBtn = document.getElementById('qrBtn');
    const formBtn = document.getElementById('formBtn');
    const qrSection = document.getElementById('qrSection');
    const formSection = document.getElementById('formSection');
    const qrButton = document.getElementById('qrButton');

    if (!qrBtn || !formBtn || !qrSection || !formSection) {
        console.error('Éléments d\'onglets introuvables');
        return;
    }

    currentTab = activeTab;

    if (activeTab === 'qr') {
        // Styles pour l'onglet QR actif
        qrBtn.className = 'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-whatsapp-green text-white shadow-lg';
        formBtn.className = 'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 text-gray-600 hover:text-whatsapp-dark';
        
        // Affichage des sections
        qrSection.classList.remove('hidden');
        formSection.classList.add('hidden');
        if (qrButton) qrButton.classList.remove('hidden');
        
        // Redémarrer l'animation QR
        animateQRScan();
    } else {
        // Styles pour l'onglet formulaire actif
        formBtn.className = 'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-whatsapp-green text-white shadow-lg';
        qrBtn.className = 'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 text-gray-600 hover:text-whatsapp-dark';
        
        // Affichage des sections
        formSection.classList.remove('hidden');
        qrSection.classList.add('hidden');
        if (qrButton) qrButton.classList.add('hidden');
        
        // Arrêter l'animation QR
        stopQRAnimation();
    }
}

// Valider le formulaire
function validateForm(name, phone) {
    if (!name || name.length < 2) {
        showError('Veuillez saisir un nom valide (minimum 2 caractères)');
        return false;
    }
    
    if (!phone || phone.length < 8) {
        showError('Veuillez saisir un numéro de téléphone valide');
        return false;
    }
    
    return true;
}

// Simuler l'envoi du SMS
function sendVerificationSMS(phone) {
    return new Promise((resolve) => {
        setTimeout(() => {
            showSuccess(`Code de vérification envoyé au ${phone}\n(Code simulé: 123456)`);
            resolve();
        }, 1000);
    });
}

// Gestion de la soumission du formulaire
function handleFormSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const codeInput = document.getElementById('code');
    const verificationSection = document.getElementById('verificationSection');
    const submitText = document.getElementById('submitText');
    
    if (!nameInput || !phoneInput || !codeInput || !submitText) {
        console.error('Éléments du formulaire introuvables');
        return;
    }
    
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const code = codeInput.value.trim();
    
    if (!verificationStep) {
        // Première étape : validation et envoi du code
        if (!validateForm(name, phone)) {
            return;
        }
        
        verificationStep = true;
        
        // Afficher la section de vérification
        if (verificationSection) {
            verificationSection.style.display = 'block';
        }
        
        submitText.textContent = 'Vérifier le code';
        
        // Simuler l'envoi du SMS
        sendVerificationSMS(phone);
        
    } else {
        // Deuxième étape : vérification du code
        if (!code) {
            showError('Veuillez saisir le code de vérification');
            codeInput.focus();
            return;
        }
        
        if (code === '123456') {
            // Code correct - afficher le loading
            submitText.innerHTML = `
                <svg class="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion...
            `;
            
            setTimeout(() => {
                showSuccess(`Bienvenue ${name}! Connexion réussie.`);
                setUserLoggedIn();
                // Ici vous pouvez rediriger vers l'interface principale
                console.log('Redirection vers l\'interface principale');
            }, 2000);
        } else {
            showError('Code incorrect. Veuillez réessayer.');
            codeInput.focus();
            codeInput.select();
        }
    }
}

// Réinitialiser le formulaire
function resetForm() {
    const form = document.getElementById('loginForm');
    const verificationSection = document.getElementById('verificationSection');
    const submitText = document.getElementById('submitText');
    
    if (form) form.reset();
    if (verificationSection) verificationSection.style.display = 'none';
    if (submitText) submitText.textContent = 'Envoyer le code';
    
    verificationStep = false;
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initialisation du script WhatsApp Auth');
    
    // Démarrer l'animation QR par défaut
    animateQRScan();
    
    // Connexion directe par numéro
    const submitTextBtn = document.getElementById('submitText');
    if (submitTextBtn) {
        submitTextBtn.addEventListener('click', handleDirectLogin);
    }
    
    // Bouton de déconnexion
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Gestion des onglets
    const qrBtn = document.getElementById('qrBtn');
    const formBtn = document.getElementById('formBtn');
    
    if (qrBtn) {
        qrBtn.addEventListener('click', function() {
            switchTab('qr');
        });
    }
    
    if (formBtn) {
        formBtn.addEventListener('click', function() {
            switchTab('form');
        });
    }
    
    // Formulaire de connexion
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Bouton de réinitialisation (optionnel)
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetForm();
        });
    }
    
    console.log('Script initialisé avec succès');
});

// Nettoyage lors de la fermeture de la page
window.addEventListener('beforeunload', function() {
    stopQRAnimation();
});