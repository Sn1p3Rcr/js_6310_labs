import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
  return open({
    filename: "./travel.db",
    driver: sqlite3.Database
  });
}

export async function initDb() {
  const db = await openDb();

  // Таблица туров
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tours (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      type TEXT,
      budget INTEGER,
      description TEXT,
      photo TEXT,
      country TEXT,
      startDate TEXT,
      endDate TEXT
    );
  `);

  // Таблица отелей
  await db.exec(`
    CREATE TABLE IF NOT EXISTS hotels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country TEXT,
      name TEXT,
      price INTEGER,
      rating REAL,
      review TEXT
    );
  `);

  // Таблица визовой информации
  await db.exec(`
    CREATE TABLE IF NOT EXISTS visaInfo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country TEXT,
      requirements TEXT,
      documents TEXT,
      contacts TEXT
    );
  `);

  // Очистка старых данных
  await db.run(`DELETE FROM tours;`);
  await db.run(`DELETE FROM hotels;`);
  await db.run(`DELETE FROM visaInfo;`);

  // Тестовые туры
  await db.run(`
    INSERT INTO tours (name,type,budget,description,photo,country,startDate,endDate) VALUES 
    ('Пляжный Тур в Египет','пляжный',500,'7 дней на море','https://i.pinimg.com/736x/dc/b7/52/dcb752e10ba77b27e95216471f5d3a4d.jpg','Египет','2025-12-01','2025-12-07'),
    ('Экскурсии по Италии 1','экскурсионный',800,'10 дней, Рим','https://avatars.mds.yandex.net/i?id=9c154bf2559f9b68107862d8c256d044_l-4026925-images-thumbs&n=13','Италия','2025-12-05','2025-12-15'),
    ('Экскурсии по Италии 2','экскурсионный',900,'11 дней, Венеция','https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1300/v1646709887/ynznbqyqwihzvunmjtbl.jpg','Италия','2025-12-03','2025-12-17'),
    ('Горнолыжный тур Италия','горнолыжный',1200,'7 дней на склонах','https://avatars.mds.yandex.net/i?id=0c295dea2d6f55dca918c98f2158a07ddf7eef2a-9209611-images-thumbs&n=13','Италия','2025-12-10','2025-12-17'),
    ('Горнолыжный тур Испания','горнолыжный',1100,'Сноуборд в Пиренеях','https://avatars.mds.yandex.net/i?id=ab970441e0e4449672889a058ff46a3052711180-8428027-images-thumbs&n=13','Испания','2025-12-08','2025-12-15'),
    ('Горнолыжный тур Испания 2','горнолыжный',1300,'Катание на лыжах','https://avatars.mds.yandex.net/i?id=b1e44b01eba39ce64f55748df52a541e_l-4120553-images-thumbs&n=13','Испания','2025-12-12','2025-12-19'),
    ('Пляжный тур Испания','пляжный',700,'Море и солнце','https://cdnstatic.rg.ru/uploads/images/188/94/20/iStock-506989266.jpg','Испания','2025-12-05','2025-12-12'),
    ('Пляжный тур Египет 2','пляжный',600,'Отдых на Красном море','https://i.pinimg.com/originals/f8/45/cd/f845cddf199914aec9fe3c0804daf42a.jpg','Египет','2025-12-15','2025-12-22'),
    ('Экскурсионный тур Франция','экскурсионный',950,'Париж и Лувр','https://avatars.mds.yandex.net/i?id=efa174eff61b6e1576a0e7a37bb2498c_l-4076747-images-thumbs&n=13','Франция','2025-12-07','2025-12-14');
  `);

  // Тестовые отели
  await db.run(`
    INSERT INTO hotels (country,name,price,rating,review) VALUES 
    ('Египет','Sunny Beach',100,4.5,'Отличный сервис!'),
    ('Италия','Rome Central',200,4.6,'В центре Рима, удобно'),
    ('Италия','Venice Grand',180,4.7,'Рядом с площадью Сан-Марко'),
    ('Испания','Barcelona Beach',220,4.8,'Красивый вид на море')
  `);

  // Визовая информация
  await db.run(`
    INSERT INTO visaInfo (country,requirements,documents,contacts) VALUES 
    ('Египет','Туристическая виза для граждан РФ','паспорт, анкета','+20123456789'),
    ('Италия','Шенгенская виза','паспорт, анкета, фото','+3901234567'),
    ('США','Виза B1/B2','паспорт, грин-карта','+152'),
    ('Испания','Шенгенская виза','паспорт, анкета, фото','+34912345678'),
    ('Франция','Шенгенская виза','паспорт, анкета, фото','+33123456789')
  `);

  console.log("База данных инициализирована с тестовыми данными.");
}



