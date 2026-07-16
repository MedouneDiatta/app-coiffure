const listeDesCoiffeurs = document.getElementById("liste-coiffeurs");
const input = document.getElementById("cherche");
const recherche = document.getElementById("btn");

const afficherCoiffeurs = (tableauCoiffeurs) => {
  let htmlCartes = "";
  tableauCoiffeurs.forEach((coiffeur) => {
    let prestation = Object.keys(coiffeur.prestations);

    htmlCartes += `
<div class="col-lg-4 col-md-6 mb-4">

    <div class="card carte-coiffeur border-0">

        <img
            src="${coiffeur.photo}"
            alt="${coiffeur.nom}"
            class="photo-coiffeur">

        <div class="card-body">

            <div class="d-flex justify-content-between align-items-center mb-2">

                <span class="note">
                    <i class="bi bi-star-fill"></i>
                    ${coiffeur.note}
                </span>

                <span class="disponible">
                    <i class="bi bi-circle-fill"></i>
                    Disponible
                </span>

            </div>

            <h4 class="nom-coiffeur">
                ${coiffeur.nom}
            </h4>

            <p class="specialite">
                ${coiffeur.specialite}
            </p>

            <p class="info">
                <i class="bi bi-geo-alt-fill"></i>
                ${coiffeur.zoneQuartier}
            </p>

            <p class="info">
                <i class="bi bi-house-door-fill"></i>
                ${coiffeur.aDomicile ? "À domicile" : "Salon uniquement"}
            </p>

            <div class="prix">
                Dès
                <strong>
                    ${coiffeur.prestations[prestation[0]]} FCFA
                </strong>
            </div>

            <a
                href="profil.html?id=${coiffeur.id}"
                class="btn btn-profil w-100"
            >
                Voir le profil
                <i class="bi bi-arrow-right"></i>
            </a>

        </div>

    </div>

</div>
`;
  });
  // console.log(htmlCartes);

  listeDesCoiffeurs.innerHTML = htmlCartes;
};
afficherCoiffeurs(coiffeurs);

recherche.addEventListener("click", (e) => {
  let texteTape = input.value.toLowerCase();
  // console.log(texteTape);

  let resultats = coiffeurs.filter(
    (coiffeur) =>
      coiffeur.nom.toLowerCase().includes(texteTape) ||
      coiffeur.specialite.toLowerCase().includes(texteTape),
  );

  if (resultats.length === 0) {
    listeDesCoiffeurs.innerHTML = "Aucun coiffeur trouvé !";
  } else {
    afficherCoiffeurs(resultats);
  }
});
