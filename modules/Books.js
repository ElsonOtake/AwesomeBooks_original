export default class Books {
  constructor() {
    this.books = [];
  }

  add(tit, aut) {
    this.books.push({ title: tit, author: aut });
    localStorage.setItem('classData', JSON.stringify(this.books));
  }

  remove(tit, aut) {
    this.books = this.books.filter((book) => {
      return ((book.title === tit) && (book.author === aut)) ? false : true;
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