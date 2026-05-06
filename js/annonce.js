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
                document.getElementById('titre-annonce').textContent = articleChoisi.titre;
                document.getElementById('prix-annonce').textContent = articleChoisi.prix;
                document.getElementById('description-annonce').textContent = articleChoisi.description;

                const imgElement = document.getElementById('image-annonce');
                imgElement.src = articleChoisi.image;
                imgElement.alt = articleChoisi.titre;
                imgElement.style.display = 'block';
            } else {
                document.getElementById('titre-annonce').textContent = "Annonce introuvable.";
            }
        })
        .catch(() => {
            document.getElementById('titre-annonce').textContent = "Erreur de chargement.";
        });
} else {
    document.getElementById('titre-annonce').textContent = "Aucun article sélectionné.";
}