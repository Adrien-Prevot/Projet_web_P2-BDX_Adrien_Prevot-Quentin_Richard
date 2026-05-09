document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    const productGrid = document.querySelector('.product-grid');
    const pagination = document.querySelector('.pagination');

    if (categoryFilter && productGrid) {
        fetch('../json/articles.json')
            .then(response => response.json())
            .then(articles => {
                const filteredArticles = articles.filter(a => a.categorie === categoryFilter);

                productGrid.innerHTML = '';

                if (pagination) pagination.style.display = 'none';

                if (filteredArticles.length > 0) {
                    filteredArticles.forEach(article => {
                        const card = `
                            <article class="product-card">
                                <a href="annonce.html?id=${article.id}" class="product-link">
                                    <div class="product-image">
                                        <img src="${article.image}" alt="${article.titre}">
                                    </div>
                                    <div class="product-info">
                                        <h3>${article.titre}</h3>
                                        <p class="price">${article.prix}</p>
                                        <p class="description">${article.description}</p>
                                    </div>
                                </a>
                            </article>`;
                        productGrid.innerHTML += card;
                    });
                } else {
                    productGrid.innerHTML = "<p>Aucun article trouvé dans cette catégorie.</p>";
                }
            })
            .catch(error => console.error("Erreur de chargement des articles:", error));
    }
});