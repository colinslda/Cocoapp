// ... (Configuration Firebase, comme précédemment)

const auth = firebase.auth();

// Gestion de l'authentification
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const logoutLink = document.getElementById("logout-link");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        window.location.href = "index.html"; // Rediriger vers la page principale
      })
      .catch((error) => {
        console.error("Erreur de connexion :", error);
        alert("Email ou mot de passe incorrect."); // Gérer les erreurs
      });
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        window.location.href = "index.html"; // Rediriger vers la page principale
      })
      .catch((error) => {
        console.error("Erreur d'inscription :", error);
        alert("Erreur lors de la création du compte."); // Gérer les erreurs
      });
  });
}

auth.onAuthStateChanged((user) => {
    if (user) {
        // Utilisateur connecté
        console.log("Utilisateur connecté :", user);
        // Afficher le fil d'actualité, etc.
        document.getElementById("logout-link").style.display = "block"; // Afficher le lien de déconnexion

    } else {
        // Utilisateur non connecté
        console.log("Utilisateur non connecté");
        // Rediriger vers la page de connexion
        if (window.location.pathname !== '/login.html' && window.location.pathname !== '/signup.html') {
            window.location.href = "login.html";
        }
        document.getElementById("logout-link").style.display = "none"; // Cacher le lien de déconnexion

    }
});

if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            window.location.href = "login.html"; // Rediriger vers la page de connexion après la déconnexion
        });
    });
}


// ... (Reste du code pour récupérer les publications, comme précédemment)
