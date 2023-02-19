import AbstractView from '../framework/view/abstract-view.js';

const createEventsContainerTemplate = () => (
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section>`);


export default class EventsContainerView extends AbstractView {
  get template() {
    return createEventsContainerTemplate();
  }
}
