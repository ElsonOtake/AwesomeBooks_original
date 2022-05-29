import Books from './modules/books.js';
import { populateStorage, populateNewForm } from './modules/local_storage.js';
import dynamicLoad from './modules/list_books.js';
import { DateTime } from './modules/luxon.js';

const dateTime = document.querySelector('.date_time');
const menuList = document.querySelector('.menu_list');
const addNew = document.querySelector('.add_new');
const menuAddNew = document.querySelector('.menu_add_new');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const newBookBtn = document.querySelector('.new_book_btn');
const contact = document.querySelector('.contact');
const menuContact = document.querySelector('.menu_contact');

const awesome = new Books();

setInterval(() => {
  dateTime.innerText = DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
}, 1000);

newBookBtn.addEventListener('click', () => {
  awesome.add(inputTitle.value, inputAuthor.value);
  inputTitle.value = '';
  inputAuthor.value = '';
  populateStorage(inputTitle.value, inputAuthor.value);
});

inputTitle.addEventListener('input', () => populateStorage(inputTitle.value, inputAuthor.value));

inputAuthor.addEventListener('input', () => populateStorage(inputTitle.value, inputAuthor.value));

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

if (!localStorage.getItem('data')) {
  populateStorage(inputTitle.value, inputAuthor.value);
} else {
  [inputTitle.value, inputAuthor.value] = populateNewForm();
}

if (localStorage.getItem('classData')) {
  awesome.restoreStorage();
}

dynamicLoad(awesome);
