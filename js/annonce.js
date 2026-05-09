const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

if (articleId) {
    fetch('../json/articles.json')
        .then(response => {
            if (!response.ok) throw new Error("Erreur");
            return response.json();
        })
        .then(articles => {
            const articleChoisi = articles.find(article => article.id == articleId);

            if (articleChoisi) {
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
            document.getElementById('titreAnnonce').textContent = "Erreur de chargement.";
        });
} else {
    document.getElementById('titreAnnonce').textContent = "Aucun article sélectionné.";
}