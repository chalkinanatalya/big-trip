import { POINTS_TYPES } from '../const.js';
import { getRandomElement, getRandomElements, getRandomInteger } from '../utils.js';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

const generateDate = () => {

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').format('DD/MM/YYYY');
};


const Destinations = [
  {
    id: 1,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building'
      },

      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163318',
        description: 'Chamonix river'
      },

      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163319',
        description: 'Chamonix park'
      }
    ]
  },

  {
    id: 2,
    description: 'Amsterdam, is a beautiful city, a true pearl, with crowded streets.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163310',
        description: 'Chamonix parliament building'
      },

      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163311',
        description: 'Chamonix river'
      },

      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163312',
        description: 'Chamonix park'
      }
    ]
  },

  {
    id: 3,
    description: 'Geneva, is a beautiful city, a true pearl, with crowded streets.',
    name: 'Geneva',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163314',
        description: 'Chamonix parliament building'
      },

      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163315',
        description: 'Chamonix river'
      },

      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163316',
        description: 'Chamonix park'
      }
    ]
  },
];

const Offers = [
  {
    id: 1,
    title: 'Upgrade to a business class',
    price: 120
  },

  {
    id: 2,
    title: 'Add luggage',
    price: 12
  },

  {
    id: 3,
    title: 'Order Uber',
    price: 50
  },

  {
    id: 4,
    title: 'Book tickets',
    price: 20,
  }
];

export const OffersByType = {
  type: getRandomElement(POINTS_TYPES),
  offers: getRandomElements(Offers, Math.floor(Math.random() * (Offers.length - 1)))
};

export const generatePoint = () => ({
  basePrice: Math.floor(Math.random() * 999),
  dateFrom: generateDate(),
  dateTo: generateDate(),
  destination: (getRandomElement(Destinations)),
  id: nanoid(),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: getRandomElements((Offers).map((offer) => offer.title), 2),
  type: getRandomElement(POINTS_TYPES)
}
);
