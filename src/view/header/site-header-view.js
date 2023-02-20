import AbstractView from '../../framework/view/abstract-view.js';

const createSiteHeaderTemplate = () => (
  ` <div class="trip-main">
      <div class="trip-main__trip-controls  trip-controls">
        <div class="trip-controls__filters">
          <h2 class="visually-hidden">Filter events</h2>
          <!-- Фильтры -->
        </div>
      </div>

      <!-- <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button> -->
    </div>`
);

export default class SiteHeaderView extends AbstractView {
  get template() {
    return createSiteHeaderTemplate();
  }
}
