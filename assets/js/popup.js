function openPopup(contentUrl) {
    var popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Empêche le défilement du contenu arrière-plan

        fetch(contentUrl)
    .then(response => response.text())
    .then(html => {
        var popupContent = popup.querySelector('#popup-content');
        if (popupContent) {
            popupContent.innerHTML = html;
            // Ajuster la taille de la popup en fonction de la taille de la fenêtre du navigateur
            popupContent.style.maxHeight = window.innerHeight + 'px';
            // Faites défiler vers le haut de la popup
            popupContent.scrollIntoView();
        }
    });

    }
    // Ajoutez un léger délai avant de définir l'événement de clic en dehors
    setTimeout(function() {
        document.addEventListener('click', outsideClickHandler);
    }, 100);
}


function closePopup() {
    var popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Rétablit le défilement du contenu arrière-plan
        document.removeEventListener('click', outsideClickHandler);
    }
}

function outsideClickHandler(event) {
    var popup = document.getElementById('popup');
    var popupContent = document.getElementById('popup-content');

    if (popup && popupContent && !popupContent.contains(event.target)) {
        closePopup();
    }
}
