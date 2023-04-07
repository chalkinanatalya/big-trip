import { remove, render, replace } from '../framework/render';
import FormEditPointView from '../view/form-edit-point-view';
import PointListView from '../view/point-list-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointComponent = null;
  #pointEditComponent = null;
  #pointData = null;
  #pointsList = null;
  #changeData = null;
  #changeMode = null;

  #mode = Mode.DEFAULT;

  constructor(pointsList, changeData, changeMode) {
    this.#pointsList = pointsList;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(pointData) {
    this.#pointData = pointData;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;
    this.#pointComponent = new PointListView(this.#pointData);
    this.#pointEditComponent = new FormEditPointView(this.#pointData);

    this.#renderPoint();

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsList);
      return;
    } else {

      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  get pointData() {
    return this.#pointData;
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  };

  #renderPoint() {
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    this.#pointComponent.setEditClickHandler(() => {
      this.#replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    this.#pointEditComponent.setFormSubmitHandler(() => {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    this.#pointEditComponent.setButtonClickHandler(() => {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
  }

  removePoint() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#pointData, isFavorite: !this.#pointData.isFavorite});
  };
}
