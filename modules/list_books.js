function dynamicLoad(awesome) {
  const body = document.querySelector('body');
  (document.querySelector('.list')) && body.removeChild(document.querySelector('.list'));

  const list = document.createElement('div');
  list.className = 'list';
  const h1 = document.createElement('h1');
  h1.innerText = 'All awesome books';
  list.appendChild(h1);

  for (let i = 0; i < awesome.size(); i += 1) {
    const div = document.createElement('div');
    div.className = 'book_line';
    const p = document.createElement('p');
    p.className = 'book_detail';
    p.innerText = `"${awesome.nthTitle(i)}" by ${awesome.nthAuthor(i)}`;
    div.appendChild(p);
    const button = document.createElement('button');
    button.className = 'remove_btn';
    button.type = 'button';
    button.innerText = 'Remove';
    div.appendChild(button);
    list.appendChild(div);
  }
  const dateTime = document.querySelector('.date_time');
  dateTime.insertAdjacentElement('afterend', list);

  const removeButton = document.querySelectorAll('.remove_btn');

  removeButton.forEach((btn) => btn.addEventListener('click', (e) => {
    const titleByAuthor = e.target.previousSibling.innerText;
    const title = titleByAuthor.slice(1, titleByAuthor.lastIndexOf('" by '));
    const author = titleByAuthor.slice(titleByAuthor.lastIndexOf('" by ') + 5);
    awesome.remove(title, author);
    dynamicLoad(awesome);
  }));

  const menuList = document.querySelector('.menu_list');

  menuList.addEventListener('click', () => {
    dynamicLoad(awesome);
    menuList.classList.add('active');
    const addNew = document.querySelector('.add_new');
    addNew.classList.add('inactive');
    const menuAddNew = document.querySelector('.menu_add_new');
    menuAddNew.classList.remove('active');
    const contact = document.querySelector('.contact');
    contact.classList.add('inactive');
    const menuContact = document.querySelector('.menu_contact');
    menuContact.classList.remove('active');
  });
}

export { dynamicLoad };
