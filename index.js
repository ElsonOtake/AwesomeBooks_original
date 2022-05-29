import Books from "./modules/Books.js";

const body = document.querySelector('body');
const dateTime = document.querySelector('.date_time');
const menuList = document.querySelector('.menu_list');
const addNew = document.querySelector('.add_new');
const menuAddNew = document.querySelector('.menu_add_new');
const inputTitle = document.getElementById('title');
const inputName = document.getElementById('name');
const newBookBtn = document.querySelector('.new_book_btn');
const contact = document.querySelector('.contact');
const menuContact = document.querySelector('.menu_contact');

const formStorage = {
  title: '',
  author: '',
};

const awesome = new Books();

function populateStorage() {
  formStorage.title = inputTitle.value;
  formStorage.author = inputName.value;
  const storeData = JSON.stringify(formStorage);
  localStorage.setItem('data', storeData);
}

function dynamicLoad() {
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
  dateTime.insertAdjacentElement('afterend', list);
  const removeButton = document.querySelectorAll('.remove_btn');

  removeButton.forEach((btn) => btn.addEventListener('click', (e) => {
    const titleByAuthor = e.target.previousSibling.innerText;
    const title = titleByAuthor.slice(1, titleByAuthor.lastIndexOf('" by '));
    const author = titleByAuthor.slice(titleByAuthor.lastIndexOf('" by ') + 5);
    awesome.remove(title, author);
    dynamicLoad();
  }));

  menuList.addEventListener('click', () => {
    dynamicLoad();
    menuList.classList.add('active');
    addNew.classList.add('inactive');
    menuAddNew.classList.remove('active');
    contact.classList.add('inactive');
    menuContact.classList.remove('active');
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
}

inputTitle.addEventListener('input', () => populateStorage());

inputName.addEventListener('input', () => populateStorage());

menuAddNew.addEventListener('click', () => {
  const list = document.querySelector('.list');
  list.classList.add('inactive');
  menuList.classList.remove('active');
  addNew.classList.remove('inactive');
  menuAddNew.classList.add('active');
  contact.classList.add('inactive');
  menuContact.classList.remove('active');
});

menuContact.addEventListener('click', () => {
  const list = document.querySelector('.list');
  list.classList.add('inactive');
  menuList.classList.remove('active');
  addNew.classList.add('inactive');
  menuAddNew.classList.remove('active');
  contact.classList.remove('inactive');
  menuContact.classList.add('active');
});

(!localStorage.getItem('data')) ? populateStorage() : populateNewForm();

(localStorage.getItem('classData')) && awesome.restoreStorage();

dynamicLoad();

import { DateTime } from "./modules/luxon.js";
setInterval(() => dateTime.innerText = DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS), 1000);
