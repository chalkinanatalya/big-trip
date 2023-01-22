import {render} from './render.js';
import FilterView from './view/filter-view.js';
import HeaderInfoContainerView from './view/header-info-container-view.js';
import MainPresenter from './presenter/main-presenter.js';

const siteMainHeaderElement = document.querySelector('.trip-main');
const siteHeaderElement = siteMainHeaderElement.querySelector('.trip-controls__filters');
const siteBodyComponent = document.querySelector('.trip-events');
const mainPresenter = new MainPresenter();

render(new HeaderInfoContainerView, siteMainHeaderElement, 'afterbegin');
render(new FilterView(), siteHeaderElement);

mainPresenter.init(siteBodyComponent);

