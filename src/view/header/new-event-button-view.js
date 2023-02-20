import AbstractView from '../../framework/view/abstract-view.js';

const createNewEventButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';


export default class NewEventButtonView extends AbstractView {
  get template() {
    return createNewEventButtonTemplate();
  }

  setNewEventClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.trip-main__event-add-btn').addEventListener('click', this.#NewEventClickHandler);
  };

  #NewEventClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
