import React from 'react';

export const lang = {
  en: {
    add: 'Add',
    completed: 'Completed',
    searchPlaceholder: 'Search',
    showDone: 'Show done',
    checkAsDone: 'Check as Done',
    emptyList: 'Create or choose new category',
    title: 'Personal Organaizer',
    categoryInputPlaceholder: 'Enter category name',
    taskInputPlaceholder: 'Enter name for event',
    swichLang: 'Switch to Russian',
    save: 'Save changes',
    cancel: 'Cancel'
  },
  ru: {
    add: 'Добавить',
    completed: 'Выполнено',
    searchPlaceholder: 'Поиск',
    showDone: 'Показать выполненные',
    checkAsDone: 'Пометить как "Выполнено"',
    emptyList: 'Создайте или выберите категорию',
    title: 'Персональный органайзер',
    categoryInputPlaceholder: 'Введите имя категории',
    taskInputPlaceholder: 'Введите имя нового события',
    swichLang: 'Переключить на английский',
    save: 'Сохранить',
    cancel: 'Отменить'
  }
};

export const LangContext = React.createContext({
  lang: lang.ru,
  toggleLang: () => {}
});
