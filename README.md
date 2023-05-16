# NodeApi
**Projet étudiant** (Chan, Dedola, Paiva)

###### ChatBot Node.js

_ **Infrastructure d'application web** : Framework Node.js (v14.16.0)-\> Express

###### DialogFlow

- **Id projet DialogFlow**: ipiagent1-anpv

_ **Paramètres requête DialogFlow** : 

            **Requête** -> POST
 
            **Body** -> _message_: texte en entrée de l'utilisateur
 
            **Format** -> application/x-www-form-urlencoded

###### Librairies

_ **Librairie intégrée google-cloud** : storage, dialogflow

_ **Librairies** : body-parser, moment, axios

_ **APIs** : weatherApi-> openWeather, animeApi -> MyAnimeList

###### Fonctionnement

_ **Lancement de l'application** : 

            npm install, node index.js

_ **Endpoints** :  
            
*/contact* ->  Récupération de la météo par défaut
            
*/chat* -> Prends en entrée un message de l'utilisateur.
Si l'intent détecté est :

 ###### Weather: 
 Fourni la météo pour une date et un lieu
 
 ###### Anime:
 Fourni les détails sur un animé


                                     

                        
