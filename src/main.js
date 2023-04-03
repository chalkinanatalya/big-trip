import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import PointsModel from './model/points-model.js';
import PointPresenter from './presenter/point-presenter.js';

const siteHeaderContainerElement = document.querySelector('.page-body__container');
const siteBodyComponent = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const mainPresenter = new MainPresenter(siteBodyComponent, pointsModel, new PointPresenter);
const headerPresenter = new HeaderPresenter(siteHeaderContainerElement, mainPresenter);

headerPresenter.init();

