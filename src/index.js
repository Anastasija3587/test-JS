import './styles.css';
//task 1

class StringBuilder {
  constructor(baseString = '') {
    this.value = baseString;
  }
  toString() {
    return this.value;
  }
  append(str) {
    this.value = this.value + str;
    return this;
  }
  prepend(str) {
    this.value = str + this.value;
    return this;
  }
  pad(str) {
    this.value = str + this.value + str;
    return this;
  }
}

const builder = new StringBuilder('.');

builder
  .append('^')
  .prepend('^')
  .pad('=');

console.log(builder);

//task 2

const refs = {
  wrapInput: document.querySelector('#controls'),
  boxes: document.querySelector('#boxes'),
};

const handleInput = e => {
  let action = event.target.dataset.action;
  if (action === 'create') {
    const count = refs.wrapInput.children[0].value;
    let block = '';
    for (let i = 1; i <= count; i++) {
      block += `<div style = 'background-color:#${(
        (Math.random() * 0xffffff) <<
        0
      ).toString(16)}; width:${20 + i * 10}px; height:${20 + i * 10}px'></div>`;
    }
    refs.boxes.innerHTML = block;
  } else if (action === 'destroy') {
    refs.boxes.innerHTML = '';
  } else return;
};

refs.wrapInput.addEventListener('click', handleInput);

//task 3
import * as basicLightbox from 'basiclightbox';
import { getItems } from './api';

const ref = {
  form: document.querySelector('#search-form'),
  list: document.querySelector('.list'),
  btnMore: document.querySelector('.btnMore'),
  item: document.querySelector('.item'),
};

getItems().then(items => {
  const content = items.data.hits
    .map(
      el =>
        `<li class='item'><a href=${el.largeImageURL}><img width=200 height=200 src=${el.webformatURL} data-source=${el.largeImageURL} alt='some image'/></a></li>`,
    )
    .join('');
  ref.list.insertAdjacentHTML('beforeend', content);
});

const findBySearch = e => {
  e.preventDefault();
  const query = ref.form.elements[0].value;
  getItems(query).then(items => {
    const content = items.data.hits
      .map(
        el =>
          `<li class='item'><a href=${el.largeImageURL}><img width=200 height=200 src=${el.webformatURL} data-source=${el.largeImageURL} alt='some image'/></a></li>`,
      )
      .join('');
    ref.list.innerHTML = content;
  });
};

let page = 2;
const handleClickMore = () => {
  const query = ref.form.elements[0].value;
  const querySearch = query || '';
  getItems(querySearch, page).then(items => {
    const content = items.data.hits
      .map(
        el =>
          `<li class='item'><a href=${el.largeImageURL}><img width=200 height=200 src=${el.webformatURL} data-source=${el.largeImageURL} alt='some image'/></a></li>`,
      )
      .join('');
    ref.list.insertAdjacentHTML('beforeend', content);
  });
  page++;
};

const handleClick = e => {
  e.preventDefault();
  const instance = basicLightbox.create(
    `<img class='img' src=${e.target.dataset.source} width="800" height="600">`,
  );
  instance.show(() => {
    window.addEventListener('click', instance.close);
  });
};

ref.form.addEventListener('submit', findBySearch);
ref.btnMore.addEventListener('click', handleClickMore);
ref.list.addEventListener('click', handleClick);
