export function createMessage(msg) {
    const messageElem = document.createElement('div');
    messageElem.className = 'message ' + msg.sender;
    switch (msg.type) {
        case 'text':{
            const messageContent = document.createElement('p');
            messageContent.className = 'messageContent'
            messageContent.innerText = msg.text;
            messageElem.appendChild(messageContent);
            break;
        }
        case 'audio': {
            const messageContent = document.createElement('audio');
            messageContent.setAttribute("controls","controls");
            const source = document.createElement('source');
            source.src=msg.text;
            messageContent.appendChild(source);
            messageElem.appendChild(messageContent);
            break;
        }
        case 'image': {
            const messageContent = document.createElement('img');
            messageContent.src = msg.text;
    
            messageContent.className = 'messageContent'
            messageElem.appendChild(messageContent);
            break;
        }
        default:
            break;

    }
    const messageTimestamp = document.createElement('div');
    messageTimestamp.className = 'timestamp';
    const date = new Date(msg.timestamp);
    const hours = ('0' + date.getUTCHours()).slice(-2);
    const minutes = ('0' + date.getUTCMinutes()).slice(-2);
    const seconds = ('0' + date.getUTCSeconds()).slice(-2);
    const time = `${hours}:${minutes}:${seconds}`;
    const formattedDate = ` ${date.toDateString()} ${time}`;
    messageTimestamp.innerText = formattedDate;
    messageElem.appendChild(messageTimestamp);
    return messageElem;
}