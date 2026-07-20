// Récupère l'id du coiffeur depuis l'URL(ex:rendezvous.html?id=2 => "2")
const params = new URLSearchParams(window.location.search);
const idDansUrl = params.get("id");
// console.log(idDansUrl);

// convertir l'id(texte) en nombre ,puis retrouve le coiffeur correspondant dans le tableau des coiffeurs
const idNombre = Number(idDansUrl);
const coiffeurTrouve = coiffeurs.find((coiffeur) => coiffeur.id === idNombre);
// console.log(coiffeurTrouve);

const formulaire = document.getElementById("formulaire");
const prestations = document.getElementById("prestation");
const prenom = document.getElementById("nom");
const telephone = document.getElementById("numero");
const adress = document.getElementById("adress");
const date = document.getElementById("date");
const time = document.getElementById("time");
const confirmer = document.getElementById("button");

let lesPrestations = "";
let prestation = Object.keys(coiffeurTrouve.prestations);
prestation.forEach((nomPrestation) => {
  lesPrestations += `
      <option value ="${nomPrestation}">${nomPrestation} -  ${coiffeurTrouve.prestations[nomPrestation]} FCFA</option>
    `;
});

prestations.innerHTML = lesPrestations;

formulaire.addEventListener("submit", (e) => {
  e.preventDefault();
  const valeurNom = prenom.value;
  const valeurTelphone = telephone.value;
  const valeurAdress = adress.value;
  const valeurPrestation = prestations.value;
  const valeurDate = date.value;
  const valeurTime = time.value;
  const valeurLieu = document.querySelector('input[name="lieu"]:checked').value;

  const regexNom = /^[A-Za-zÀ-ÿ\s-]+$/;
  if (!regexNom.test(valeurNom)) {
    alert("Le nom ne doit contenir que des lettres");
    return;
  }
  const regexTelephone = /^[0-9]{9}$/;
  if (!regexTelephone.test(valeurTelphone)) {
    alert("Le numero de telephone ne doit contenir que 9 chiffres !");
    return;
  }
  const regexAdress = /^[A-Za-zÀ-ÿ0-9\s]+$/;
  if (!regexAdress.test(valeurAdress)) {
    alert("L'adresse ne peut contenir que des lettres et des chiffres !");
    return;
  }
  // Création de l'objet réservation

  const reservation = {
    nom: valeurNom,

    telephone: valeurTelphone,

    adresse: valeurAdress,

    prestation: valeurPrestation,

    date: valeurDate,

    heure: valeurTime,

    lieu: valeurLieu,

    coiffeur: coiffeurTrouve.nom,

    specialite: coiffeurTrouve.specialite,

    photo: coiffeurTrouve.photo,
  };

  // ===============================
  // Sauvegarde des réservations
  // ===============================

  // On récupère les anciennes réservations
  let mesReservations =
    JSON.parse(localStorage.getItem("mesReservations")) || [];

  // On ajoute la nouvelle
  mesReservations.push({
    ...reservation,

    statut: "En attente",
  });

  // On sauvegarde le tableau
  localStorage.setItem(
    "mesReservations",

    JSON.stringify(mesReservations),
  );

  // On garde aussi la dernière réservation
  // pour confirmation.html
  localStorage.setItem(
    "reservation",

    JSON.stringify(reservation),
  );

  // Réinitialisation du formulaire

  formulaire.reset();

  // Redirection vers la page de confirmation

  window.location.href = "confirmation.html";
});

// ===============================
// Bottom Navigation
// ===============================

const btnBottomRdv = document.getElementById("btnBottomRdv");

if (btnBottomRdv) {
  btnBottomRdv.href = `rendezvous.html?id=${coiffeurTrouve.id}`;
}
