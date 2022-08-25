import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
// import axios from 'axios';
import fetchByQuery from './js/fetch_by_query.js';
import markUpImg from './js/mark_up_img.js'



const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryRef = document.querySelector('.gallery');


searchForm.addEventListener('submit', onSearchQuery);

let searchQuery = '';
let page = 1;
let images = [];
let totalPages = 0;

function onSearchQuery(event) {
    event.preventDefault();
    searchQuery = event.target.elements.searchQuery.value;
    loadMoreBtn.classList.add('visible');
    // console.log(searchQuery);
    fetchByQuery(searchQuery, page).then(({ data }) => {
        images = data.hits;
        totalPages = data.totalHits / 40;
        console.log(images);
        if (images.length === 0) {
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
        }
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        onRender(images);
        if (images.length < 40) {
          Notiflix.Notify.info(
                "We're sorry, but you've reached the end of search results."
          );
            return;
        }
        loadMoreBtn.classList.remove('visible');
    }).catch(error => console.log(error.message));
}

function onRender(images) {
    const gallery = images.map(image => markUpImg(image)).join('');
    galleryRef.insertAdjacentHTML('beforeend', gallery);
    var lightbox = new SimpleLightbox('.gallery div a', { captionDelay: 250 });
    searchForm.innerHTML = '';

}

loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
    page += 1;
    fetchByQuery(searchQuery, page).then(({ data }) => {
        images = data.hits;
        totalPages = data.totalHits / 40;
        console.log(images);
    })
    onRender(images);

}
