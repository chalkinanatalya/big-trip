import { FilterType } from '../../const.js';
import AbstractView from '../../framework/view/abstract-view.js';

const createFilterTemplate = (filterType) => (
  `<div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
          <div class="trip-filters__filter">
            <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything"
            ${filterType === FilterType.EVERYTHING ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
          </div>

          <div class="trip-filters__filter">
            <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future"
            ${filterType === FilterType.FUTURE ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-future">Future</label>
          </div>

          <div class="trip-filters__filter">
            <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present"
            ${filterType === FilterType.PRESENT ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-present">Present</label>
          </div>

          <div class="trip-filters__filter">
            <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past"
            ${filterType === FilterType.PAST ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-past">Past</label>
          </div>

          <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
</div>`
);

export default class FilterView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createFilterTemplate(this.#filterType);
  }

  setFilterEverythingClickHandler = (callback) => {
    this._callback.filterEverything = callback;
    this.element.querySelector('#filter-everything').addEventListener('click', this.#filterEverythingHandler);
  };

  setFilterFutureClickHandler = (callback) => {
    this._callback.filterFuture = callback;
    this.element.querySelector('#filter-future').addEventListener('click', this.#filterFutureHandler);
  };

  setFilterPresentClickHandler = (callback) => {
    this._callback.filterPresent = callback;
    this.element.querySelector('#filter-present').addEventListener('click', this.#filterPresentHandler);
  };

  setFilterPastClickHandler = (callback) => {
    this._callback.filterPast = callback;
    this.element.querySelector('#filter-past').addEventListener('click', this.#filterPastHandler);
  };

  #filterEverythingHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterEverything();
  };

  #filterFutureHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterFuture();
  };

  #filterPresentHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterPresent();
  };

  #filterPastHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterPast();
  };

}
