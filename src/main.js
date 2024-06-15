import { createChatbot } from './components/chatbot.js';
import { createSidebar } from './components/sidebar.js';
import { createCommandList } from './components/commandList.js';
import { Message } from './models/Message.js';
import { getDefinitions, getSound, getSynonyms } from './services/dictionnary.js';
import { fetchRandomCardData } from './services/cards.js'
import { getNear, getPopulation } from './services/communes.js';


const sidebarItems = [
  { name: 'Dictionnary', icon: 'Dictionnary.png' },
  { name: 'Cards', icon: 'TCG.svg' },
  { name: 'Communes', icon: 'Communes.png' }
];

const messages = {
  Dictionnary: [],
  Cards: [],
  Communes: []
};

const app = document.getElementById('app');
window.onload = function () {
  Object.keys(messages).forEach(key => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      messages[key] = JSON.parse(storedData);
    }
  });
  selectChatbot(sidebarItems[0].name)
};

const commands = {
  Dictionnary: ['Def <word> will return the definitions from the dictionnary', 'Syn <word> will return the synonyms from the dictionnary', 'Snd <word> will return an audio of the pronunciation'],
  Cards: ['Random'],
  Communes: ['Pop <code> will return the number of habitants in the city corresponding to the city code']
};

let selectedChatbot;

function selectChatbot(name) {
  selectedChatbot = name;
  render();
}

async function handleMessage(message) {
  console.log(selectChatbot);
  const cmd = message.split(' ')[0].toUpperCase();
  const arg = message.split(' ')[1];
  console.log(arg)
  messages[selectedChatbot].push(new Message('User', message, 'text'));

  switch (selectedChatbot) {
    case 'Dictionnary':
      switch (cmd) {
        case 'DEFINE':
        case 'DEFINITION':
        case 'DEFINITIONS':
        case 'DEF': {
          try {
            let def = await getDefinitions(arg);
            messages[selectedChatbot].push(new Message('Bot', def, 'text'));
            render();
          } catch (error) {
            console.error('Error fetching definitions:', error);
          }
          break;
        }
        case 'SYNONYM':
        case 'SYNONYMS':
        case 'SYN': {
          try {
            let syn = await getSynonyms(arg);
            messages[selectedChatbot].push(new Message('Bot', syn, 'text'));
            render();
          } catch (error) {
            console.error('Error fetching synonyms:', error);
          }
          break;
        }
        case 'SND':
        case 'SOUNDS':
        case 'SOUND': {
          try {
            let sound = await getSound(arg);
            sound.forEach(snd => {
              messages[selectedChatbot].push(new Message('Bot', snd, 'audio'));
            })

            render();
          } catch (error) {
            console.error('Error fetching synonyms:', error);
          }
          break;
        }
        default:
          messages[selectedChatbot].push(new Message('Bot', "Command not recognized", 'text'));
          break;
      }
      break;
    case 'Cards':
      switch (cmd) {
        case 'RANDOM': {
          try {
            let url = await fetchRandomCardData();
            messages[selectedChatbot].push(new Message('Bot', url, 'image'));
            render();
          } catch (error) {
            console.error('Error fetching definitions:', error);
          }
          break;
        }
        default:
          messages[selectedChatbot].push(new Message('Bot', "Command not recognized", 'text'));
          break;
      }
      break;
    case 'Communes':
      switch (cmd) {
        case 'POPULATION':
        case 'POP': {
          try {
            let url = await getPopulation(arg);
            messages[selectedChatbot].push(new Message('Bot', url, 'text'));
            render();
          } catch (error) {
            console.error('Error fetching definitions:', error);
          }
          break;
        }
        case 'DISTANCE':
        case 'DIST': {
          try {
            let url = await getNear(arg,message.split(' ')[2] );
            messages[selectedChatbot].push(new Message('Bot', url, 'text'));
            render();
          } catch (error) {
            console.error('Error fetching definitions:', error);
          }
          break;
        }
        default:
          messages[selectedChatbot].push(new Message('Bot', "Command not recognized", 'text'));
          break;
      }
      break;
  }
  render();
}

function render() {
  app.innerHTML = '';
  app.appendChild(createSidebar(sidebarItems, selectChatbot));
  if (selectedChatbot) {
    app.appendChild(createChatbot(selectedChatbot, messages[selectedChatbot], handleMessage));
    app.appendChild(createCommandList(commands[selectedChatbot]));
  }
}

render();
