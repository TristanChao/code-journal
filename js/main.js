'use strict';
/* global data */
const $photoUrlInput = document.querySelector('#photo-url-input');
const $entryImg = document.querySelector('#entry-img');
if (!$photoUrlInput) throw new Error('$photoUrlInput query failed');
if (!$entryImg) throw new Error('$entryImg query failed');
$photoUrlInput.addEventListener('input', () => {
  if (!$photoUrlInput.value) {
    $entryImg.setAttribute('src', '/images/placeholder-image-square.jpg');
    return;
  }
  $entryImg.setAttribute('src', $photoUrlInput.value);
});
