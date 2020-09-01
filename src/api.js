import axios from 'axios';

const keyAPI = '14824365-e6696933d91165e226b0fb92a';

export const getItems = (searchQuery = '', page = 1) =>
  axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${keyAPI}&image_type=photo&orientation=horizontal&per_page=20`,
  );

export const w = () => null;
