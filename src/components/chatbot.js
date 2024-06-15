import { createMessage } from "./message";

export function createChatbot(title, messages, sendMessageCallback) {
    const container = document.createElement('div');
    container.className = 'chatbot';
  
    const header = document.createElement('div');
    header.className = 'chat-header';
    header.innerText = title;
    container.appendChild(header);
  
    const messageContainer = document.createElement('div');
    messageContainer.className = 'chat-messages';
    messages.forEach(message => messageContainer.appendChild(createMessage(message)));
    container.appendChild(messageContainer);
  
    const inputContainer = document.createElement('div');
    inputContainer.className = 'chat-input';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Écrire un message...';
    input.addEventListener('keyup', (event) => {
      if (event.key === 'Enter' && input.value.trim() !== '') {
        sendMessageCallback(input.value);
        input.value = '';
      }
    });
    inputContainer.appendChild(input);
    container.appendChild(inputContainer);
    localStorage.setItem(title, JSON.stringify(messages))
    return container;
  }
  