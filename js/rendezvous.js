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

  const recapitulatif = document.getElementById("recapitulatif");

  // récupération du prix de la prestation choisie
  const prix = coiffeurTrouve.prestations[valeurPrestation];

  recapitulatif.innerHTML = `

<div class="carte-confirmation">

    <div class="confirmation-header">

        <i class="bi bi-check-circle-fill"></i>

        <h3>Réservation confirmée</h3>

        <p>Votre demande a bien été enregistrée.</p>

    </div>

    <div class="ligne-confirmation">

        <span>👤 Client</span>

        <strong>${valeurNom}</strong>

    </div>

    <div class="ligne-confirmation">

        <span>💈 Coiffeur</span>

        <strong>${coiffeurTrouve.nom}</strong>

    </div>

    <div class="ligne-confirmation">

        <span>✂ Prestation</span>

        <strong>${valeurPrestation}</strong>

    </div>

    <div class="ligne-confirmation">

        <span>📅 Date</span>

        <strong>${valeurDate}</strong>

    </div>

    <div class="ligne-confirmation">

        <span>🕒 Heure</span>

        <strong>${valeurTime}</strong>

    </div>

    <div class="ligne-confirmation">

        <span>📍 Lieu</span>

        <strong>${valeurLieu}</strong>

    </div>

    <div class="ligne-confirmation total">

        <span>💰 Total</span>

        <strong>${prix} FCFA</strong>

    </div>

</div>

`;
  recapitulatif.style.display = "block";
  formulaire.reset();
});
