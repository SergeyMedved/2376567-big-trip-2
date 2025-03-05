import AbstractView from '../framework/view/abstract-view.js';
import { sortButtons } from '../const.js';

function createSortTemplate() {

  const createSortButtonTemplate = (buttons) => buttons.map(({name, status}) =>
    `<div class="trip-sort__item trip-sort__item--${name}">
        <input id="sort-${name}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${status}>
        <label class="trip-sort__btn" for="sort-day">${name}</label>
      </div>`
  ).join('');

  return (
    `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
    ${ createSortButtonTemplate(sortButtons) }
    </form>`
  );
}

export default class SortView extends AbstractView {// нужно добавить конструктор для инициализации метода

  constructor() {
    super(); // добавляется т.к. есть родительский класс AbstractView
    this._sortInputClickHandler = this._sortInputClickHandler.bind(this);// инициализируем clickhandler в конструкторе для привязски контекста
  }

  get template() {
    return createSortTemplate();
  }

  _sortInputClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.closest('.trip-sort__btn')) {
      this._callback.sortInputClick(evt);
    }
  }

  setSortInputClickHandler(callback) {
    this._callback.sortInputClick = callback;
    document.querySelector('.trip-sort').addEventListener('click', this._sortInputClickHandler);
  }

}
