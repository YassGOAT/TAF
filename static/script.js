document.addEventListener("DOMContentLoaded", () => {
  // Définir les questions
  // Générer dynamiquement les questions
  const questions = [
    "Aimez-vous travailler sur des serveurs ?",
    "Préférez-vous créer des applications ?",
    "Avez-vous un intérêt pour la virtualisation ?",
    "Vous aimez manipuler des bases de données ?",
  ];

  const questionsContainer = document.getElementById("questionsContainer");
  questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `
      <label>${question}</label><br>
      <input type="radio" name="question${index}" value="oui" required> Oui
      <input type="radio" name="question${index}" value="non" required> Non
    `;
    questionsContainer.appendChild(questionDiv);
  });


  // Gérer la soumission du formulaire
  const questionnaireForm = document.getElementById("questionnaireForm");
  const questionnaireResult = document.getElementById("questionnaireResult");

  questionnaireForm.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    // Récupérer les réponses de l'utilisateur
    const answers = [];
    questions.forEach((_, index) => {
      const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
      if (selectedOption) {
        answers.push(selectedOption.value); // Ajouter la réponse ("oui" ou "non") au tableau
      } else {
        answers.push("non"); // Par défaut, considérer "non" si aucune réponse n'est sélectionnée
      }
    });
  
    try {
      // Envoyer les réponses au backend
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
    }
  });  
});

const answers = [];
questions.forEach((_, index) => {
  const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
  if (selectedOption) {
    answers.push(selectedOption.value);
  } else {
    answers.push("non");
  }
});

console.log("Réponses collectées :", answers); // Vérifiez les réponses ici
