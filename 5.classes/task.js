// Задача 1. Печатное издание
class PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		this.name = name;
		this.releaseDate = releaseDate;
		this.pagesCount = pagesCount;
		this.state = 100;					// идет в сеттер, запишет _state: 100, свойства state не будет
		this.type = null;
	}

	fix() {
		// идет в геттер, возвращает _state, *1.5, идет в сеттер, запишет _state: результат switch case
		this.state *= 1.5;			
	}

	set state(state) {
		switch (true) {
			case state < 0:
				this._state = 0;
				break;
			case state > 100:
				this._state = 100;
				break;
			default:
				this._state = state;
				break;
		}
	}

	get state() {
		return this._state;
	}
}

class Magazine extends PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.type = "magazine";
	}
}

class Book extends PrintEditionItem {
	constructor(author, name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.author = author;
		this.type = "book";
	}
}

class NovelBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "novel";
	}
}

class FantasticBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "fantastic";
	}
}

class DetectiveBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "detective";
	}
}

// Задача 2. Библиотека.
class Library {
	constructor(name) {
		this.name = name;
		this.books = [];
	}

	addBook(book) {
		// здесь this это library
		if (book.state > 30) {			// идет в геттер, вернет _state, потом сравнивает
			this.books.push(book);
		}
	}

	findBookBy(type, value) {
		let findResult = this.books.find(book => book[type] === value);
		return findResult || null;
	}

	giveBookByName(bookName) {
		const findResult = this.books.find(book => book.name === bookName);
		this.books = this.books.filter(book => book.name !== bookName);
		return findResult || null;
	}
}

const library = new Library("Библиотека имени Ленина");
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));
const givenBook = library.giveBookByName("Машина времени");
givenBook.state = 55;        // повредить выданную книгу
givenBook.fix();   		      // починить выданную книгу
library.addBook(givenBook);      // вернуть книгу в библиотеку

// Задача 3. Журнал успеваемости
class Student {
	constructor(name) {
		this.name = name;
		this.marks = {};
	}

	addMark(mark, subject) {
		if (mark < 2 || mark > 5) {
			return;
		}
		if (!(subject in this.marks)) {			// если нет свойства в объекте
			this.marks[subject] = [];
		}
		this.marks[subject].push(mark);
	}

	getAverageBySubject(subject) {
		if (!(subject in this.marks)) {
			return 0;
		}
		return this.marks[subject].reduce((sum, mark) => sum + mark) / this.marks[subject].length;
	}

	getAverage() {
		let arrayKeys = Object.keys(this.marks);
		if (arrayKeys.length === 0) {					// проверка, что не пустой объект оценок
			return 0;
		}
		let summ = arrayKeys.reduce((sum, subject) => sum + this.getAverageBySubject(subject), 0);
		return summ / arrayKeys.length;
	}
}