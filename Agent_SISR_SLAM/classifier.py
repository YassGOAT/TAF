def classify_text(text):
    sisr_keywords = ["serveur", "virtualisation", "réseau", "sécurité"]
    slam_keywords = ["application", "développement", "base de données", "programmation"]

    text = text.lower()
    sisr_score = sum(1 for word in sisr_keywords if word in text)
    slam_score = sum(1 for word in slam_keywords if word in text)

    if sisr_score > slam_score:
        return "SISR"
    elif slam_score > sisr_score:
        return "SLAM"
    else:
        return "Indécis"
