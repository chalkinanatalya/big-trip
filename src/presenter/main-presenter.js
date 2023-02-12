import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import {render} from '../render.js';
import PointListView from '../view/point-list-view';
import FormEditPointView from '../view/form-edit-point-view';

export default class MainPresenter {
  #bodyContainer = null;
  #pointsModel = null;

  #listTripComponent = new ListView();

  #bodyTasks = [];

  constructor(bodyContainer, pointsModel) {
    this.#bodyContainer = bodyContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#bodyTasks = [...this.#pointsModel.points];

    render(new SortView(), this.#bodyContainer);
    render (this.#listTripComponent, this.#bodyContainer);
    //render(new FormCreatePointView(this.#bodyTasks[0]), this.listTripComponent.element);

    for(let i = 0; i < this.#bodyTasks.length; i++) {
      this.#renderPoint(this.#bodyTasks[i]);
    }
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

}
