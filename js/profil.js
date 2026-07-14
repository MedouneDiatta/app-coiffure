// Récupère l'id du coiffeur depuis l'URL(ex:profil.html?id=2 => "2")
const params = new URLSearchParams(window.location.search);
const idDansUrl = params.get("id");
// console.log(idDansUrl);

// convertir l'id(texte) en nombre ,puis retrouve le coiffeur correspondant dans le tableau des coiffeurs
const idNombre = Number(idDansUrl);
const coiffeurTrouve = coiffeurs.find((coiffeur) => coiffeur.id === idNombre);
// console.log(coiffeurTrouve);

const identiteContainer = document.getElementById("identite");
const domicileContainer = document.getElementById("domicile");
const prestationContainer = document.getElementById("prestations");
const realisationContainer = document.getElementById("realisations");

identiteContainer.innerHTML = `
  <h4>Nom : ${coiffeurTrouve.nom}</h4>
  <p>Spécialité : ${coiffeurTrouve.specialite}</p>
  <p>Experience : ${coiffeurTrouve.anneesExperiences} ans</p>
  <p>Note : ${coiffeurTrouve.note}</p>
`;
domicileContainer.innerHTML = `
  <p>A Domicile: ${coiffeurTrouve.aDomicile ? "Oui" : "Non"}</p>
  <p>Zone/Quartier : ${coiffeurTrouve.zoneQuartier}</p>
  
`;

let lesPrestations = "";
let prestation = Object.keys(coiffeurTrouve.prestations);
// console.log(prestation);

prestation.forEach((nomPrestation) => {
  lesPrestations += `
      <p>${nomPrestation}:${coiffeurTrouve.prestations[nomPrestation]} FCFA</p>
    `;
});
prestationContainer.innerHTML = lesPrestations;

let lesRealisations = "";
coiffeurTrouve.realisations.forEach((realisation) => {
  lesRealisations += `
   
       <img src="images/${realisation}" class="img-fluid">
    `;
});
realisationContainer.innerHTML = lesRealisations;
