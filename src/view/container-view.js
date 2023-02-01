import { createElement } from '../render';

const createContainerTemplate = () => '<div class="page-body__container"></div>';


export default class ContainerView {
  getTemplate() {
    return createContainerTemplate();
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
