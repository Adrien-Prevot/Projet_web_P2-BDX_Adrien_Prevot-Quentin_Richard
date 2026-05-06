document.addEventListener('DOMContentLoaded', () => {
    const chatContent = document.getElementById('chat-content');
    const questionList = document.getElementById('question-list');

    // Chargement des questions depuis le fichier JSON
    fetch('../json/faq.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const btn = document.createElement('button');
                btn.classList.add('chat-question-btn');
                btn.textContent = item.question;

                btn.addEventListener('click', () => {
                    addMessage(item.question, 'user');
                    setTimeout(() => {
                        addMessage(item.answer, 'bot');
                    }, 500);
                });

                questionList.appendChild(btn);
            });
        })
        .catch(error => console.error('Erreur lors du chargement de la FAQ:', error));

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender);
        messageDiv.textContent = text;
        chatContent.appendChild(messageDiv);

        // Scroll automatique vers le bas
        chatContent.scrollTop = chatContent.scrollHeight;
    }
});