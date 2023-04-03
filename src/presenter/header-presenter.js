import {remove, render} from '../framework/render.js';
import NewEventButtonView from '../view/header/new-event-button-view.js';
import FilterView from '../view/header/filter-view.js';
import SiteHeaderView from '../view/header/site-header-view.js';
import HeaderInfoContainerView from '../view/header/header-info-container-view.js';
import FilterContainerView from '../view/header/filter-container-view.js';
import MainPresenter from '../presenter/main-presenter.js';
import { FilterType } from '../const.js';

export default class HeaderPresenter {
  #siteContainer = null;
  #headerContainer = new SiteHeaderView();
  #headerInfo = new HeaderInfoContainerView();
  #filterContainer = new FilterContainerView();
  #buttonEvent = new NewEventButtonView();
  #mainPresenter = new MainPresenter();
  #filterComponent = null;
  #filterType = FilterType.EVERYTHING;

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

  #renderFilter = () => {
    this.#filterComponent = new FilterView(this.#filterType);
    render(this.#filterContainer, this.#headerContainer.element);
    render(this.#filterComponent, this.#filterContainer.element);

    this.#filterComponent.setFilterEverythingClickHandler(() => {
      this.#filterType = FilterType.EVERYTHING;
      this.#mainPresenter.setFilter(this.#filterType);
      this.#renderHeader();
    });

    this.#filterComponent.setFilterFutureClickHandler(() => {
      this.#filterType = FilterType.FUTURE;
      this.#mainPresenter.setFilter(this.#filterType);
      this.#renderHeader();
    });

    this.#filterComponent.setFilterPresentClickHandler(() => {
      this.#filterType = FilterType.PRESENT;
      this.#mainPresenter.setFilter(this.#filterType);
      this.#renderHeader();
    });

    this.#filterComponent.setFilterPastClickHandler(() => {
      this.#filterType = FilterType.PAST;
      this.#mainPresenter.setFilter(this.#filterType);
      this.#renderHeader();
    });
  };

  #renderHeader = () => {
    if(this.#filterComponent !== null) {
      remove(this.#filterComponent);
    }
    render(this.#headerInfo, this.#headerContainer.element);
    render(this.#headerContainer, this.#siteContainer);
    this.#renderFilter();
    render(this.#buttonEvent, this.#headerContainer.element);

    this.#mainPresenter.init();

    this.#renderButton();
  };

}
