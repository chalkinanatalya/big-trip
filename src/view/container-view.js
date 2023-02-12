import { createElement } from '../render';

const createContainerTemplate = () => '<div class="page-body__container"></div>';


export default class ContainerView {
  #element = null;

  get template() {
    return createContainerTemplate();
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
