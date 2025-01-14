print("Le fichier questionnaire.py a démarré.")

def ask_questions():
    questions = [
        {"question": "Aimez-vous travailler sur des serveurs ?", "field": "sisr"},
        {"question": "Préférez-vous créer des applications ?", "field": "slam"},
        {"question": "Avez-vous un intérêt pour la virtualisation ?", "field": "sisr"},
        {"question": "Vous aimez manipuler des bases de données ?", "field": "slam"}
    ]

    scores = {"sisr": 0, "slam": 0}

    # Pose les questions à l'utilisateur
    for q in questions:
        answer = input(q["question"] + " (oui/non) : ").strip().lower()
        if answer == "oui":
            scores[q["field"]] += 1

    # Détermine l'orientation
    if scores["sisr"] > scores["slam"]:
        return "SISR"
    elif scores["slam"] > scores["sisr"]:
        return "SLAM"
    else:
        return "Indécis"

# Ajoutez ceci pour exécuter la fonction lorsqu'on lance le fichier directement
if __name__ == "__main__":
    orientation = ask_questions()
    print(f"Votre orientation est : {orientation}")