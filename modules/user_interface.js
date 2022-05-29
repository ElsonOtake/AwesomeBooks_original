import { populateStorage } from "./local_storage.js";
import { awesome } from "../index.js";

const newBookBtn = document.querySelector('.new_book_btn');
const menuList = document.querySelector('.menu_list');
const addNew = document.querySelector('.add_new');
const menuAddNew = document.querySelector('.menu_add_new');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const contact = document.querySelector('.contact');
const menuContact = document.querySelector('.menu_contact');

newBookBtn.addEventListener('click', () => {
  const inputTitle = document.getElementById('title');
  const inputAuthor = document.getElementById('author');
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

export { menuList, addNew, menuAddNew, inputTitle, inputAuthor, contact, menuContact };