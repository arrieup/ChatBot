export function createCommandList(commands) {
  const container = document.createElement('div');
  container.className = 'command-list';

  const header = document.createElement('h3');
  header.innerText = 'Commandes';
  container.appendChild(header);

  const ul = document.createElement('ul');
  commands.forEach(command => {
    const li = document.createElement('li');
    li.innerText = command;
    ul.appendChild(li);
  });
  container.appendChild(ul);

  return container;
}
