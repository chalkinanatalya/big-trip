import {render, remove} from '../framework/render.js';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import FormCreatePointView from '../view/form-create-point-view.js';
import NoPointView from '../view/no-point-view';
import { generateFilter } from '../mock/filter.js';
import { FilterType } from '../const';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/utils.js';

export default class MainPresenter {
  #bodyContainer = null;
  pointsModel = null;
  #pointsPresenter = [];
  //#sourcedContainerPoints = [];

  #listTripComponent = new ListView();
  #sortComponent = null;

  #boardPoints = [];
  #selectedFilter = FilterType.EVERYTHING;

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
    this.#boardPoints = generateFilter(this.pointsModel.points).find((point) => point.name === this.#selectedFilter).points;

    this.#renderBoard();
  };

  #handlePointChange = (updatedTask) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedTask);
    this.#pointsPresenter.find((point) => point.pointData.id === updatedTask.id).init(updatedTask);
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
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

  #renderBoard = () => {
    this.#sortComponent = new SortView();
    render(this.#sortComponent, this.#bodyContainer);
    render(this.#listTripComponent, this.#bodyContainer);

    this.#renderPoints();

    if(this.#boardPoints.length === 0) {
      render( new NoPointView(), this.#listTripComponent);
    }
  };

}
