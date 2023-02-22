import AbstractView from '../../framework/view/abstract-view.js';

const createSiteHeaderTemplate = () => (
  '<div class="trip-main"></div>'
);

export default class SiteHeaderView extends AbstractView {
  get template() {
    return createSiteHeaderTemplate();
  }
}
