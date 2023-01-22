import { createElement } from '../render';

const createEventsContainerTemplate = () => (
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section>`);


export default class EventsContainerView {
  getTemplate() {
    return createEventsContainerTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element
  }

  removeElement() {
    this.element = null;
  }
}
