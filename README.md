# Impro à Saint-Junien

Outils de jeu pour l'atelier d'improvisation théâtrale de Saint-Junien : des paquets de cartes à tirer sur téléphone ou à vidéoprojeter pendant les séances.

**Le site : https://chrgentil87.github.io/impro-saint-junien/**

## Les pages

| Page | Contenu | En séance |
| --- | --- | --- |
| [Personnages improbables](https://chrgentil87.github.io/impro-saint-junien/personnages-improbables.html) | 20 personnages loufoques, chacun avec un corps, une voix, une manie, un objectif et une réplique signature | Un joueur tire une carte et entre en scène avec ce personnage, sans jamais le nommer |
| [Passages improbables](https://chrgentil87.github.io/impro-saint-junien/passages-improbables.html) | 20 trajets : un lieu de départ, un objet de ce lieu, un lieu d'arrivée | En duo, on installe le premier lieu, puis on utilise l'objet pour basculer dans le second |

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
└── passages-improbables.html
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

## Crédits

© Christophe Gentil – 2026. Contenus conçus pour l'atelier d'improvisation de Saint-Junien. Tous droits réservés.
