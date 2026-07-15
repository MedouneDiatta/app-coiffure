// Récupère l'id du coiffeur depuis l'URL (ex: profil.html?id=2 => "2")
const params = new URLSearchParams(window.location.search);
const idDansUrl = params.get("id");

// Convertir l'id (texte) en nombre
const idNombre = Number(idDansUrl);

// Recherche du coiffeur correspondant dans le tableau
const coiffeurTrouve = coiffeurs.find((coiffeur) => coiffeur.id === idNombre);

// Récupération des conteneurs HTML
const identiteContainer = document.getElementById("identite");
const domicileContainer = document.getElementById("domicile");
const prestationContainer = document.getElementById("prestations");
const realisationContainer = document.getElementById("realisations");

// ======= IDENTITÉ DU COIFFEUR =======

identiteContainer.innerHTML = `
  <h4>Nom : ${coiffeurTrouve.nom}</h4>
  <p>Spécialité : ${coiffeurTrouve.specialite}</p>
  <p>Expérience : ${coiffeurTrouve.anneesExperiences} ans</p>
  <p>Note : ${coiffeurTrouve.note}</p>
`;

// ======= INFORMATIONS DOMICILE =======

domicileContainer.innerHTML = `
  <p>
    Domicile :
    ${coiffeurTrouve.aDomicile ? "Disponible à domicile" : "Au salon"}
  </p>

  <p>
    Zone/Quartier : ${coiffeurTrouve.zoneQuartier}
  </p>
`;

// ======= PRESTATIONS =======

// Récupère les noms des prestations disponibles
let lesPrestations = "";

const prestations = Object.keys(coiffeurTrouve.prestations);

prestations.forEach((nomPrestation) => {
  lesPrestations += `
    <p>
      ${nomPrestation} :
      ${coiffeurTrouve.prestations[nomPrestation]} FCFA
    </p>
  `;
});

prestationContainer.innerHTML = lesPrestations;

// ======= GALERIE DES RÉALISATIONS =======
// Afficher seulement les deux premières photos,
// puis afficher +X s'il existe d'autres photos.
// La galerie complète sera utilisée plus tard dans une modale.

const toutesLesPhotos = coiffeurTrouve.realisations;

console.log("Toutes les photos :", toutesLesPhotos);

// On garde uniquement les deux premières photos visibles
const photosVisibles = coiffeurTrouve.realisations.slice(0, 2);

// Nombre de photos cachées derrière le +X
const nombrePhotosRestantes = toutesLesPhotos.length - 2;

let lesPhotosVisibles = "";
// console.log("Photos visibles :", photosVisibles);
/*
photosVisibles.forEach((photo, index) => {
  // Première photo
  if (index === 0) {
    lesPhotosVisibles += `
      <img 
        src="${photo}" 
        class="img-fluid"
      >
    `;
  }

  // Deuxième photo
  if (index === 1) {
    // S'il reste des photos, afficher le +X
    if (nombrePhotosRestantes > 0) {
      lesPhotosVisibles += `
      <div class="photo-plus" id="ouvrirGalerie">

        <img 
          src="${photo}" 
          class="img-fluid"
        >

        <span>
          +${nombrePhotosRestantes}
        </span>

      </div>
    `;
    } else {
      // s'il y'en a que deux
      lesPhotosVisibles += `
      <img 
        src="${photo}" 
        class="img-fluid"
      >
    `;
    }
  }
});
*/

photosVisibles.forEach((photo, index) => {
  console.log("avant ajour:", lesPhotosVisibles);

  if (index === 0) {
    console.log("PHOTO 1 AJOUTEE");

    lesPhotosVisibles += "<img src='" + photo + "'>";

    console.log("Après ajout photo 1 :", lesPhotosVisibles);
  }

  if (index === 1) {
    lesPhotosVisibles += `
            <div class="photo-plus" id="ouvrirGalerie">

                <img src="${photo}" class="img-fluid">

                <span>
                    +${nombrePhotosRestantes}
                </span>

            </div>
        `;
  }
  console.log("après ajour:", lesPhotosVisibles);
});
console.log("FIN DE LA BOUCLE :", lesPhotosVisibles);

// Affichage des 2 photos dans la page
console.log("HTML FINAL :", lesPhotosVisibles);
realisationContainer.innerHTML = `
    <h3>TEST AFFICHAGE</h3>
    ${lesPhotosVisibles}
`;
console.log(lesPhotosVisibles);

// Préparation de la galerie complète
const galerieComplete = document.getElementById("galerie-complete");

let toutesLesImages = "";

toutesLesPhotos.forEach((photo) => {
  toutesLesImages += `
    <img 
      src="${photo}" 
      class="img-fluid m-2"
      width="150"
    >
  `;
});

galerieComplete.innerHTML = toutesLesImages;

// Activation du clic sur le +X
const ouvrirGalerie = document.getElementById("ouvrirGalerie");

console.log("ouvrirGalerie :", ouvrirGalerie);

ouvrirGalerie.addEventListener("click", () => {
  const maModale = new bootstrap.Modal(
    document.getElementById("modaleGalerie"),
  );

  maModale.show();
});
