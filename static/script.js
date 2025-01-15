document.addEventListener("DOMContentLoaded", () => {
  // Classification de texte
  const classifyForm = document.getElementById("classifyForm");
  const classifyResult = document.getElementById("classifyResult");

  classifyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const textInput = document.getElementById("textInput").value;

    if (!textInput.trim()) {
      classifyResult.innerHTML = "<p style='color: red;'>Veuillez entrer un texte !</p>";
      return;
    }

    try {
      const response = await fetch("/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput }),
      });

      const data = await response.json();
      classifyResult.innerHTML = `<p>Texte : ${data.text}</p><p>Classification : ${data.classification}</p>`;
    } catch (error) {
      classifyResult.innerHTML = "<p style='color: red;'>Erreur lors de la classification.</p>";
    }
  });

  // Questionnaire
  const questionnaireForm = document.getElementById("questionnaireForm");
  const questionnaireResult = document.getElementById("questionnaireResult");

  questionnaireForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const answersInput = document.getElementById("answers").value;

    try {
      const response = await fetch("/questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: JSON.parse(answersInput) }),
      });

      const data = await response.json();
      questionnaireResult.innerHTML = `<p>Orientation : ${data.orientation}</p>`;
    } catch (error) {
      questionnaireResult.innerHTML = "<p style='color: red;'>Erreur lors de l'envoi du questionnaire.</p>";
    }
  });
});
