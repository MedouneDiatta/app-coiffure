// ===============================
// Récupération des réservations
// ===============================

const mesReservations =
  JSON.parse(localStorage.getItem("mesReservations")) || [];

const listeRendezVous = document.getElementById("listeRendezVous");

// Aucun rendez-vous

if (mesReservations.length === 0) {
  listeRendezVous.innerHTML = `

        <div class="text-center mt-5">

            <i class="bi bi-calendar-x"
               style="font-size:70px;color:#bdbdbd;"></i>

            <h4 class="mt-3">

                Aucun rendez-vous

            </h4>

            <p class="text-muted">

                Vous n'avez encore effectué aucune réservation.

            </p>

        </div>

    `;
}

// Sinon on les affiche
else {
  let cartes = "";

  mesReservations.forEach((rdv, index) => {
    let couleur = "";

    switch (rdv.statut) {
      case "Confirmé":
        couleur = "success";

        break;

      case "Annulé":
        couleur = "danger";

        break;

      default:
        couleur = "warning";
    }

    cartes += `

        <div class="card shadow-sm mb-4 border-0 rounded-4">

            <div class="card-body">

                <div class="d-flex justify-content-between">

                    <div>

                        <h5 class="fw-bold">

                            💈 ${rdv.coiffeur}

                        </h5>

                        <p class="mb-1">

                            ✂ ${rdv.prestation}

                        </p>

                        <p class="mb-1">

                            📅 ${rdv.date}

                        </p>

                        <p class="mb-1">

                            🕒 ${rdv.heure}

                        </p>

                        <p>

                            📍 ${rdv.lieu}

                        </p>

                    </div>

                    <span class="badge bg-${couleur} align-self-start">

                        ${rdv.statut}

                    </span>

                </div>

            </div>

        </div>

        `;
  });

  listeRendezVous.innerHTML = cartes;
}
