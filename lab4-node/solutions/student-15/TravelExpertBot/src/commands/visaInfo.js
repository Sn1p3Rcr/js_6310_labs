import { openDb } from "../utils/db.js";
import { userStates } from "../state/userStates.js";

export const handleVisaInfo = (bot, msg) => {
  const chatId = msg.chat.id;
  userStates[chatId] = { step: "askCountry", command: "visa_info" };
  bot.sendMessage(chatId, "Введите страну, для которой нужна информация о визе:");
};

export const processVisaStep = async (bot, msg) => {
  const chatId = msg.chat.id;
  const state = userStates[chatId];
  if (!state) return;

  const country = msg.text.trim().toLowerCase();
  const db = await openDb();

  const infoAll = await db.all(`SELECT * FROM visaInfo`);
  const info = infoAll.find(i => i.country.toLowerCase() === country);

  if (!info) {
    delete userStates[chatId]; 
    return bot.sendMessage(chatId, "Информация о визе для этой страны отсутствует.");
  }

  bot.sendMessage(chatId,
    `Визовые требования:\n${info.requirements}\n\n` +
    `Необходимые документы:\n${info.documents}\n\n` +
    `Контакты визовых центров:\n${info.contacts}`
  );

  delete userStates[chatId];
};




