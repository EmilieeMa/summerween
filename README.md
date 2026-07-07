# Site Summerween — version mobile QR code

## Ouvrir le site

Ouvrir `index.html` dans un navigateur récent. Le site est conçu en priorité pour les téléphones après le scan d’un QR code : navigation tactile, textes lisibles, vidéo verticale et bouton d’inscription fixe en bas de l’écran.

## Ajouter le formulaire Google

Ouvrir `config.js` puis coller le lien définitif du formulaire entre les guillemets :

```js
window.SUMMERWEEN_CONFIG = {
  formLinks: {
    participation: "https://votre-formulaire-google.fr"
  },
  teaserVideo: "assets/video/teaser.mp4"
};
```

Tant que le lien reste vide, le bouton affiche un message d’attente.

## Informations intégrées

- Soirée le 27 août 2026 à 19 h 30.
- Rendez-vous à l’Espace du Personnel.
- 100 places disponibles.
- Répartition en équipes de 10.
- Inscription réservée aux personnes sous contrat chez Walibi Rhône-Alpes le jour de la soirée.
- Déguisement facultatif.
- Le contenu précis de l’expérience reste volontairement secret.

## Teaser

Le teaser actuel dure environ 21 secondes et utilise un format vertical `720 × 1280`, adapté aux téléphones. Il présente le dossier fictif S-27 du Docteur Mystic sans révéler le déroulement exact de la soirée ni annoncer l’ouverture d’une attraction.

Pour le remplacer plus tard, conserver le nom :

`assets/video/teaser.mp4`

Format conseillé : MP4 H.264 vertical, avec un poids inférieur à 10 ou 15 Mo pour une lecture rapide en 4G/5G.

## Modifier le site

Le contenu se trouve dans `index.html`. Les couleurs principales sont définies dans `styles.css` :

- Violet : `#4F2C88`
- Rouge : `#6A1122`
- Mauve : `#CF5549`
- Noir : `#12121A`
- Beige : `#E5DBD1`

## Mise en ligne

Envoyer l’intégralité du dossier sur l’hébergement sans modifier son arborescence. Tester ensuite le QR code sur au moins un iPhone et un téléphone Android, en Wi-Fi puis en 4G/5G.

## Visuels

Les visuels présents dans le dossier sont ceux fournis pour la communication de l’événement.

## Version mobile QR code

Le site est optimisé pour une consultation après scan d’un QR code : marges de sécurité iPhone, boutons tactiles, titre « SUMMER / WEEN » sur deux lignes et teaser vertical avec bouton de lecture central.



## Correctif lecteur vidéo

Le bouton central disparaît entièrement pendant la lecture. Un petit bouton pause apparaît en bas à droite, et un clic directement sur la vidéo la met également en pause. Une fois en pause, le bouton central « Reprendre le message » réapparaît. Le titre Summerween est aussi réduit sur ordinateur tout en restant sur deux lignes sur téléphone.
