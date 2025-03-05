# WildChat

WildChat est une application en cours de développement, conçue pour recréer l'expérience de l'enseignement en présentiel dans un environnement virtuel. L'objectif est de permettre aux enseignants et aux étudiants d'interagir en temps réel, simulant l'atmosphère dynamique d'une salle de classe physique.

## 🚀 Technologies

WildChat est construit avec la stack technologique suivante :

- **Frontend** : React avec TypeScript et Vite
- **Backend** : NestJS
- **Communication temps réel** : Socket.IO et PeerJS
- **Bases de données** : 
  - Redis (cache et gestion des sessions)
  - MySQL (stockage persistant des données)

## 🎯 Fonctionnalités

- Visioconférence en temps réel
- Chat textuel instantané
- Partage d'écran et de documents
- Salles virtuelles pour cours et travaux de groupe
- Système de gestion des utilisateurs (enseignants/étudiants)
- Tableau blanc interactif
- Notifications en temps réel

## 🏗️ Architecture

L'application est structurée selon une architecture client-serveur :

- **Client** : Application React TS, optimisée avec Vite pour des performances accrues
- **Serveur** : API RESTful construite avec NestJS
- **Communication en temps réel** : Socket.IO pour la messagerie instantanée et PeerJS pour les flux audio/vidéo
- **Persistance** : Redis pour les données temporaires et sessions, MySQL pour le stockage permanent

## 🔧 Installation

### Prérequis

- Node.js (v14.x ou supérieure)
- npm ou yarn
- Redis
- MySQL

### Étapes d'installation

1. Cloner le dépôt
```bash
git clone https://github.com/techmefr/WildChat.git
cd WildChat
```

2. Installer les dépendances (frontend et backend)
```bash
# Installation des dépendances du frontend
cd client
npm install

# Installation des dépendances du backend
cd ../server
npm install
```

3. Configurer les variables d'environnement
   
Créez un fichier `.env` dans le dossier `server` en vous inspirant du fichier `.env.example` :
```
# Base de données
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=wildchat

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your_secret_key

# Server
PORT=3000
```

4. Lancer les services de base de données
```bash
# Assurez-vous que Redis et MySQL sont en cours d'exécution
```

5. Démarrer l'application
```bash
# Lancer le backend
cd server
npm run start:dev

# Lancer le frontend (dans un autre terminal)
cd client
npm run dev
```

## 📚 Documentation

La documentation technique détaillée est disponible dans le dossier `docs/` :

- Architecture du projet
- API endpoints
- Modèles de données
- Guide de contribution

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'feat: add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

Veuillez consulter le fichier `CONTRIBUTING.md` pour plus de détails sur notre processus de contribution.

## 📝 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur le dépôt GitHub.

---

© 2025 WildChat. Tous droits réservés.
