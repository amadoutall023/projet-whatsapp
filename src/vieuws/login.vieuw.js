import { renderDashboard } from '../vieuws/dashbord.vieuw.js';




export function renderLogin(container, users) {
  const app = document.getElementById('app');


 const appHTML = `
      <div id="particles" class="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div class="absolute w-3 h-3 bg-white rounded-full animate-float" style="top: 20%; left: 10%; animation-delay: 0s;"></div>
        <div class="absolute w-2 h-2 bg-pink-300 rounded-full animate-float" style="top: 60%; left: 80%; animation-delay: 1s;"></div>
        <div class="absolute w-4 h-4 bg-yellow-300 rounded-full animate-float" style="top: 80%; left: 20%; animation-delay: 2s;"></div>
        <div class="absolute w-2 h-2 bg-purple-300 rounded-full animate-float" style="top: 30%; left: 70%; animation-delay: 1.5s;"></div>
        <div class="absolute w-3 h-3 bg-orange-300 rounded-full animate-float" style="top: 15%; left: 85%; animation-delay: 0.5s;"></div>
        <div class="absolute w-2 h-2 bg-red-300 rounded-full animate-float" style="top: 70%; left: 15%; animation-delay: 2.5s;"></div>
        <div class="absolute w-2 h-2 bg-blue-300 rounded-full animate-float" style="top: 40%; left: 50%; animation-delay: 3s;"></div>
        <div class="absolute w-3 h-3 bg-green-300 rounded-full animate-float" style="top: 90%; left: 60%; animation-delay: 1.8s;"></div>
    </div>

    <!-- Container principal -->
    <div class="w-full max-w-md">
        <!-- En-tête -->
        <div class="text-center mb-8 animate-fade-in">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 animate-pulse-slow">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
            </div>
            <h1 class="text-3xl font-bold text-white mb-2">Connexion Sécurisée</h1>
            <p class="text-white/80">Accédez à votre espace personnel</p>
        </div>

        <!-- Formulaire -->
        <div class="glass-effect rounded-2xl p-8 shadow-2xl animate-slide-up">
            <form id="loginForm" class="space-y-6">
                <!-- Champ Nom -->
                <div class="space-y-2">
                    <label for="name" class="block text-sm font-semibold text-black/90">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Nom complet
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        class="w-full px-4 py-3   border border-black rounded-xl focus:ring-2 focus:ring-orange-400  transition-all duration-300 text-black/90 placeholder-white/60 backdrop-blur-sm input-focus"
                        placeholder="Entrez votre nom complet"
                    />
                    <div class="text-red-300 text-sm hidden" id="nameError">Veuillez entrer votre nom complet</div>
                </div>

                <!-- Champ Téléphone -->
                <div class="space-y-2">
                    <label for="phone" class="block text-sm font-semibold text-black/90">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        Numéro de téléphone
                    </label>
                    <div class="flex">
                        <select id="countryCode" class="px-3 py-3 glass-effect border border-white/30 rounded-l-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 text-black/90 backdrop-blur-sm">
                            <option value="+33" class="bg-gray-800">🇫🇷 +33</option>
                            <option value="+221" class="bg-gray-800" selected>🇸🇳 +221</option>
                            <option value="+1" class="bg-gray-800">🇺🇸 +1</option>
                            <option value="+44" class="bg-gray-800">🇬🇧 +44</option>
                            <option value="+49" class="bg-gray-800">🇩🇪 +49</option>
                        </select>
                        <input 
                            type="tel" 
                            id="num" 
                            name="phone" 
                            required
                            class="flex-1 px-4 py-3    border border-black border-white/30 rounded-r-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 text-black placeholder-white/60 backdrop-blur-sm input-focus"
                            placeholder="784541151"
                        />
                    </div>
                    <div class="text-red-300 text-sm hidden" id="phoneError">Veuillez entrer un numéro valide</div>
                </div>

                <!-- Code de vérification -->
                <div class="space-y-2 transition-all duration-500" id="verificationSection" style="display: none;">
                    <label for="code" class="block text-sm font-semibold text-white/90">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                        Code de vérification
                    </label>
                    <input 
                        type="text" 
                        id="code" 
                        name="code" 
                        maxlength="6"
                        class="w-full px-4 py-3 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60 backdrop-blur-sm text-center text-2xl font-mono tracking-widest input-focus"
                        placeholder="123456"
                    />
                    <p class="text-sm text-white/70 text-center">
                        Code envoyé par SMS au <span id="phoneDisplay"></span>
                    </p>
                    <p class="text-xs text-green-300 text-center">
                        💡 Code de test : 123456
                    </p>
                    <div class="text-red-300 text-sm hidden text-center" id="codeError">Code incorrect</div>
                </div>

                <!-- Messages d'état -->
                <div id="statusMessage" class="hidden p-3 rounded-lg text-center text-sm font-medium"></div>

                <!-- Bouton de connexion -->
                <button 
                    type="submit" 
                    id="submitBtn"
                    class="w-full py-4 mixed-gradient text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group flex items-center justify-center"
                >
                    <span id="btnContent">
                        <svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3v1"></path>
                        </svg>
                        <span id="btnText">Se connecter</span>
                    </span>
                </button>

                <!-- Bouton de reset -->
                <button 
                    type="button" 
                    id="resetBtn"
                    class="w-full py-2 text-white/70 hover:text-white transition-colors duration-300 text-sm hover:bg-white/10 rounded-lg"
                    style="display: none;"
                >
                    ← Recommencer
                </button>
            </form>
        </div>

        <!-- Section de succès -->
        <div id="successSection" class="glass-effect rounded-2xl p-8 shadow-2xl text-center hidden">
            <div class="mb-6">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                    <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-white mb-2">Connexion réussie !</h2>
                <p class="text-white/80">Bienvenue <span id="welcomeName" class="font-semibold"></span></p>
            </div>
            
            <div class="space-y-4">
                <div class="bg-white/10 rounded-lg p-4">
                    <p class="text-white/90 text-sm">
                        <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        Votre identité a été vérifiée avec succès
                    </p>
                </div>
                
                <button 
                    id="logoutBtn"
                    class="w-full py-3 bg-red-500/20 text-white/80 hover:text-white hover:bg-red-500/30 rounded-lg transition-all duration-300 text-sm font-medium"
                >
                    Se déconnecter
                </button>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-8 animate-fade-in">
            <p class="text-white/80 text-sm mb-4 font-medium">
                Vos données sont protégées par un chiffrement de bout en bout
            </p>
            <div class="flex items-center justify-center space-x-4">
                <svg class="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-white/60 text-sm font-medium">Connexion sécurisée SSL</span>
            </div>
        </div>
    </div>
    `;

    app.innerHTML = appHTML;
  ;
const form = document.getElementById('submitBtn');
form.addEventListener('click', async (e) => {
  e.preventDefault();

  const username = document.getElementById('name').value.toLowerCase().trim();
  const num = document.getElementById('num').value.trim();

  

  if ( num === '784541151') {
    await renderDashboard(app); // tu peux aussi passer l’objet user ici
  } else {
    document.getElementById('loginError').classList.remove('hidden');
  }
});

}
