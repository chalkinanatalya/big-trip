export const getRandomElements = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export const getRandomElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * (arr.length - 1));
  const item = arr[randomIndex];

  return item;
}

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('D MMMM');
