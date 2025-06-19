# Annuaire Employés Orange

## Auteur

- Nom : Habibatou Ndjidda  
- Langages utilisés : HTML / CSS / JavaScript 
- Temps réellement passé : Environ 3 heures

## Description

Cette mini-application web permet de gérer un annuaire interne simplifié des employés d’un service Orange, en front-end uniquement, sans bibliothèques ni frameworks externes.

Elle fonctionne 100 % en HTML, CSS et JavaScript, avec persistance des données grâce à `localStorage`.

## Fonctionnalités développées

- Formulaire d’ajout d’un employé
  - Champs requis : Nom, Prénom, Email, Poste/Fonction
  - Validation des champs et du format de l'email
- Bouton "Ajouter" responsive prenant toute la largeur
- Affichage dynamique de la liste des employés sans rechargement
- Suppression d’un employé avec mise à jour immédiate
- Persistance des données via `localStorage`
- Message “Aucun employé enregistré” si la liste est vide
- Interface responsive (desktop + mobile)
- Design clair et accessible en CSS personnalisé

## Instructions pour lancer le projet

1. Télécharger ou cloner ce projet.
2. Ouvrir le fichier `index.html` dans un navigateur web (double-clic suffit).
3. Remplir le formulaire pour ajouter un employé.
4. L'employé apparaît automatiquement dans la liste.
5. Cliquer sur "Supprimer" pour retirer un employé.
6. Les données restent disponibles même après avoir rechargé la page.

## Structure des fichiers

HabibatouNdjidda_AnnuaireEmployes/
├── index.html    # Page principale (structure HTML)
├── style.css     # Feuille de style (mise en forme responsive)
├── script.js     # Script JavaScript (logique de gestion)
└── README.md     # Documentation du projet

## Responsive design

- L’interface s’adapte aux écrans petits et moyens :
  - Utilisation de `flex-wrap` et `media queries`
  - Boutons et champs adaptés sur mobile
  - Affichage fluide sur tablette ou smartphone

## Bonus rajoutés

- Édition d’un employé existant
- Export CSV de la liste des employés
- Système de recherche ou de tri
- Affichage paginé si plus de 10 employés

## Dépendances

Aucune.  
Projet 100 % natif : HTML / CSS / JavaScript sans Bootstrap, jQuery, React, ni autre bibliothèque.

## Licence

Projet éducatif — libre d’usage pour démonstration ou entraînement.
