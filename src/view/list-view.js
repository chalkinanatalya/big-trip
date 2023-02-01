import { createElement } from '../render';

const createListTemplate = () => '<ul class="trip-events__list"></ul>';


export default class ContainerView {
  getTemplate() {
    return createListTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
