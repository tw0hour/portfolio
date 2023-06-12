
function openPopup(contentUrl) {
    var popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling of background content

        fetch(contentUrl) // Replace with the actual path to your HTML page
            .then(response => response.text())
            .then(html => {
                var popupContent = popup.querySelector('#popup-html');
                if (popupContent) {
                    popupContent.innerHTML = html;
                }
            });
    }
}

function closePopup() {
    var popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling of background content
    }
}