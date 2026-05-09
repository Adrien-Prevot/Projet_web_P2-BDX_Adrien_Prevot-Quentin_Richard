document.addEventListener('DOMContentLoaded', () => {
    const parametresUrl = new URLSearchParams(window.location.search);
    const filtreCategorie = parametresUrl.get('category');
    const grilleProduits = document.querySelector('.grilleProduits');
    const pagination = document.querySelector('.pagination');

    if (filtreCategorie && grilleProduits) {
        fetch('../json/articles.json')
            .then(reponse => reponse.json())
            .then(articles => {
                const articlesFiltres = articles.filter(a => a.categorie === filtreCategorie);

                grilleProduits.innerHTML = '';

                if (pagination) pagination.style.display = 'none';

                if (articlesFiltres.length > 0) {
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
                    grilleProduits.innerHTML = "<p>Aucun article trouvé dans cette catégorie.</p>";
                }
            })
            .catch(erreur => console.error("Erreur de chargement des articles:", erreur));
    }
});