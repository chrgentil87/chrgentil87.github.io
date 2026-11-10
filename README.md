# Impro à Saint-Junien

Outils de jeu pour l'atelier d'improvisation théâtrale de Saint-Junien : des paquets de cartes à tirer sur téléphone ou à vidéoprojeter pendant les séances.

**Le site : https://chrgentil87.github.io/impro-saint-junien/**

## Les pages

| Page | Contenu | En séance |
| --- | --- | --- |
| [Personnages improbables](https://chrgentil87.github.io/impro-saint-junien/personnages-improbables.html) | 20 personnages loufoques, chacun avec un corps, une voix, une manie, un objectif et une réplique signature | Un joueur tire une carte et entre en scène avec ce personnage, sans jamais le nommer |
| [Passages improbables](https://chrgentil87.github.io/impro-saint-junien/passages-improbables.html) | 20 trajets : un lieu de départ, un objet de ce lieu, un lieu d'arrivée | En duo, on installe le premier lieu, puis on utilise l'objet pour basculer dans le second |
| [Vote des équipes](https://chrgentil87.github.io/vote-equipes.html) | Chaque étudiant saisit son nom et son e-mail, puis répartit 100 lou pelous entre les équipes avec des jauges | Les votes arrivent dans une feuille Google Sheets ; une adresse e-mail ne peut voter qu'une fois |

## Utilisation

- Touchez le dos du paquet pour tirer une carte, puis « Retirer la carte » pour la mettre de côté. Une carte retirée ne revient qu'une fois le paquet remélangé.
- Les pages fonctionnent sur téléphone, tablette et ordinateur, sans installation ni compte.
- Sur ordinateur et sur Android, le bouton « Plein écran » masque le navigateur, pratique pour vidéoprojeter.
- Pour les participants, envoyez **le lien** de la page (WhatsApp, SMS, QR code affiché en séance), jamais le fichier HTML. Sur iPhone, un fichier `.html` ouvert depuis WhatsApp s'affiche dans un aperçu qui n'exécute pas le JavaScript : le paquet apparaît, mais les cartes ne se retournent pas.

## Organisation du dépôt

```
impro-saint-junien/
├── README.md                       ce fichier, qui sert aussi de page d'accueil du site
├── personnages-improbables.html
├── passages-improbables.html
├── vote-equipes.html               page de vote (100 lou pelous à répartir)
└── vote-equipes-apps-script.gs     serveur d'enregistrement, à coller dans Google Apps Script
```

Chaque page est un fichier HTML autonome : ses styles et son script sont dans le fichier. Seules les polices viennent de Google Fonts ; sans elles, la page s'affiche avec les polices du téléphone.

## Mettre le site en ligne avec GitHub Pages

1. Créez un dépôt **public** nommé `impro-saint-junien` et déposez-y les fichiers (bouton *Add file › Upload files*).
2. Dans *Settings › Pages*, rubrique *Build and deployment*, choisissez *Deploy from a branch*, puis la branche `main` et le dossier `/ (root)`. Enregistrez.
3. Après une ou deux minutes, le site est en ligne à l'adresse `https://chrgentil87.github.io/impro-saint-junien/`. Ce README en devient la page d'accueil.
4. Remplacez `VOTRE-COMPTE` par votre identifiant GitHub dans les liens de ce fichier.

Pour mettre une page à jour, déposez la nouvelle version sous le même nom de fichier : le lien envoyé aux participants reste valable.

## Ajouter une page

1. Nommez le fichier en minuscules, sans espaces ni accents, par exemple `situations-de-depart.html`.
2. Vérifiez que c'est un document HTML complet, qui commence comme ceci :

   ```html
   <!doctype html>
   <html lang="fr">
   <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
     <title>Nom de la page</title>
     <style>[hidden]{display:none!important}</style>
   </head>
   <body>
     …
   </body>
   </html>
   ```

   La ligne `[hidden]{display:none!important}` est indispensable pour les paquets de cartes : ils masquent la carte tirée et le message « paquet vide » avec l'attribut `hidden`. Sans elle, tout s'affiche en même temps.
3. Ajoutez une ligne au tableau « Les pages » ci-dessus.
4. Testez la page sur un iPhone et sur un téléphone Android avant la séance.

## Vote des équipes : brancher l'enregistrement

GitHub Pages ne sert que des pages statiques : il ne peut pas enregistrer de données. Les votes sont donc envoyés à une feuille **Google Sheets**, via un petit script Google Apps Script (gratuit). C'est lui qui refuse un second vote avec la même adresse e-mail.

1. Créez une feuille Google Sheets vide (par exemple « Votes des équipes »).
2. Menu *Extensions › Apps Script*. Effacez le contenu de `Code.gs` et collez-y tout le fichier `vote-equipes-apps-script.gs`. Enregistrez.
3. Bouton *Déployer › Nouveau déploiement*, type **Application Web** :
   - *Exécuter en tant que* : **Moi** ;
   - *Qui peut accéder* : **Tout le monde**.
   Autorisez l'accès quand Google le demande, puis copiez l'**URL de l'application Web** (elle finit par `/exec`).
4. Dans `vote-equipes.html`, en haut du script, collez cette URL : `var ENDPOINT = "https://script.google.com/macros/s/…/exec";`
5. Toujours en haut du script, adaptez la liste `TEAMS` (nom et couleur de chaque équipe). Déposez le fichier sur GitHub.

Chaque vote ajoute une ligne à l'onglet **Votes** : date, nom, e-mail, une colonne par équipe, total (toujours 100). Pour obtenir le résultat, ajoutez sous chaque colonne d'équipe une formule `=SOMME(D2:D)`.

Tant que `ENDPOINT` est vide, la page fonctionne en mode démonstration : rien n'est envoyé, un bandeau le signale.

À savoir : la vérification se fait sur l'adresse e-mail saisie, sans confirmation par mail. Un étudiant pourrait voter une seconde fois avec une autre adresse ; relisez la liste des noms dans la feuille avant de dépouiller. Si vous modifiez le script, refaites *Déployer › Gérer les déploiements › Modifier › Nouvelle version* pour garder la même URL.

## Crédits

© Christophe Gentil – 2026. Contenus conçus pour l'atelier d'improvisation de Saint-Junien. Tous droits réservés.
