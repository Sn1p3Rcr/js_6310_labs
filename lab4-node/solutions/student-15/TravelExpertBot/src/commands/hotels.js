import { openDb } from "../utils/db.js";
import { userStates } from "../state/userStates.js";

export const handleHotels = (bot, msg) => {
  const chatId = msg.chat.id;
  userStates[chatId] = { step: "askCountry", command: "hotels" };
  bot.sendMessage(chatId, "Введите страну, чтобы получить рекомендации по отелям:");
};

export const processHotelsStep = async (bot, msg) => {
  const chatId = msg.chat.id;
  const state = userStates[chatId];
  if (!state) return;

  const country = msg.text.trim().toLowerCase(); // приводим к нижнему регистру
  const db = await openDb();

  const hotelsAll = await db.all(`SELECT * FROM hotels`);
  const hotelsList = hotelsAll.filter(h => h.country.toLowerCase() === country)
    .sort((a, b) => a.price - b.price || b.rating - a.rating);

  if (!hotelsList || hotelsList.length === 0) {
    delete userStates[chatId]; // <-- добавляем здесь
    return bot.sendMessage(chatId, "Нет информации по отелям для этой страны.");
  }

  hotelsList.forEach(hotel => {
    bot.sendMessage(chatId,
      `${hotel.name}\n` +
      `Цена: ${hotel.price} USD\n` +
      `Рейтинг: ${hotel.rating}\n` +
      `Отзыв: ${hotel.review}`
    );
  });

  delete userStates[chatId];
};



