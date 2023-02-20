import {render, replace} from '../framework/render.js';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import PointListView from '../view/point-list-view';
import FormEditPointView from '../view/form-edit-point-view';
//import FormCreatePointView from '../view/form-create-point-view.js';
import NoPointView from '../view/no-point-view';
//import NewEventButtonView from '../view/new-event-button-view.js';

export default class MainPresenter {
  #bodyContainer = null;
  #pointsModel = null;

  #listTripComponent = new ListView();
  //#buttonNewEvent = new NewEventButtonView();

  #boardPoints = [];

  constructor(bodyContainer, pointsModel) {
    this.#bodyContainer = bodyContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  };

  // renderCreatePoint() {
  //   const pointNewComponent = new FormCreatePointView();
  //   this.#buttonNewEvent.setNewEventClickHandler(() => {
  //     render(pointNewComponent, this.#bodyContainer);
  //   });
  // }

  #renderPoint(point) {
    const pointComponent = new PointListView(point);
    const pointEditComponent = new FormEditPointView(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setButtonClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listTripComponent.element);
  }

  #renderBoard = () => {
    render(new SortView(), this.#bodyContainer);
    render(this.#listTripComponent, this.#bodyContainer);

    for(let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }

    if(this.#boardPoints.length === 0) {
      render( new NoPointView(), this.#listTripComponent);
    }
  };

}
