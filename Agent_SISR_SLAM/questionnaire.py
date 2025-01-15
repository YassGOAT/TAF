def process_questionnaire(answers):
    """
    Traite les réponses du questionnaire et renvoie l'orientation (SISR ou SLAM).
    :param answers: Liste des réponses (["oui", "non", ...])
    :return: Orientation ("SISR", "SLAM", ou "Indécis")
    """
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
        return "SISR"
    elif scores["slam"] > scores["sisr"]:
        return "SLAM"
    else:
        return "Indécis"
