from flask import Flask, request, jsonify
from classifier import classify_text  # Importer la fonction de classification

app = Flask(__name__)

@app.route('/')
def home():
    return "Bienvenue sur l'agent d'orientation SISR/SLAM !"

@app.route('/classify', methods=['POST'])
def classify():
    data = request.json
    if not data or "text" not in data:
        return jsonify({"error": "Veuillez fournir un texte à classifier."}), 400

    text = data["text"]
    classification = classify_text(text)  # Appelle la fonction classify_text
    return jsonify({"text": text, "classification": classification})

if __name__ == "__main__":
    app.run(debug=True)

@app.route('/questionnaire', methods=['POST'])
def questionnaire():
    data = request.json
    if not data or "answers" not in data:
        return jsonify({"error": "Veuillez fournir les réponses au questionnaire."}), 400

    answers = data["answers"]
    questions = [
        {"question": "Aimez-vous travailler sur des serveurs ?", "field": "sisr"},
        {"question": "Préférez-vous créer des applications ?", "field": "slam"},
        {"question": "Avez-vous un intérêt pour la virtualisation ?", "field": "sisr"},
        {"question": "Vous aimez manipuler des bases de données ?", "field": "slam"}
    ]

    scores = {"sisr": 0, "slam": 0}
    for idx, q in enumerate(questions):
        if idx < len(answers) and answers[idx].lower() == "oui":
            scores[q["field"]] += 1

    if scores["sisr"] > scores["slam"]:
        return jsonify({"orientation": "SISR"})
    elif scores["slam"] > scores["sisr"]:
        return jsonify({"orientation": "SLAM"})
    else:
        return jsonify({"orientation": "Indécis"})
