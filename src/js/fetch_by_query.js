import axios from 'axios';

export default async function fetchByQuery(query, page) {
    const API_KEY = '29451050-d710b01a754c47fc53a7a4779';
    const url = 'https://pixabay.com/api/';
    return await axios
      .get(
        `${url}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
      );
}