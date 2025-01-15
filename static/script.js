// Attendre que la page soit complètement chargée
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("classifyForm");
    const resultDiv = document.getElementById("result");
  
    // Ajouter un écouteur d'événement sur le formulaire
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Empêcher le rechargement de la page
  
      // Récupérer le texte entré par l'utilisateur
      const textInput = document.getElementById("textInput").value;
  
      if (!textInput.trim()) {
        resultDiv.innerHTML = "<p style='color: red;'>Veuillez entrer un texte avant de soumettre !</p>";
        return;
      }
  
      // Envoyer la requête POST au serveur Flask
      try {
        resultDiv.innerHTML = "<p>Analyse en cours...</p>";
  
        const response = await fetch("http://127.0.0.1:5000/classify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: textInput }),
        });
  
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.statusText);
        }
  
        // Extraire les données JSON de la réponse
        const data = await response.json();
        resultDiv.innerHTML = `<p><strong>Texte :</strong> ${data.text}</p>
                               <p><strong>Classification :</strong> ${data.classification}</p>`;
      } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "<p style='color: red;'>Une erreur est survenue. Réessayez plus tard.</p>";
      }
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("classifyForm");
    const resultDiv = document.getElementById("result");
    const loader = document.getElementById("loader");
  
    // Fonction pour afficher le loader
    function showLoader() {
      loader.style.display = "flex";
    }
  
    // Fonction pour masquer le loader
    function hideLoader() {
      loader.style.display = "none";
    }
  
    // Événement de soumission du formulaire
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Empêcher le rechargement de la page
  
      const textInput = document.getElementById("textInput").value;
  
      if (!textInput.trim()) {
        resultDiv.innerHTML = "<p style='color: red;'>Veuillez entrer un texte avant de soumettre !</p>";
        return;
      }
  
      // Afficher le loader et masquer les résultats précédents
      showLoader();
      resultDiv.innerHTML = "";
  
      try {
        const response = await fetch("http://127.0.0.1:5000/classify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: textInput }),
        });
  
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.statusText);
        }
  
        const data = await response.json();
        resultDiv.innerHTML = `<p><strong>Texte :</strong> ${data.text}</p>
                               <p><strong>Classification :</strong> ${data.classification}</p>`;
      } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "<p style='color: red;'>Une erreur est survenue. Réessayez plus tard.</p>";
      } finally {
        hideLoader(); // Masquer le loader une fois le traitement terminé
      }
    });
  });

