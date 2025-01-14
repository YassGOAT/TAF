from classifier import classify_text
from questionnaire import ask_questions

# Tester le classifieur
text = "J'aime travailler sur des bases de données et des applications."
classification = classify_text(text)
print(f"Texte : {text}")
print(f"Classification : {classification}")

# Tester le questionnaire interactif
print("\nPassons maintenant au questionnaire interactif :")
orientation = ask_questions()
print(f"Votre orientation est : {orientation}")
