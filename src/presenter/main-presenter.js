import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import {render} from '../render.js';
import PointListView from '../view/point-list-view';
import FormEditPointView from '../view/form-edit-point-view';
import NoPointView from '../view/no-point-view';

export default class MainPresenter {
  #bodyContainer = null;
  #pointsModel = null;

  #listTripComponent = new ListView();

  #boardPoints = [];

  constructor(bodyContainer, pointsModel) {
    this.#bodyContainer = bodyContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  };

  #renderPoint(point) {
    const pointComponent = new PointListView(point);
    const pointEditComponent = new FormEditPointView(point);

    const replacePointToForm = () => {
      this.#listTripComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#listTripComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listTripComponent.element);
  }

  #renderBoard = () => {
    render(new SortView(), this.#bodyContainer);
    render (this.#listTripComponent, this.#bodyContainer);

    for(let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }

    if(this.#boardPoints.length === 0) {
      render( new NoPointView(), this.#listTripComponent.element);
    }
  };

}
