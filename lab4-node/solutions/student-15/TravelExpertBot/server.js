import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

import { initDb } from './src/utils/db.js';
import { handleFindTour, processFindTourStep } from './src/commands/findTour.js';
import { handleVisaInfo, processVisaStep } from './src/commands/visaInfo.js';
import { handleHotels, processHotelsStep } from './src/commands/hotels.js';
import { userStates } from './src/state/userStates.js';

const runServer = async () => {
  dotenv.config();
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("Установите TELEGRAM_BOT_TOKEN в .env");

  await initDb(); // инициализация базы

  const bot = new TelegramBot(token, { polling: true });

  // Стартовая команда
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я бот TravelExpert, помогу подобрать туры, отели и визовую информацию.');
  });

  // Обработчики команд
  bot.onText(/\/find_tour/, (msg) => handleFindTour(bot, msg));
  bot.onText(/\/visa_info/, (msg) => handleVisaInfo(bot, msg));
  bot.onText(/\/hotels/, (msg) => handleHotels(bot, msg));

  // Общий обработчик текстовых сообщений
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.text.startsWith("/")) return; // пропускаем команды

    const state = userStates[chatId];
    if (!state) return; // если пользователь не в процессе, ничего не делаем

    // Вызываем соответствующий обработчик по команде
    switch (state.command) {
    case "find_tour":
      processFindTourStep(bot, msg);
      break;
    case "visa_info":
      processVisaStep(bot, msg);
      break;
    case "hotels":
      processHotelsStep(bot, msg);
      break;
    default:
      bot.sendMessage(chatId, "Произошла ошибка. Попробуйте снова.");
      delete userStates[chatId];
    }
  });

  console.log('TravelExpert Bot запущен...');
};

export default runServer;

