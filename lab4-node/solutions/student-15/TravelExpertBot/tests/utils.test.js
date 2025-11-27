/* eslint-env jest */
import { describe, test, expect, beforeAll, beforeEach, afterAll, jest } from '@jest/globals';
import * as dbUtils from '../src/utils/db.js';
import { handleFindTour, processFindTourStep } from '../src/commands/findTour.js';
import { handleHotels, processHotelsStep } from '../src/commands/hotels.js';
import { handleVisaInfo, processVisaStep } from '../src/commands/visaInfo.js';
import { userStates } from '../src/state/userStates.js';

const mockBot = {
  sendMessage: jest.fn(),
  sendPhoto: jest.fn()
};

describe('TravelExpert Bot Commands', () => {
  beforeAll(async () => {
    await dbUtils.initDb();
  });

  afterAll(async () => {
    const db = await dbUtils.openDb();
    await db.close();
  });

  beforeEach(() => {
    mockBot.sendMessage.mockClear();
    mockBot.sendPhoto.mockClear();
  });

  // --- findTour workflow ---
  test('findTour workflow completes successfully', async () => {
    const chatId = 1;
    handleFindTour(mockBot, { chat: { id: chatId }, text: '500' });
    expect(mockBot.sendMessage).toHaveBeenLastCalledWith(chatId, 'Введите ваш бюджет на тур (USD):');

    userStates[chatId].step = 'askType';
    await processFindTourStep(mockBot, { chat: { id: chatId }, text: 'пляжный' });
    expect(mockBot.sendMessage).toHaveBeenLastCalledWith(chatId, 'Введите страну, куда хотите поехать:');

    userStates[chatId].step = 'askCountry';
    await processFindTourStep(mockBot, { chat: { id: chatId }, text: 'египет' });
    expect(mockBot.sendMessage).toHaveBeenLastCalledWith(chatId, 'Введите дату начала поездки (дд.мм.гггг):');

    userStates[chatId].step = 'askStartDate';
    await processFindTourStep(mockBot, { chat: { id: chatId }, text: '01.12.2025' });
    expect(userStates[chatId]).toBeUndefined();
    expect(mockBot.sendPhoto).not.toHaveBeenCalled();
  });

  test('findTour handles invalid budget', async () => {
    const chatId = 6;
    handleFindTour(mockBot, { chat: { id: chatId }, text: '500' });
    userStates[chatId].step = 'askBudget';
    await processFindTourStep(mockBot, { chat: { id: chatId }, text: 'abc' });
    expect(mockBot.sendMessage).toHaveBeenCalledWith(chatId, 'Введите число!');
    expect(userStates[chatId]).toBeDefined();
  });

  test('findTour handles invalid type', async () => {
    const chatId = 7;
    handleFindTour(mockBot, { chat: { id: chatId }, text: '500' });
    userStates[chatId].step = 'askType';
    await processFindTourStep(mockBot, { chat: { id: chatId }, text: 'пляжно' });
    expect(mockBot.sendMessage).toHaveBeenCalledWith(chatId, 'Выберите один из типов: пляжный, экскурсионный, горнолыжный');
    expect(userStates[chatId]).toBeDefined();
  });

  test('findTour handles invalid date format', async () => {
    const chatId = 8;
    handleFindTour(mockBot, { chat: { id: chatId }, text: '500' });
    userStates[chatId].step = 'askType';
    userStates[chatId].data.type = 'пляжный';
    userStates[chatId].step = 'askCountry';
    userStates[chatId].data.country = 'египет';
    userStates[chatId].step = 'askStartDate';
    await processFindTourStep(mockBot, { chat: { id: chatId }, text: '2025/12/01' });
    expect(mockBot.sendMessage).toHaveBeenCalledWith(chatId, 'Неверный формат. Используйте дд.мм.гггг');
    expect(userStates[chatId]).toBeDefined();
  });

  test('findTour default case triggers error message', async () => {
    const chatId = 11;
    userStates[chatId] = { step: 'unknownStep', command: 'find_tour' };

    await processFindTourStep(mockBot, { chat: { id: chatId }, text: 'тест' });

    expect(mockBot.sendMessage).toHaveBeenCalledWith(chatId, 'Произошла ошибка. Попробуйте снова /find_tour');
    expect(userStates[chatId]).toBeUndefined();
  });

  test('findTour sends photo when tours found', async () => {
    const chatId = 9;

    // Устанавливаем state так, чтобы фильтр нашёл тур
    userStates[chatId] = {
      command: 'find_tour',
      step: 'askStartDate',
      data: {
        budget: 1000,             // больше чем цена тура
        type: 'экскурсионный',
        country: 'италия'         // строго в нижнем регистре
      }
    };

    // Дата, совпадающая с туром 'Экскурсии по Венеции'
    await processFindTourStep(mockBot, { chat: { id: chatId }, text: '03.12.2025' });

    // Проверяем, что фото отправлено и сессия завершена
    expect(mockBot.sendPhoto).toHaveBeenCalled();
    expect(userStates[chatId]).toBeUndefined();
  });





  // --- hotels workflow ---
  test('hotels workflow completes successfully', async () => {
    const chatId = 2;
    handleHotels(mockBot, { chat: { id: chatId }, text: 'Италия' });
    await processHotelsStep(mockBot, { chat: { id: chatId }, text: 'Италия' });
    expect(mockBot.sendMessage).toHaveBeenCalled();
    expect(userStates[chatId]).toBeUndefined();
  });

  test('hotels workflow handles unknown country', async () => {
    const chatId = 3;
    handleHotels(mockBot, { chat: { id: chatId }, text: 'Нигерия' });
    await processHotelsStep(mockBot, { chat: { id: chatId }, text: 'Нигерия' });
    expect(mockBot.sendMessage).toHaveBeenLastCalledWith(chatId, 'Нет информации по отелям для этой страны.');
    expect(userStates[chatId]).toBeUndefined();
  });

  test('hotels workflow handles empty input', async () => {
    const chatId = 9;
    handleHotels(mockBot, { chat: { id: chatId }, text: '' });
    await processHotelsStep(mockBot, { chat: { id: chatId }, text: '' });
    expect(mockBot.sendMessage).toHaveBeenCalled();
    expect(userStates[chatId]).toBeUndefined();
  });

  // --- visaInfo workflow ---
  test('visaInfo workflow completes successfully', async () => {
    const chatId = 4;
    handleVisaInfo(mockBot, { chat: { id: chatId }, text: 'Египет' });
    await processVisaStep(mockBot, { chat: { id: chatId }, text: 'Египет' });
    expect(mockBot.sendMessage).toHaveBeenCalled();
    expect(userStates[chatId]).toBeUndefined();
  });

  test('visaInfo workflow handles unknown country', async () => {
    const chatId = 5;
    handleVisaInfo(mockBot, { chat: { id: chatId }, text: 'Нигерия' });
    await processVisaStep(mockBot, { chat: { id: chatId }, text: 'Нигерия' });
    expect(mockBot.sendMessage).toHaveBeenLastCalledWith(chatId, 'Информация о визе для этой страны отсутствует.');
    expect(userStates[chatId]).toBeUndefined();
  });

  test('visaInfo workflow handles empty input', async () => {
    const chatId = 10;
    handleVisaInfo(mockBot, { chat: { id: chatId }, text: '' });
    await processVisaStep(mockBot, { chat: { id: chatId }, text: '' });
    expect(mockBot.sendMessage).toHaveBeenCalled();
    expect(userStates[chatId]).toBeUndefined();
  });
});
