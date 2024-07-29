'use strict';
/* global data */
const $entryForm = document.querySelector('#entry-form');
const $entryImg = document.querySelector('#entry-img');
const $titleInput = document.querySelector('#title-input');
const $photoUrlInput = document.querySelector('#photo-url-input');
const $notesTextArea = document.querySelector('#notes-text-area');
if (!$entryForm) throw new Error('$entryForm query failed');
if (!$entryImg) throw new Error('$entryImg query failed');
if (!$titleInput) throw new Error('$titleInput query failed');
if (!$photoUrlInput) throw new Error('$photoUrlInput query failed');
if (!$notesTextArea) throw new Error('$notesTextArea query failed');
$photoUrlInput.addEventListener('input', () => {
  if (!$photoUrlInput.value) {
    $entryImg.setAttribute('src', '/images/placeholder-image-square.jpg');
    return;
  }
  $entryImg.setAttribute('src', $photoUrlInput.value);
});
$entryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = $titleInput.value;
  const photoUrl = $photoUrlInput.value;
  const notes = $notesTextArea.value;
  const entryValues = {
    title,
    photoUrl,
    notes,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(entryValues);
  writeData();
  $entryImg.setAttribute('src', '/images/placeholder-image-square.jpg');
  $entryForm.reset();
});
