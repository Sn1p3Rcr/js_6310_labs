import { openDb } from '../utils/db.js';
import { userStates } from '../state/userStates.js';

export async function handleFindTour(bot, msg) {
  const chatId = msg.chat.id;

  userStates[chatId] = {
    command: "find_tour",
    step: "askBudget",
    data: {}
  };

  bot.sendMessage(chatId, "Введите ваш бюджет на тур (USD):");
}

export async function processFindTourStep(bot, msg) {
  const chatId = msg.chat.id;
  const text = msg.text.trim();
  const state = userStates[chatId];
  if (!state) return;

  const db = await openDb();

  switch (state.step) {

  case "askBudget": {
    const budget = parseInt(text);
    if (isNaN(budget)) return bot.sendMessage(chatId, "Введите число!");
    state.data.budget = budget;
    state.step = "askType";
    return bot.sendMessage(chatId, "Выберите тип отдыха: пляжный, экскурсионный, горнолыжный");
  }

  case "askType": {
    const type = text.toLowerCase();
    if (!["пляжный", "экскурсионный", "горнолыжный"].includes(type)) {
      return bot.sendMessage(chatId, "Выберите один из типов: пляжный, экскурсионный, горнолыжный");
    }
    state.data.type = type;
    state.step = "askCountry";
    return bot.sendMessage(chatId, "Введите страну, куда хотите поехать:");
  }

  case "askCountry": {
    state.data.country = text.toLowerCase(); // приводим к нижнему регистру
    state.step = "askStartDate";
    return bot.sendMessage(chatId, "Введите дату начала поездки (дд.мм.гггг):");
  }

  case "askStartDate": {
    const parts = text.split('.');
    if (parts.length !== 3) return bot.sendMessage(chatId, "Неверный формат. Используйте дд.мм.гггг");

    const [day, month, year] = parts.map(Number);
    const userStartDate = `${year.toString().padStart(4,'0')}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;

    // Получаем все туры по бюджету и типу
    const toursAll = await db.all(
      `SELECT * FROM tours WHERE budget <= ? AND type = ?`,
      [state.data.budget, state.data.type]
    );

    // Фильтруем по стране и дате начала в JS
    const tours = toursAll.filter(tour =>
      tour.country.toLowerCase() === state.data.country &&
        tour.startDate >= userStartDate
    );

    if (!tours || tours.length === 0) {
      bot.sendMessage(chatId, "Нет туров по вашему запросу.");
    } else {
      for (const tour of tours) {
        await bot.sendPhoto(chatId, tour.photo, {
          caption: `${tour.name}\n${tour.description}\nЦена: ${tour.budget} USD\nДаты: ${tour.startDate} – ${tour.endDate}`
        });
      }
    }

    delete userStates[chatId];
    break;
  }

  default:
    bot.sendMessage(chatId, "Произошла ошибка. Попробуйте снова /find_tour");
    delete userStates[chatId];
  }
}






