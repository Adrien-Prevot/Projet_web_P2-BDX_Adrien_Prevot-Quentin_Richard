document.addEventListener('DOMContentLoaded', () => {
    // on attend que la page soit prete
    const contenuChat = document.getElementById('contenuChat');
    const listeQuestions = document.getElementById('listeQuestions');

    // on recup les questions de la faq
    fetch('../json/faq.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                // on creer un bouton pour chaque question
                const btn = document.createElement('button');
                btn.classList.add('boutonQuestionChat');
                btn.textContent = item.question;

                btn.addEventListener('click', () => {
                    addMessage(item.question, 'utilisateur');

                    // petite pause pour faire genre le bot reflechi
                    setTimeout(() => {
                        addMessage(item.answer, 'robot');
                    }, 500);
                });

                listeQuestions.appendChild(btn);
            });
        })
        .catch(error => console.error('Erreur lors du chargement de la FAQ:', error));

    // fonction pour afficher les bulles de chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('messageChat', sender);
        messageDiv.textContent = text;
        contenuChat.appendChild(messageDiv);

        // on descend tout en bas pour voir le dernier msg
        contenuChat.scrollTop = contenuChat.scrollHeight;
    }
});