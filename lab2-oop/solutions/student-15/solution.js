'use strict'

// ===== ЗАДАНИЕ 1: Базовый класс Vehicle =====
class Vehicle {
    // Создайте базовый класс Vehicle.
    // В конструкторе принимайте и сохраняйте в this свойства: 
    // make (марка), model (модель), year (год выпуска).
    static vehicleCount = 0;

       constructor(make, model, year) {
        // Проверка параметров
        if (!make || !model || year === undefined) {
            throw new Error('Обязательные параметры: make, model, year');
        }
        if (typeof make !== 'string' || typeof model !== 'string') {
            throw new Error('Make и model должны быть строками');
        }
        if (typeof year !== 'number' || year < 1885) {
            throw new Error('Год должен быть числом после 1884');
        }
        const curYear = new Date().getFullYear();
        if (year > curYear) {
            throw new Error('Год выпуска не может быть больше текущего');
        }

        // Все проверки пройдены — создаем объект
        this.make = make;
        this.model = model;
        this._year = year;

        Vehicle.vehicleCount++;
        }   

    // Добавьте метод displayInfo(), который выводит в консоль информацию 
    // о транспортном средстве в формате: "Марка: [make], Модель: [model], Год: [year]".
    displayInfo() {
        // ..
        console.log(`Марка: ${this.make}, Модель: ${this.model}, Год: ${this.year}`);
    }

    // Добавьте геттер age, который возвращает возраст транспортного средства 
    // (текущий год минус год выпуска). Используйте new Date().getFullYear().
    get age() {
        // ..
        const curYear = new Date().getFullYear();
        return curYear - this.year;
    }

    // Добавьте сеттер для года выпуска с проверкой: год не может быть больше текущего.
    set year(newYear) {
        // ..
        const curYear = new Date().getFullYear();
        if (newYear > curYear) {
            throw new Error("Год выпуска не может быть больше текущего");
        }
        this._year = newYear;
    }

    get year() {
        return this._year;
    }

    // Добавьте статический метод compareAge(vehicle1, vehicle2), 
    // который возвращает разницу в возрасте между двумя транспортными средствами.
    static compareAge(vehicle1, vehicle2) {
        // ..
        return Math.abs(vehicle1.age - vehicle2.age);
    }

    static getTotalVehicles() {
        return this.vehicleCount;
    }
}

// ===== ЗАДАНИЕ 2: Класс Car (наследуется от Vehicle) =====
class Car extends Vehicle {
    // Создайте дочерний класс Car, который наследуется от Vehicle.
    // Добавьте новое свойство numDoors (количество дверей).
       constructor(make, model, year, numDoors = 4) {
        // Проверка количества дверей до вызова super
        if (typeof numDoors !== 'number' || numDoors < 1 || numDoors > 7) {
            throw new Error('Количество дверей должно быть числом от 1 до 7');
        }

        super(make, model, year); // Vehicle создается только если базовые параметры валидны
        this.numDoors = numDoors;
    }

    // Переопределите метод displayInfo() так, чтобы он также выводил количество дверей. 
    // Используйте super.displayInfo() для вызова метода родителя.
    displayInfo() {
        // ..
        super.displayInfo();
        console.log(`Двери: ${this.numDoors}`);
    }

    // Добавьте метод honk(), который выводит "Beep beep!".
    honk() {
        // ..
        console.log("Beep beep!");
    }
}

// ===== ЗАДАНИЕ 3: Класс ElectricCar (наследуется от Car) =====
class ElectricCar extends Car {
    // Создайте дочерний класс ElectricCar, который наследуется от Car.
    // Добавьте новое свойство batteryCapacity (емкость батареи в кВт·ч).
      constructor(make, model, year, numDoors = 4, batteryCapacity) {
        // Проверка количества дверей
        if (typeof numDoors !== 'number' || numDoors < 1 || numDoors > 7) {
            throw new Error('Количество дверей должно быть числом от 1 до 7');
        }

        // Проверка базовых параметров Vehicle
        if (!make || !model || year === undefined) {
            throw new Error('Обязательные параметры: make, model, year');
        }
        if (typeof make !== 'string' || typeof model !== 'string') {
            throw new Error('Make и model должны быть строками');
        }
        if (typeof year !== 'number' || year < 1885) {
            throw new Error('Год должен быть числом после 1884');
        }
        const curYear = new Date().getFullYear();
        if (year > curYear) {
            throw new Error('Год выпуска не может быть больше текущего');
        }

        // Проверка батареи
        if (batteryCapacity === undefined) {
            throw new Error('Для ElectricCar обязателен параметр batteryCapacity');
        }
        if (typeof batteryCapacity !== 'number' || batteryCapacity <= 0) {
            throw new Error('Емкость батареи должна быть положительным числом');
        }

        // Все проверки пройдены
        super(make, model, year, numDoors);
        this.batteryCapacity = batteryCapacity;
    }

    // Переопределите метод displayInfo() для вывода дополнительной информации о батарее.
    displayInfo() {
        // ..
        super.displayInfo();
        console.log(`Ёмкость батареи: ${this.batteryCapacity} кВт·ч`);
    }

    // Добавьте метод calculateRange(), который рассчитывает примерный запас хода 
    // (предположим, что 1 кВт·ч = 6 км).
    calculateRange() {
        // ..
        return this.batteryCapacity * 6;
    }
}

// ===== ЗАДАНИЕ 4: Каррирование =====

// Создайте функцию createVehicleFactory, которая возвращает функцию 
// для создания транспортных средств определенного типа (каррирование).
const createVehicleFactory = (vehicleType) => (...args) => {
    try {
        return new vehicleType(...args);
    } catch (error) {
        throw new Error(`Ошибка создания ${vehicleType.name}: ${error.message}`);
    }
};

// ===== ЗАДАНИЕ 5: Статические методы и свойства =====

// Добавьте статическое свойство vehicleCount в класс Vehicle 
// для подсчета количества созданных транспортных средств.
// Модифицируйте конструктор Vehicle для увеличения счетчика
// (добавьте в начало конструктора: Vehicle.vehicleCount++);
// Создайте статический метод getTotalVehicles(), 
// который возвращает общее количество созданных транспортных средств.

// Автоматические тесты
function runTests() {
    Vehicle.vehicleCount = 0;

    function testThrowsError(func, expectedMessage) {
        try {
            func();
            console.error(`Ожидалось исключение: "${expectedMessage}", но его не было`);
            return false;
        } catch (e) {
            if (e.message !== expectedMessage) {
                console.error(`Ожидалось: "${expectedMessage}", но получено: "${e.message}"`);
                return false;
            }
            return true;
        }
    }

    console.log('Запуск тестов...');

    // Расширьте тесты для полного покрытия задания.
    
    console.log('=== Тест 1: Базовый класс Vehicle ===');
    const vehicle = new Vehicle('Toyota', 'Camry', 2015);
    vehicle.displayInfo();
    console.log(`Возраст: ${vehicle.age} лет`);
    console.assert(vehicle.make === 'Toyota', 'Тест марки провален');
    console.assert(vehicle.model === 'Camry', 'Тест модели провален');
    console.assert(vehicle.year === 2015, 'Тест года провален');
    console.assert(vehicle.age === (new Date().getFullYear() - 2015), 'Тест возраста провален');
    console.assert(testThrowsError(() => new Vehicle(12, 'Camry', 2015), "Make и model должны быть строками"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Vehicle('Toyota', 1234, 2015), "Make и model должны быть строками"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Vehicle('Toyota', 'Camry'), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Vehicle('Toyota', 2015), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Vehicle('Camry', 2015), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Vehicle('Toyota'), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Vehicle('Camry'), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Vehicle(2015), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Vehicle('Toyota', 'Camry', 2026), "Год выпуска не может быть больше текущего"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Vehicle('Toyota', 'Camry', 1884), "Год должен быть числом после 1884"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Vehicle('Toyota', 'Camry', 'две тысячи седьмой'), "Год должен быть числом после 1884"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => vehicle.year = 2026, "Год выпуска не может быть больше текущего"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    vehicle.year = 2016;
    console.assert(vehicle.year === 2016, 'Тест изменения года провален');
    console.log('Тест 1 пройден! ✅');

    console.log('=== Тест 2: Класс Car ===');
    const car = new Car('Honda', 'Civic', 2018, 4);
    car.displayInfo();
    console.assert(car.numDoors === 4, 'Тест количества дверей провален');
    car.honk();
    console.assert(car instanceof Vehicle, 'Тест наследования Vehicle провален');
    console.assert(testThrowsError(() => new Car('Honda', 'Civic', 2018, 0), "Количество дверей должно быть числом от 1 до 7"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Car('Honda', 'Civic', 2018, 8), "Количество дверей должно быть числом от 1 до 7"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(car.make === 'Honda', 'Тест марки провален');
    console.assert(car.model === 'Civic', 'Тест модели провален');
    console.assert(car.year === 2018, 'Тест года провален');
    console.assert(car.age === (new Date().getFullYear() - 2018), 'Тест возраста провален');
    console.assert(testThrowsError(() => new Car(12, 'Civic', 2018), "Make и model должны быть строками"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Car('Honda', 1234, 2018), "Make и model должны быть строками"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Car('Honda', 'Civic'), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Car('Honda', 2018), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Car('Civic', 2018), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Car('Honda'), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Car('Civic'), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Car(2015), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Car('Honda', 'Civic', 2026), "Год выпуска не может быть больше текущего"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Car('Honda', 'Civic', 1884), "Год должен быть числом после 1884"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new Car('Honda', 'Civic', 'две тысячи седьмой'), "Год должен быть числом после 1884"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => car.year = 2026, "Год выпуска не может быть больше текущего"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    car.year = 2019;
    console.assert(car.year === 2019, 'Тест изменения года провален');
    console.log('Тест 2 пройден! ✅');

    console.log('=== Тест 3: Класс ElectricCar ===');
    const electricCar = new ElectricCar('Tesla', 'Model 3', 2020, 4, 75);
    console.assert(electricCar instanceof Car, 'Тест наследования Car провален');
    console.assert(electricCar instanceof Vehicle, 'Тест наследования Vehicle провален');
    console.assert(electricCar.batteryCapacity === 75, 'Тест емкости батареи провален');
    console.assert(electricCar.calculateRange() === 450, 'Тест запаса хода провален');
    electricCar.displayInfo();
    console.log(`Запас хода: ${electricCar.calculateRange()} км`);
    console.assert(testThrowsError(() => new ElectricCar('Tesla', 'Model 3', 2020, 0), "Количество дверей должно быть числом от 1 до 7"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new ElectricCar('Tesla', 'Model 3', 2020, 8), "Количество дверей должно быть числом от 1 до 7"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(electricCar.make === 'Tesla', 'Тест марки провален');
    console.assert(electricCar.model === 'Model 3', 'Тест модели провален');
    console.assert(electricCar.year === 2020, 'Тест года провален');
    console.assert(electricCar.age === (new Date().getFullYear() - 2020), 'Тест возраста провален');
    console.assert(testThrowsError(() => new ElectricCar(12, 'Model 3', 2020), "Make и model должны быть строками"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new ElectricCar('Tesla', 1234, 2020), "Make и model должны быть строками"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new ElectricCar('Tesla', 'Model 3'), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new ElectricCar('Tesla', 2020), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new ElectricCar('Model 3', 2020), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new ElectricCar('Tesla'), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new ElectricCar('Model 3'), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new ElectricCar(2020), "Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new ElectricCar('Teslaa', 'Model 3', 2026), "Год выпуска не может быть больше текущего"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new ElectricCar('Tesla', 'Model 3', 1884), "Год должен быть числом после 1884"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new ElectricCar('Tesla', 'Model 3', 2020, 4), "Для ElectricCar обязателен параметр batteryCapacity"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new ElectricCar('Tesla', 'Model 3', 2020, 4, -10), "Емкость батареи должна быть положительным числом"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new ElectricCar('Tesla', 'Model 3', 2020, 4, 'большая'), "Емкость батареи должна быть положительным числом"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => new ElectricCar('Tesla', 'Model 3', 'две тысячи седьмой'), "Год должен быть числом после 1884"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => electricCar.year = 2026, "Год выпуска не может быть больше текущего"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    electricCar.year = 2021;
    console.assert(electricCar.year === 2021, 'Тест изменения года провален');
    console.log('Тест 3 пройден! ✅');

    console.log('=== Тест 4: Статические методы ===');
    const initialCount = Vehicle.getTotalVehicles();
    const newVehicle = new Vehicle('Test', 'Test', 2020);
    console.assert(Vehicle.getTotalVehicles() === initialCount + 1, 'Тест счетчика провален');
    console.log('Тест 4 пройден! ✅');

    console.log('=== Тест 5: Сравнение возраста ===');
    const oldVehicle = new Vehicle('Old', 'Car', 2000);
    const newVehicle2 = new Vehicle('New', 'Car', 2020);
    const ageDiff = Vehicle.compareAge(oldVehicle, newVehicle2);
    console.assert(ageDiff === 20, 'Тест сравнения возраста провален');
    console.log('Тест 5 пройден! ✅');

    console.log('=== Тест 6: Фабрика Car ===');
    const createCarFactory = createVehicleFactory(Car);
    const myNewCar = createCarFactory('BMW', 'X5', 2022, 4);
    console.log('Создан новый автомобиль:');
    myNewCar.displayInfo();
    console.assert(myNewCar instanceof Car, 'Тест фабрики провален');
    console.assert(myNewCar instanceof Vehicle, 'Тест наследования Vehicle провален');
    console.assert(myNewCar.make === 'BMW', 'Тест фабрики (марка) провален');
    console.assert(myNewCar.model === 'X5', 'Тест фабрики (модель) провален');
    console.assert(myNewCar.year === 2022, 'Тест фабрики (год) провален');
    console.assert(myNewCar.numDoors === 4, 'Тест фабрики (количество дверей) провален');
    console.assert(myNewCar.age === (new Date().getFullYear() - 2022), 'Тест возраста провален');
    console.assert(testThrowsError(() => createCarFactory(12, 'Civic', 2018), "Ошибка создания Car: Make и model должны быть строками"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createCarFactory('Honda', 1234, 2018), "Ошибка создания Car: Make и model должны быть строками"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createCarFactory('Honda', 'Civic'), "Ошибка создания Car: Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createCarFactory('Honda', 2018), "Ошибка создания Car: Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createCarFactory('Civic', 2018), "Ошибка создания Car: Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createCarFactory('Honda'), "Ошибка создания Car: Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createCarFactory('Civic'), "Ошибка создания Car: Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createCarFactory(2015), "Ошибка создания Car: Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createCarFactory('Honda', 'Civic', 2026), "Ошибка создания Car: Год выпуска не может быть больше текущего"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createCarFactory('Honda', 'Civic', 1884), "Ошибка создания Car: Год должен быть числом после 1884"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createCarFactory('Honda', 'Civic', 'две тысячи седьмой'), "Ошибка создания Car: Год должен быть числом после 1884"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => myNewCar.year = 2026, "Год выпуска не может быть больше текущего"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    myNewCar.year = 2023;
    console.assert(myNewCar.year === 2023, 'Тест изменения года провален');
    console.log('Тест 6 пройден! ✅');

    console.log('=== Тест 7: Фабрика ElectricCar ===');
    const createElectricCarFactory = createVehicleFactory(ElectricCar);
    const myElectricCar = createElectricCarFactory('Nissan', 'Leaf', 2021, 4, 40);
    console.assert(myElectricCar instanceof ElectricCar, 'Тест фабрики ElectricCar провален');
    console.assert(myElectricCar instanceof Car, 'Тест наследования Car провален');
    console.assert(myElectricCar instanceof Vehicle, 'Тест наследования Vehicle провален');
    console.assert(myElectricCar.make === 'Nissan', 'Тест фабрики (марка) провален');
    console.assert(myElectricCar.model === 'Leaf', 'Тест фабрики (модель) провален');
    console.assert(myElectricCar.year === 2021, 'Тест фабрики (год) провален');
    console.assert(myElectricCar.numDoors === 4, 'Тест фабрики (количество дверей) провален');
    console.assert(myElectricCar.batteryCapacity === 40, 'Тест фабрики (емкость батареи) провален');
    console.assert(myElectricCar.calculateRange() === 240, 'Тест фабрики (запас хода) провален');
    console.assert(myElectricCar.age === (new Date().getFullYear() - 2021), 'Тест возраста провален');
    console.assert(testThrowsError(() => createElectricCarFactory(12, 'Model 3', 2020), "Ошибка создания ElectricCar: Make и model должны быть строками"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createElectricCarFactory('Tesla', 1234, 2020), "Ошибка создания ElectricCar: Make и model должны быть строками"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createElectricCarFactory('Tesla', 'Model 3'), "Ошибка создания ElectricCar: Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createElectricCarFactory('Tesla', 2020), "Ошибка создания ElectricCar: Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createElectricCarFactory('Model 3', 2020), "Ошибка создания ElectricCar: Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createElectricCarFactory('Tesla'), "Ошибка создания ElectricCar: Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createElectricCarFactory('Model 3'), "Ошибка создания ElectricCar: Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createElectricCarFactory(2020), "Ошибка создания ElectricCar: Обязательные параметры: make, model, year"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createElectricCarFactory('Teslaa', 'Model 3', 2026), "Ошибка создания ElectricCar: Год выпуска не может быть больше текущего"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createElectricCarFactory('Tesla', 'Model 3', 1884), "Ошибка создания ElectricCar: Год должен быть числом после 1884"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createElectricCarFactory('Tesla', 'Model 3', 2020, 4), "Ошибка создания ElectricCar: Для ElectricCar обязателен параметр batteryCapacity"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createElectricCarFactory('Tesla', 'Model 3', 2020, 4, -10), "Ошибка создания ElectricCar: Емкость батареи должна быть положительным числом"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createElectricCarFactory('Tesla', 'Model 3', 2020, 4, 'большая'), "Ошибка создания ElectricCar: Емкость батареи должна быть положительным числом"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => createElectricCarFactory('Tesla', 'Model 3', 'две тысячи седьмой'), "Ошибка создания ElectricCar: Год должен быть числом после 1884"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    console.assert(testThrowsError(() => myElectricCar.year = 2026, "Год выпуска не может быть больше текущего"), 
    "Тест на обработку исключений (невалидные входные данные) провален");
    myElectricCar.year = 2023;
    console.assert(myElectricCar.year === 2023, 'Тест изменения года провален');
    console.log('Тест 7 пройден! ✅');

    console.log('Всего создано транспортных средств:', Vehicle.getTotalVehicles());
    console.assert(Vehicle.vehicleCount === 8, "Тест vehicleCount провален.");

    console.log('Все тесты пройдены! ✅');
}

runTests();
