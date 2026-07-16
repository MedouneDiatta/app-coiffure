console.log("profil.js chargé");
// Récupère l'id du coiffeur depuis l'URL (ex: profil.html?id=2 => "2")
const params = new URLSearchParams(window.location.search);
const idDansUrl = params.get("id");

// Convertir l'id (texte) en nombre
const idNombre = Number(idDansUrl);

// Recherche du coiffeur correspondant dans le tableau
const coiffeurTrouve = coiffeurs.find((coiffeur) => coiffeur.id === idNombre);
console.log("ID :", idNombre);
console.log("Coiffeur trouvé :", coiffeurTrouve);

// Récupération des conteneurs HTML
const identiteContainer = document.getElementById("identite");
const domicileContainer = document.getElementById("domicile");
const prestationContainer = document.getElementById("prestations");
const realisationContainer = document.getElementById("realisations");
const planningContainer = document.getElementById("planning");

console.log("identite :", identiteContainer);

console.log("domicile :", domicileContainer);
console.log("prestations :", prestationContainer);
console.log("realisations :", realisationContainer);

// ======= IDENTITÉ DU COIFFEUR =======

identiteContainer.innerHTML = `

<!-- ==========================================
            Identité du coiffeur
=========================================== -->

<div class="identite-premium">

    <h2 class="nom-coiffeur">

        ${coiffeurTrouve.nom}

    </h2>

    <div class="note-premium">

        <i class="bi bi-star-fill"></i>

        ${coiffeurTrouve.note}

    </div>

    <div class="info-premium">

        <span>

            <i class="bi bi-scissors"></i>

            ${coiffeurTrouve.specialite}

        </span>

        <span>

            <i class="bi bi-award-fill"></i>

            ${coiffeurTrouve.anneesExperiences} ans d'expérience

        </span>

    </div>

</div>

`;
console.log("IDENTITE OK");
// ======= INFORMATIONS DOMICILE =======

domicileContainer.innerHTML = `
  <p>
    Domicile :
    ${coiffeurTrouve.aDomicile ? "À la maison" : "Au Salon"}
  </p>

  <p>
    Zone/Quartier :
    ${coiffeurTrouve.zoneQuartier}
  </p>
`;
console.log("DOMICILE OK");
// ======= PRESTATIONS =======

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
console.log("PRESTATIONS OK");

prestationContainer.innerHTML = lesPrestations;

// ======= GALERIE DES RÉALISATIONS =======

// Toutes les photos
const toutesLesPhotos = coiffeurTrouve.realisations;

console.log("Toutes les photos :", toutesLesPhotos);

// On garde seulement les deux premières photos
const photosVisibles = coiffeurTrouve.realisations.slice(0, 2);

// Nombre de photos restantes
const nombrePhotosRestantes = toutesLesPhotos.length - 2;

// Construction des photos visibles

let lesPhotosVisibles = "";

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
    if (nombrePhotosRestantes > 0) {
      lesPhotosVisibles += `
        <div 
          class="photo-plus"
          id="ouvrirGalerie"
        >

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
      lesPhotosVisibles += `
        <img 
          src="${photo}"
          class="img-fluid"
        >
      `;
    }
  }
});

// Affichage des photos visibles

realisationContainer.innerHTML = lesPhotosVisibles;
console.log("REALISATIONS OK");
document.getElementById("carte-profil").style.display = "block";

// GALERIE COMPLÈTE DANS LA MODALE

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
console.log("GALERIE COMPLETE OK");

// ======= OUVERTURE DE LA MODALE =======

const ouvrirGalerie = document.getElementById("ouvrirGalerie");
console.log("BOUTON GALERIE :", ouvrirGalerie);

if (ouvrirGalerie) {
  ouvrirGalerie.addEventListener("click", () => {
    const maModale = new bootstrap.Modal(
      document.getElementById("modaleGalerie"),
    );

    maModale.show();
  });
}
// console.log("FIN DU SCRIPT PROFIL");
