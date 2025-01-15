document.addEventListener("DOMContentLoaded", () => {
  // --- SECTION : Classification ---
  const classifyForm = document.getElementById("classifyForm");
  const classifyResult = document.getElementById("classifyResult");

  classifyForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const textInput = document.getElementById("textInput").value.trim();

    // Vérifiez si l'utilisateur a saisi un texte
    if (!textInput) {
      classifyResult.innerHTML = "<p style='color: red;'>Veuillez entrer un texte à classer !</p>";
      return;
    }

    try {
      classifyResult.innerHTML = `
        <div id="loader">
          <div class="spinner"></div>
          <p>Classification en cours...</p>
        </div>
      `;

      // Envoyer une requête POST au backend Flask
      const response = await fetch("/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput }),
      });

      // Vérifiez la réponse du backend
      if (!response.ok) {
        throw new Error("Erreur du serveur");
      }

      const data = await response.json();
      classifyResult.innerHTML = `
        <p><strong>Texte :</strong> ${data.text}</p>
        <p><strong>Classification :</strong> ${data.classification}</p>
      `;
    } catch (error) {
      console.error("Erreur :", error);
      classifyResult.innerHTML = "<p style='color: red;'>Une erreur est survenue lors de la classification.</p>";
    }
  });

  // --- SECTION : Questionnaire ---
  const questions = [
    "Aimez-vous travailler sur des serveurs ?",
    "Préférez-vous créer des applications ?",
    "Avez-vous un intérêt pour la virtualisation ?",
    "Vous aimez manipuler des bases de données ?",
  ];

  let currentQuestionIndex = 0; // Index de la question actuelle
  const answers = []; // Stocker les réponses de l'utilisateur
  const currentQuestionDiv = document.getElementById("currentQuestion");
  const nextButton = document.getElementById("nextButton");
  const questionnaireResult = document.getElementById("questionnaireResult");

  // Fonction pour afficher une question
  function showQuestion(index) {
    currentQuestionDiv.innerHTML = `
      <p>${questions[index]}</p>
      <label><input type="radio" name="answer" value="oui" required> Oui</label>
      <label><input type="radio" name="answer" value="non" required> Non</label>
    `;
  }

  // Gérer le clic sur le bouton "Valider"
  nextButton.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
      alert("Veuillez sélectionner une réponse !");
      return;
    }

    // Ajouter la réponse au tableau
    answers.push(selectedOption.value);

    // Passer à la question suivante ou envoyer les réponses
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
    } else {
      // Toutes les questions ont été répondues, envoyer les réponses
      submitAnswers();
    }
  });

  // Fonction pour soumettre les réponses au backend
  async function submitAnswers() {
    try {
      nextButton.disabled = true; // Désactiver le bouton pour éviter les clics multiples
      currentQuestionDiv.innerHTML = `
        <div id="loader">
          <div class="spinner"></div>
          <p>Envoi des réponses en cours...</p>
        </div>
      `;

      const response = await fetch("/questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: answers }),
      });

      const data = await response.json();
      questionnaireResult.innerHTML = `<p>Orientation : ${data.orientation}</p>`;
    } catch (error) {
      console.error("Erreur :", error);
      questionnaireResult.innerHTML = "<p style='color: red;'>Erreur lors de l'envoi du questionnaire.</p>";
    } finally {
      nextButton.disabled = false;
    }
  }

  // Afficher la première question au chargement
  showQuestion(currentQuestionIndex);
});
