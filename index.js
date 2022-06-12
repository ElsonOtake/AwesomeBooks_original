import { populateStorage, populateNewForm } from './modules/local_storage.js';
import dynamicLoad from './modules/list_books.js';
import { inputTitle, inputAuthor } from './modules/user_interface.js';
import Books from './modules/books.js';

const awesome = new Books();

if (!localStorage.getItem('books')) {
  populateStorage(inputTitle.value, inputAuthor.value);
} else {
  [inputTitle.value, inputAuthor.value] = populateNewForm();
}

if (localStorage.getItem('classBooks')) {
  awesome.restoreStorage();
}

dynamicLoad(awesome);
