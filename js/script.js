document.addEventListener('DOMContentLoaded', () => {
    // on check la categorie dans l'url
    const parametresUrl = new URLSearchParams(window.location.search);
    const filtreCategorie = parametresUrl.get('category');
    const grilleProduits = document.querySelector('.grilleProduits');
    const pagination = document.querySelector('.pagination');

    if (filtreCategorie && grilleProduits) {
        // on charge tout les articles
        fetch('../json/articles.json')
            .then(reponse => reponse.json())
            .then(articles => {
                // on garde que ce qui nous interesse
                const articlesFiltres = articles.filter(a => a.categorie === filtreCategorie);

                // on vide la grille avant de rajouter les nveaux trucs
                grilleProduits.innerHTML = '';

                // on vire la pagination pr l'instant
                if (pagination) pagination.style.display = 'none';

                if (articlesFiltres.length > 0) {
                    // on boucle et on injecte le html
                    articlesFiltres.forEach(article => {
                        const carte = `
                            <article class="carteProduit">
                                <a href="annonce.html?id=${article.id}" class="lienProduit">
                                    <div class="imageProduit">
                                        <img src="${article.image}" alt="${article.titre}">
                                    </div>
                                    <div class="infosProduit">
                                        <h3>${article.titre}</h3>
                                        <p class="prix">${article.prix}</p>
                                        <p class="description">${article.description}</p>
                                    </div>
                                </a>
                            </article>`;
                        grilleProduits.innerHTML += carte;
                    });
                } else {
                    // si ya rien a afficher
                    grilleProduits.innerHTML = "<p>Aucun article trouvé dans cette catégorie.</p>";
                }
            })
            .catch(erreur => console.error("Erreur de chargement des articles:", erreur));
    }
});