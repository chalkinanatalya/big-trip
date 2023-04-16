import {render, remove, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import FormCreatePointView from '../view/form-create-point-view.js';
import NoPointView from '../view/no-point-view';
import { generateFilter } from '../mock/filter.js';
import { FilterType, SortType } from '../const';
import PointPresenter from './point-presenter.js';
import { sortPointDay, updateItem } from '../utils/utils.js';

export default class MainPresenter {
  #bodyContainer = null;
  pointsModel = null;
  #pointsPresenter = [];

  #listTripComponent = new ListView();
  #sortComponent = new SortView();

  #boardPoints = [];
  #selectedFilter = FilterType.EVERYTHING;

  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  constructor(bodyContainer, pointsModel) {
    this.#bodyContainer = bodyContainer;
    this.pointsModel = pointsModel;
  }

  init = () => {
    remove(this.#sortComponent);
    if(this.#pointsPresenter.length > 0) {
      this.#pointsPresenter.forEach((point) => {
        point.removePoint();
      });
    }
    this.#pointsPresenter = [];
    this.#sourcedBoardPoints = generateFilter(this.pointsModel.points).find((point) => point.name === this.#selectedFilter).points;
    this.#boardPoints = [...this.#sourcedBoardPoints];

    this.#renderBoard();
  };

  #handlePointChange = (updatedTask) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedTask);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedTask);
    this.#pointsPresenter.find((point) => point.pointData.id === updatedTask.id).init(updatedTask);
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };


  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#boardPoints.sort(sortPointDay);
        break;
      // case SortType.EVENT:
      //   this.#boardPoints.sort(sortTaskDown);
      //   break;
      // case SortType.TIME:
      //   this.#boardPoints.sort(sortTaskDown);
      //   break;
      // case SortType.PRICE:
      //   this.#boardPoints.sort(sortTaskDown);
      //   break;
      // case SortType.OFFERS:
      //   this.#boardPoints.sort(sortTaskDown);
      //   break;
      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType !== sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  };

  renderForm(enableButton) {
    const pointNewComponent = new FormCreatePointView();

    const renderCreatePoint = () => {
      render(pointNewComponent, this.#listTripComponent.element, 'afterbegin');
    };

    const removeCreatePoint = () => {
      remove(pointNewComponent, this.#listTripComponent.element);
      enableButton.setEnabledHandler();
    };

    renderCreatePoint();

    pointNewComponent.setCancelButtonHandler(() => {
      removeCreatePoint();
    });
  }

  setFilter (filterType) {
    this.#selectedFilter = filterType;
  }

  #renderPoints() {
    this.#boardPoints.forEach((point) => {
      const pointPresenter = new PointPresenter(this.#listTripComponent.element, this.#handlePointChange, this.#handleModeChange);
      pointPresenter.init(point);
      this.#pointsPresenter.push(pointPresenter);
    });
  }

  #renderSort = () => {
    render(this.#sortComponent, this.#bodyContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #clearPoints = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter = [];
  };

  #renderBoard = () => {
    render(this.#listTripComponent, this.#bodyContainer);

    this.#renderPoints();

    if(this.#boardPoints.length === 0) {
      render( new NoPointView(), this.#listTripComponent);
    }

    this.#renderSort();
  };

}
