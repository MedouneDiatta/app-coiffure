// Récupération de la réservation enregistrée

const reservation = JSON.parse(localStorage.getItem("reservation"));

const detailsReservation = document.getElementById("detailsReservation");

if (reservation) {
  detailsReservation.innerHTML = `

        <div class="detail-item">
            <strong>Coiffeur</strong>
            <span>${reservation.coiffeur}</span>
        </div>

        <div class="detail-item">
            <strong>Spécialité</strong>
            <span>${reservation.specialite}</span>
        </div>

        <div class="detail-item">
            <strong>Prestation</strong>
            <span>${reservation.prestation}</span>
        </div>

        <div class="detail-item">
            <strong>Date</strong>
            <span>${reservation.date}</span>
        </div>

        <div class="detail-item">
            <strong>Heure</strong>
            <span>${reservation.heure}</span>
        </div>

        <div class="detail-item">
            <strong>Lieu</strong>
            <span>${reservation.lieu}</span>
        </div>

        <div class="detail-item">
            <strong>Statut</strong>
            <span style="color:#f59e0b;font-weight:600;">
                En attente de confirmation
            </span>
        </div>

    `;
} else {
  detailsReservation.innerHTML = `

        <p style="color:red;">

            Aucune réservation trouvée.

        </p>

    `;
}
