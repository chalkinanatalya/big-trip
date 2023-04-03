import { FilterType } from '../const';
import { isPointPast, isPointFuture, isPointPresent } from '../utils/utils';

export const filter = {
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point.dateFrom)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom)),
  [FilterType.EVERYTHING]: (points) => points,
};
