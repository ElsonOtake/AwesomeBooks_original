const inputTitle = document.getElementById('title');
const inputName = document.getElementById('name');
const body = document.querySelector('body');
const newBookBtn = document.querySelector('.new_book_btn');
const menuList = document.querySelector('.menu_list');
const menuAddNew = document.querySelector('.menu_add_new');
const menuContact = document.querySelector('.menu_contact');
const contact = document.querySelector('.contact');
const addNew = document.querySelector('.add_new');
const dateTime = document.querySelector('.date_time');

const formStorage = {
  title: '',
  author: '',
};

class Books {
  constructor() {
    this.books = [];
  }

  add(tit, aut) {
    this.books.push({ title: tit, author: aut });
    localStorage.setItem('classData', JSON.stringify(this.books));
  }

  remove(tit, aut) {
    this.books = this.books.filter(book => {
      if ((book.title === tit) && (book.author === aut)) {
        return false;
      } else {
        return true;
      }
    });
    localStorage.setItem('classData', JSON.stringify(this.books));
  }

  size() {
    return this.books.length;
  }

  nthTitle(num) {
    return this.books[num].title;
  }

  nthAuthor(num) {
    return this.books[num].author;
  }

  restoreStorage() {
    this.books = JSON.parse(localStorage.getItem('classData'));
    
  }
}

const awesome = new Books();

function populateStorage() {
  formStorage.title = inputTitle.value;
  formStorage.author = inputName.value;
  const storeData = JSON.stringify(formStorage);
  localStorage.setItem('data', storeData);
}

function dynamicLoad() {

  if (document.querySelector('.list')) {
    body.removeChild(document.querySelector('.list'));
  }

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
  dateTime.insertAdjacentElement('afterend', list);
  const removeButton = document.querySelectorAll('.remove_btn');

  removeButton.forEach((btn) => btn.addEventListener('click', e => {
    let titleByAuthor = e.target.previousSibling.innerText;
    let title = titleByAuthor.slice(1, titleByAuthor.indexOf('" by '));
    let author = titleByAuthor.slice(titleByAuthor.indexOf('" by ') + 5);
    awesome.remove(title, author);
    dynamicLoad();
  }));

  menuList.addEventListener('click', () => {
    if (!menuList.classList.contains('active')) {
      menuList.classList.add('active');
    }
    menuAddNew.classList.remove('active');
    menuContact.classList.remove('active');
    dynamicLoad();
    if (!addNew.classList.contains('inactive')) {
      addNew.classList.add('inactive');
    }
    if (!contact.classList.contains('inactive')) {
      contact.classList.add('inactive');
    }
  });
}

newBookBtn.addEventListener('click', () => {
  awesome.add(inputTitle.value, inputName.value);
  inputTitle.value = '';
  inputName.value = '';
  populateStorage();
});

function populateNewForm() {
  const storeData = JSON.parse(localStorage.getItem('data'));
  inputTitle.value = storeData.title;
  inputName.value = storeData.author;
  // awesome.books = currentBook.list;
}

inputTitle.addEventListener('input', () => populateStorage());

inputName.addEventListener('input', () => populateStorage());

menuAddNew.addEventListener('click', () => {
  if (!menuAddNew.classList.contains('active')) {
    menuAddNew.classList.add('active');
  }
  menuList.classList.remove('active');
  menuContact.classList.remove('active');
  const bookWrapper = document.querySelector('.list');
  addNew.classList.remove('inactive');

  if (!contact.classList.contains('inactive')) {
    contact.classList.add('inactive');
  }
  if (!bookWrapper.classList.contains('inactive')) {
    bookWrapper.classList.add('inactive');
  }
});

menuContact.addEventListener('click', () => {
  if (!menuContact.classList.contains('active')) {
    menuContact.classList.add('active');
  }
  menuList.classList.remove('active');
  menuAddNew.classList.remove('active');
  const bookWrapper = document.querySelector('.list');
  contact.classList.remove('inactive');
  if (!addNew.classList.contains('inactive')) {
    addNew.classList.add('inactive');
  }
  if (!bookWrapper.classList.contains('inactive')) {
    bookWrapper.classList.add('inactive');
  }
});

if (!localStorage.getItem('data')) {
  populateStorage();
} else {
  populateNewForm();
}

if (localStorage.getItem('classData')) {
  awesome.restoreStorage();
}

dynamicLoad();

dateTime.innerHTML = new Date();
// setInterval(() => dateTime.innerText = new Date(), 1000);