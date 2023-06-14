function openPopup(contentUrl) {
    var popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Empêche le défilement du contenu arrière-plan

        fetch(contentUrl) // Remplacez par le chemin réel vers votre page HTML
            .then(response => response.text())
            .then(html => {
                var popupContent = popup.querySelector('#popup-html');
                if (popupContent) {
                    popupContent.innerHTML = html;
                }
            });
    }
    // Add a small delay before setting the outside click event
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
