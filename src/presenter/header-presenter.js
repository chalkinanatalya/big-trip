import {render} from '../framework/render.js';
import NewEventButtonView from '../view/header/new-event-button-view.js';
import FilterView from '../view/header/filter-view.js';
import SiteHeaderView from '../view/header/site-header-view.js';
import HeaderInfoContainerView from '../view/header/header-info-container-view.js';
import FilterContainerView from '../view/header/filter-container-view.js';

export default class HeaderPresenter {
  #siteContainer = null;
  #headerContainer = new SiteHeaderView();
  #headerInfo = new HeaderInfoContainerView();
  #filterContainer = new FilterContainerView();

  constructor(siteContainer) {
    this.#siteContainer = siteContainer;
  }

  init = () => {
    this.#renderHeader();
  };

  #renderHeader = () => {
    render(this.#headerContainer, this.#siteContainer);
    render(this.#headerInfo, this.#headerContainer.element);
    render(this.#filterContainer, this.#headerContainer.element);
    render(new FilterView(), this.#filterContainer.element);
    render(new NewEventButtonView(), this.#headerContainer.element);
  };
}
