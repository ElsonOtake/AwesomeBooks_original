export const formStorage = {
  title: '',
  author: '',
};

export function populateStorage(title, author) {
  // formStorage.title = inputTitle.value;
  // formStorage.author = inputName.value;
  formStorage.title = title;
  formStorage.author = author;
  const storeData = JSON.stringify(formStorage);
  localStorage.setItem('data', storeData);
}

export function populateNewForm() {
  const storeData = JSON.parse(localStorage.getItem('data'));
  return [storeData.title, storeData.author];
  // inputTitle.value = storeData.title;
  // inputName.value = storeData.author;
}

