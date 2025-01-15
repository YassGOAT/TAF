from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/questionnaire', methods=['POST'])
def questionnaire():
    data = request.json  # Récupère le JSON envoyé dans la requête
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
