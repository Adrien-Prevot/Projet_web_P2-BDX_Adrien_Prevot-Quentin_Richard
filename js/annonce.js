// on prend l'id qui est dans l'url de la page
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

if (articleId) {
    // on appel le fichier json pour recuperer les datas
    fetch('../json/articles.json')
        .then(response => {
            if (!response.ok) throw new Error("Erreur");
            return response.json();
        })
        .then(articles => {
            // on verifie quel article correspond a notre id
            const articleChoisi = articles.find(article => article.id == articleId);

            if (articleChoisi) {
                // on rempli les champs de la page (titre, prix etc)
                // Remplacement des IDs avec tirets par les versions camelCase
                document.getElementById('titreAnnonce').textContent = articleChoisi.titre;
                document.getElementById('prixAnnonce').textContent = articleChoisi.prix;
                document.getElementById('descriptionAnnonce').textContent = articleChoisi.description;

                const imgElement = document.getElementById('imageAnnonce');
                imgElement.src = articleChoisi.image;
                imgElement.alt = articleChoisi.titre;
                imgElement.style.display = 'block';
            } else {
                document.getElementById('titreAnnonce').textContent = "Annonce introuvable.";
            }
        })
        .catch(() => {
            // si ya un beug avec le fetch
            document.getElementById('titreAnnonce').textContent = "Erreur de chargement.";
        });
} else {
    // au cas ou on arrive sur la page sans id
    document.getElementById('titreAnnonce').textContent = "Aucun article sélectionné.";
}