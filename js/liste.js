const listeDesCoiffeurs = document.getElementById("liste-coiffeurs");
const input = document.getElementById("cherche");
const recherche = document.getElementById("btn");

const afficherCoiffeurs = (tableauCoiffeurs) => {
  let htmlCartes = "";
  tableauCoiffeurs.forEach((coiffeur) => {
    //   console.log(coiffeur.nom);
    let prestation = Object.keys(coiffeur.prestations);
    htmlCartes += `
    <div class="col-12 col-md-6 col-lg-4">
       <div class="card carte-coiffeur mb-3">
           <div class="card-body">
           <h4>Nom : ${coiffeur.nom}</h4>
           <p>Spécialité : ${coiffeur.specialite}</p>
           <p>Note : ${coiffeur.note}</p>
           <p>A Domicil :${coiffeur.aDomicile ? "Oui" : "Non"}</p>
           <p>Prestations :${coiffeur.prestations[prestation[0]]} FCFA</p>
           <a href="profil.html?id=${coiffeur.id}" class="btn btn-primary">Voir le Profil</a>
        </div>
       
       </div>  
    </div>

  `;
  });
  listeDesCoiffeurs.innerHTML = htmlCartes;
};
afficherCoiffeurs(coiffeurs);

recherche.addEventListener("click", (e) => {
  let texteTape = input.value.toLowerCase();
  console.log(texteTape);

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
