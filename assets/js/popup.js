function openPopup(contentUrl) {
    var popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';

        fetch(contentUrl)
            .then(response => response.text())
            .then(html => {
                var popupContent = popup.querySelector('#popup-html');
                if (popupContent) {
                    // Ajouter la pagination
                    var paginationContainer = document.createElement('div');
                    paginationContainer.id = 'pagination-container';

                    // Découper le contenu en pages
                    var pages = splitContentIntoPages(html, 800);

                    // Afficher la première page
                    showPage(popupContent, paginationContainer, pages, 0);

                    // Ajouter la pagination au popup
                    popupContent.appendChild(paginationContainer);
                }
            });
    }
    // ...
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




function splitContentIntoPages(content, pageSize) {
    var div = document.createElement('div');
    div.innerHTML = content;

    var children = div.children;
    var pages = [];

    var currentPage = document.createElement('div');
    currentPage.className = 'page';

    for (var i = 0; i < children.length; i++) {
        var child = children[i].cloneNode(true);
        currentPage.appendChild(child);

        if (currentPage.clientHeight > pageSize) {
            pages.push(currentPage.outerHTML);
            currentPage.innerHTML = '';
            currentPage.appendChild(child);
        }
    }

    if (currentPage.innerHTML.trim() !== '') {
        pages.push(currentPage.outerHTML);
    }

    return pages;
}

function showPage(container, paginationContainer, pages, pageIndex) {
    container.innerHTML = pages[pageIndex];

    // Effacer les anciens boutons de pagination
    paginationContainer.innerHTML = '';

    // Ajouter les boutons de pagination pour chaque page
    for (var i = 0; i < pages.length; i++) {
        var button = document.createElement('button');
        button.textContent = i + 1;
        button.addEventListener('click', function (index) {
            return function () {
                showPage(container, paginationContainer, pages, index);
            };
        }(i));
        paginationContainer.appendChild(button);
    }
}
