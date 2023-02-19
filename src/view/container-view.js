import AbstractView from '../framework/view/abstract-view.js';

const createContainerTemplate = () => '<div class="page-body__container"></div>';


export default class ContainerView extends AbstractView {
  get template() {
    return createContainerTemplate();
  }
}
