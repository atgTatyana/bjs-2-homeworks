// Задача 1. Форматтер чисел
function parseCount(count) {
  let numberGoods = Number.parseFloat(count);
	if (!numberGoods) {
		throw new Error('Невалидное значение');
	}
	return numberGoods;
}

function validateCount(count) {
	try {
		return parseCount(count);
	} catch(error) {
		return error;
	}
}

// Задача 2. Треугольник
class Triangle {
	constructor(a, b, c) {
		this.a = a;
		this.b = b;
		this.c = c;
		if (a + b <= c || b + c <= a || a + c <= b) {
			throw new Error('Треугольник с такими сторонами не существует');
		}
	}

	get perimeter() {
		return this.a + this.b + this.c;
	}
	
	get area() {
		let p = this.perimeter / 2;
		return Number(Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c)).toFixed(3));
	}
}

function getTriangle(a, b, c) {
	try {
		return new Triangle(a, b, c);
	} catch(error) {
		return {
			get area() {
				return 'Ошибка! Треугольник не существует';
			},
			get perimeter() {
				return 'Ошибка! Треугольник не существует';
			}
		}
	}
}