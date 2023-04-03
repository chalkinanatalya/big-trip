import { filter } from '../utils/filter.js';
export const generateFilter = (pointsList) => Object.entries(filter).map(
  ([filterName, filterPoints]) => ({
    name: filterName,
    points: filterPoints(pointsList),
  }),
);
