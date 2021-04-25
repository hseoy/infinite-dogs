// Selectors
const imageContainer = document.querySelector(".infinite-wrapper__image-container");
const loader = document.querySelector(".infinite-wrapper__loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 30;
const query = 'dogs';
const apiUrl = `https://unsplash-api-hseoy.herokuapp.com/photos/random?query=${query}&count=${count}`

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach(photo => {
    const item = document.createElement('a');
    setAttribute(item, {
      href: photo.links.html,
      target: '_blank',
      rel: 'noopner noreferrer',
    });

    const img = document.createElement('img');
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch(e) {
    console.log(e);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    shuffle(photosArray);
    displayPhotos();
  }
});

getPhotos();