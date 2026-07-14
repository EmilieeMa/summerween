# Site Summerween — version finale

## Mise en ligne sur GitHub

Pour mettre à jour le site en ligne :

1. Ouvrir le dépôt GitHub `summerween`.
2. Cliquer sur **Add file → Upload files**.
3. Envoyer tout le contenu de ce dossier :
   - `index.html`
   - `styles.css`
   - `script.js`
   - `config.js`
   - `.nojekyll`
   - le dossier `assets`
4. Cliquer sur **Commit changes**.
5. Attendre quelques minutes que GitHub Pages se mette à jour.

Le lien du site reste le même tant que le nom du dépôt ne change pas :

`https://emilieema.github.io/summerween/`

## Formulaire d'inscription

Le bouton d'inscription utilise le lien présent dans `config.js`.

Texte affiché sur le site : **JE M’INSCRIS ICI**

## Informations intégrées au site

- Soirée le 27 août 2026 à 19 h.
- Rendez-vous à l’Espace du Personnel.
- 100 places disponibles.
- Équipes de 10 personnes.
- Inscription réservée aux personnes sous contrat chez Walibi Rhône-Alpes le jour de la soirée.
- Sans réservation préalable, aucun accès à la soirée ne sera possible.
- Déguisement autorisé mais non obligatoire.
- Tenue Walibi non autorisée.
- Visage visible : aucun masque ou accessoire couvrant.
- Armes et répliques strictement interdites.
- Règlement intérieur Walibi applicable.
- Les images de Mystic servent à l’ambiance et n’annoncent pas l’ouverture de l’attraction.

## Remplacer le teaser plus tard

Remplacer simplement le fichier :

`assets/video/teaser-summerween-final.mp4`

Il faut garder le même nom de fichier pour que le site le charge automatiquement.

Format conseillé : MP4 vertical 9:16, 1080 x 1920, moins de 15 Mo si possible.


## Correctif menu mobile et vidéo

Le menu mobile s’ouvre maintenant en plein écran même lorsque la page est déjà scrollée. Le bouton fixe d’inscription est masqué pendant l’ouverture du menu. La vidéo utilise une nouvelle image d’aperçu sans ancienne mention horaire et le bouton de lecture ne masque plus le texte de la vidéo.
