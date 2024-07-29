/* global data */

const $photoUrlInput = document.querySelector(
  '#photo-url-input',
) as HTMLInputElement;
const $entryImg = document.querySelector('#entry-img') as HTMLImageElement;

if (!$photoUrlInput) throw new Error('$photoUrlInput query failed');
if (!$entryImg) throw new Error('$entryImg query failed');

$photoUrlInput.addEventListener('input', () => {
  if (!$photoUrlInput.value) {
    $entryImg.setAttribute('src', '/images/placeholder-image-square.jpg');
    return;
  }

  $entryImg.setAttribute('src', $photoUrlInput.value);
});

if (!data) console.log('i just need to get rid of this error for now');