import AbstractView from '../../framework/view/abstract-view.js';

const createHeaderInfoTemplate = () => (
  `<div class="trip-main__trip-controls  trip-controls">

</div>`
);

export default class HeaderInfoContainerView extends AbstractView {
  get template() {
    return createHeaderInfoTemplate();
  }
}
