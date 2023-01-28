import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import FormCreatePointView from '../view/form-create-point-view';
import {render} from '../render.js';
import PointListView from '../view/point-list-view';

export default class MainPresenter {
  listTripComponent = new ListView();

  init = (bodyContainer, pointsModel) => {
    this.bodyContainer = bodyContainer;
    this.pointsModel = pointsModel;
    this.bodyTasks = [...this.pointsModel.getPoints()];

    render(new SortView(), this.bodyContainer);
    render (this.listTripComponent, this.bodyContainer);
    render(new FormCreatePointView(), this.listTripComponent.getElement());

    for(let i = 0; i < this.bodyTasks.length; i++) {
      render(new PointListView(this.bodyTasks[i]), this.listTripComponent.getElement());
    }
  };
}
