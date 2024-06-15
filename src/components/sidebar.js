export function createSidebar(items, selectItemCallback) {
    const container = document.createElement('div');
    container.className = 'sidebar';
  
    const ul = document.createElement('ul');
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<img src="./src/public/${item.icon}" alt="icon" /> ${item.name}`;
      li.addEventListener('click', () => selectItemCallback(item.name));
      ul.appendChild(li);
    });
    container.appendChild(ul);
  
    return container;
  }
  