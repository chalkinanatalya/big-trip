import AbstractView from '../../framework/view/abstract-view.js';

const createNewEventButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';


export default class NewEventButtonView extends AbstractView {
  get template() {
    return createNewEventButtonTemplate();
  }

  setNewEventClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.addEventListener('click', this.#NewEventClickHandler);
  };

  setEnabledHandler = () => {
    this.element.disabled = false;
  };

  #NewEventClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
    this.element.disabled = true;
  };
}
