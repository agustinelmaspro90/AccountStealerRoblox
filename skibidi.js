const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

const webhookUrl = 'https://discord.com/api/webhooks/1341474454294757541/x7FuzlVnlknPs7zRj2m2XxaLb2jNPKemI5BQqtbtGUJGE7z78_ktiidyTx75cqupMgYB';

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        sendDiscordWebhook(message);
        messageInput.value = '';
    }
}

function sendDiscordWebhook(message) {
    const payload = {
        content: message
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            displayMessage(message);
        } else {
            console.error('Error al enviar el mensaje a través del webhook de Discord:', response.status);
        }
    })
    .catch(error => {
        console.error('Error al enviar el mensaje a través del webhook de Discord:', error);
    });
}

function displayMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
