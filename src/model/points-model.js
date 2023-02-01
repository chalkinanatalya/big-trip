import { generatePoint } from '../mock/data.js';

const POINT_COUNTER = 6;

export default class PointsModel {
  points = Array.from({length: POINT_COUNTER}, generatePoint);

  getPoints = () => this.points;
}
