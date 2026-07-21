// ===============================
// Récupération de l'index
// ===============================

const params = new URLSearchParams(window.location.search);

const index = Number(params.get("index"));

// ===============================
// Récupération des réservations
// ===============================

const mesReservations =
  JSON.parse(localStorage.getItem("mesReservations")) || [];

// ===============================
// Rendez-vous sélectionné
// ===============================

const rendezVous = mesReservations[index];

const detailsRdv = document.getElementById("detailsRdv");

// ===============================
// Vérification
// ===============================

if (!rendezVous) {
  detailsRdv.innerHTML = `

        <div class="alert alert-danger">

            Ce rendez-vous est introuvable.

        </div>

    `;
} else {
  let couleur = "";

  switch (rendezVous.statut) {
    case "Confirmé":
      couleur = "success";
      break;

    case "Annulé":
      couleur = "danger";
      break;

    default:
      couleur = "warning";
  }

  detailsRdv.innerHTML = `

        <h3 class="fw-bold mb-4">

             ${rendezVous.coiffeur}

        </h3>

        <p>

            <strong>✂ Prestation :</strong>

            ${rendezVous.prestation}

        </p>

        <p>

            <strong> Date :</strong>

            ${rendezVous.date}

        </p>

        <p>

            <strong> Heure :</strong>

            ${rendezVous.heure}

        </p>

        <p>

            <strong> Lieu :</strong>

            ${rendezVous.lieu}

        </p>

        <p>

            <strong> Client :</strong>

            ${rendezVous.nom}

        </p>

        <p>

            <strong> Téléphone :</strong>

            ${rendezVous.telephone}

        </p>

        <p>

            <strong> Adresse :</strong>

            ${rendezVous.adresse}

        </p>

        <span class="badge bg-${couleur} fs-6">

            ${rendezVous.statut}

        </span>

        <div class="mt-4">

            <a
                href="mes-rendezvous.html"
                class="btn btn-success"
            >

                <i class="bi bi-arrow-left"></i>

                Retour

            </a>

        </div>

    `;
}
