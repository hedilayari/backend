import pymongo
import requests
import time

# Connexion à la base de données MongoDB Atlas
client = pymongo.MongoClient("mongodb+srv://work:work@cluster0.sbwnosv.mongodb.net/?retryWrites=true&w=majority")
db = client["test"]
collection = db["iot"]

# Boucle while infinie pour récupérer et insérer les données en temps réel
while True:
    # Récupération des données de ThingSpeak
    url = "https://api.thingspeak.com/channels/2146934/feeds.json?api_key=5UZ3FXRAXRYM20O8"
    response = requests.get(url)
    data = response.json()
  
    # Insertion des données dans MongoDB
    for feed in data["feeds"]:
        poid = float(feed["field3"])
        if poid < 0:
            poid = poid * (-1) / 1000
        doc = {
            "timestamp": feed["created_at"],
            "temp": feed["field1"],
            "hum": feed["field2"],
            "poid": str(poid),  # Convertir en chaîne de caractères
            "latitude": feed["field4"],
            "longitude": feed["field5"],
            "analog": feed["field6"],
            # Ajoutez autant de champs que nécessaire
        }
        collection.insert_one(doc)

    # Attendre 90 secondes avant de récupérer les nouvelles données
    time.sleep(90)
