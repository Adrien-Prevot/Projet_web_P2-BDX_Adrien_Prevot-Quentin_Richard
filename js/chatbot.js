document.addEventListener('DOMContentLoaded', () => {
    const contenuChat = document.getElementById('contenuChat');
    const listeQuestions = document.getElementById('listeQuestions');

    fetch('../json/faq.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const btn = document.createElement('button');
                btn.classList.add('boutonQuestionChat');
                btn.textContent = item.question;

                btn.addEventListener('click', () => {
                    addMessage(item.question, 'utilisateur');
                    setTimeout(() => {
                        addMessage(item.answer, 'robot');
                    }, 500);
                });

                listeQuestions.appendChild(btn);
            });
        })
        .catch(error => console.error('Erreur lors du chargement de la FAQ:', error));

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('messageChat', sender);
        messageDiv.textContent = text;
        contenuChat.appendChild(messageDiv);

        contenuChat.scrollTop = contenuChat.scrollHeight;
    }
});