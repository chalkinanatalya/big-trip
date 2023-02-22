import {render} from '../framework/render.js';
import NewEventButtonView from '../view/header/new-event-button-view.js';
import FilterView from '../view/header/filter-view.js';
import SiteHeaderView from '../view/header/site-header-view.js';
import HeaderInfoContainerView from '../view/header/header-info-container-view.js';
import FilterContainerView from '../view/header/filter-container-view.js';
import MainPresenter from '../presenter/main-presenter.js';

export default class HeaderPresenter {
  #siteContainer = null;
  #headerContainer = new SiteHeaderView();
  #headerInfo = new HeaderInfoContainerView();
  #filterContainer = new FilterContainerView();
  #buttonEvent = new NewEventButtonView();
  #mainPresenter = new MainPresenter();

  constructor(siteContainer, mainPresenter) {
    this.#siteContainer = siteContainer;
    this.#mainPresenter = mainPresenter;
  }

  init = () => {
    this.#renderHeader();
  };

  #renderButton = () => {
    this.#buttonEvent.setNewEventClickHandler(() => {
      this.#mainPresenter.renderForm(this.#buttonEvent);
    });
  };

  #renderHeader = () => {
    render(this.#headerInfo, this.#headerContainer.element);
    render(this.#headerContainer, this.#siteContainer);

    render(this.#filterContainer, this.#headerContainer.element);
    render(new FilterView(), this.#filterContainer.element);
    render(this.#buttonEvent, this.#headerContainer.element);

    this.#mainPresenter.init();

    this.#renderButton();
  };

}
