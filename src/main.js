import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import PointsModel from './model/points-model.js';

const siteHeaderContainerElement = document.querySelector('.page-body__container');
const siteBodyComponent = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const mainPresenter = new MainPresenter(siteBodyComponent, pointsModel);
const headerPresenter = new HeaderPresenter(siteHeaderContainerElement, mainPresenter);

headerPresenter.init();

