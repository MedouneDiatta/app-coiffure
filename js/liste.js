const listeDesCoiffeurs = document.getElementById("liste-coiffeurs");
const input = document.getElementById("cherche");
const recherche = document.getElementById("btn");

const afficherCoiffeurs = (tableauCoiffeurs) => {
  let htmlCartes = "";
  tableauCoiffeurs.forEach((coiffeur) => {
    let prestation = Object.keys(coiffeur.prestations);

    htmlCartes += `
    <div class="col-6 col-md-4 mb-4">
        <div class="card h-100 shadow-sm p-3">

            <img
                src="${coiffeur.photo}"
                alt="${coiffeur.nom}"
                class="rounded-circle mx-auto d-block mb-3"
                style="width:120px; height:120px; object-fit:cover;"
            >

            <div class="card-body text-center">

                <h4 class="card-title">${coiffeur.nom}</h4>

                <p class="card-text mb-1">
                   <i class="bi bi-scissors"></i>
                   <strong>Spécialité :</strong> ${coiffeur.specialite}
                </p>

                <p class="card-text mb-1">
                    <i class="bi bi-star-fill text-warning"></i>
                    <strong>Note :</strong> ${coiffeur.note}
                </p>

                <p class="card-text mb-1">
                    <i class="bi bi-house-door-fill"></i>
                   <strong>À domicile :</strong>
                   ${coiffeur.aDomicile ? "Oui" : "Non"}
                </p>

                <p class="card-text mb-3">
                    <strong>${prestation[0]} :</strong>
                    ${coiffeur.prestations[prestation[0]]} FCFA
                </p>

              <a href="profil.html?id=${coiffeur.id}" class="btn btn-primary">
                  <i class="bi bi-person-circle"></i>
                  Voir
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
