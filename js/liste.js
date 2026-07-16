const listeDesCoiffeurs = document.getElementById("liste-coiffeurs");
const input = document.getElementById("cherche");
const recherche = document.getElementById("btn");

const afficherCoiffeurs = (tableauCoiffeurs) => {
  let htmlCartes = "";
  tableauCoiffeurs.forEach((coiffeur) => {
    let prestation = Object.keys(coiffeur.prestations);

    htmlCartes += `

<!-- ==========================
        Carte Coiffeur
=========================== -->

<div class="col-12 col-md-6 col-lg-4 mb-4">

    <div class="card carte-coiffeur">

        <!-- Photo du coiffeur -->

        <div class="photo-container">

            <img
                src="${coiffeur.photo}"
                alt="${coiffeur.nom}"
                class="photo-coiffeur"
            >

            <!-- Bouton Favori -->

            <button class="btn-favori">

                <i class="bi bi-heart"></i>

            </button>

        </div>

        <div class="card-body">

            <!-- Note + disponibilité -->

            <div class="ligne-badges">

                <span class="badge-note">

                    <i class="bi bi-star-fill"></i>

                    ${coiffeur.note}

                </span>

                <span class="badge-dispo">

                    <i class="bi bi-circle-fill"></i>

                    Disponible

                </span>

            </div>

            <!-- Nom -->

            <h4 class="nom-coiffeur">

                ${coiffeur.nom}

            </h4>

            <!-- Spécialité -->

            <p class="specialite">

                ${coiffeur.specialite}

            </p>

            <!-- Quartier -->

            <p class="info">

                <i class="bi bi-geo-alt-fill"></i>

                ${coiffeur.zoneQuartier}

            </p>

            <!-- Domicile -->

            <p class="info">

                <i class="bi bi-house-door-fill"></i>

                ${
                  coiffeur.aDomicile ? "Service à domicile" : "Salon uniquement"
                }

            </p>

            <!-- Prix -->

            <div class="bloc-prix">

                <small>À partir de</small>

                <h3>

                    ${coiffeur.prestations[prestation[0]]} FCFA

                </h3>

            </div>

            <!-- Bouton -->

            <a
                href="profil.html?id=${coiffeur.id}"
                class="btn btn-profil"
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
