import dayjs from 'dayjs';

export const getRandomElements = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export const getRandomElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * (arr.length - 1));
  const item = arr[randomIndex];

  return item;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('D MMMM');

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

//points filter

export const isPointPast = (date) => dayjs(date).isBefore(dayjs());
export const isPointFuture = (date) => dayjs(date).isAfter(dayjs());
export const isPointPresent = (date) => dayjs(date).isSame(dayjs(), 'day');

