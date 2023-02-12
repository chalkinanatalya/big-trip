import { createElement } from '../render';

const createListTemplate = () => '<ul class="trip-events__list"></ul>';


export default class ContainerView {
  #element = null;

  get template() {
    return createListTemplate();
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
