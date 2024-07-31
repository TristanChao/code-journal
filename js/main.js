'use strict';
/* global data, writeData */
const $entryForm = document.querySelector('#entry-form');
const $entryImg = document.querySelector('#entry-img');
const $titleInput = document.querySelector('#title-input');
const $photoUrlInput = document.querySelector('#photo-url-input');
const $notesTextArea = document.querySelector('#notes-text-area');
const $allEntriesUl = document.querySelector('#entries-ul');
const $noEntriesLi = document.querySelector('#no-entries-li');
if (!$entryForm) throw new Error('$entryForm query failed');
if (!$entryImg) throw new Error('$entryImg query failed');
if (!$titleInput) throw new Error('$titleInput query failed');
if (!$photoUrlInput) throw new Error('$photoUrlInput query failed');
if (!$notesTextArea) throw new Error('$notesTextArea query failed');
if (!$allEntriesUl) throw new Error('$allEntriesDiv query failed');
if (!$noEntriesLi) throw new Error('$noEntriesLi query failed');
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
function renderEntry(entry) {
  const $entryLI = document.createElement('li');
  const $rowDiv = document.createElement('div');
  $rowDiv.className = 'row';
  const $imgDiv = document.createElement('div');
  $imgDiv.className = 'column-half';
  const $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.photoUrl);
  $entryImg.setAttribute('alt', 'image of' + entry.title);
  const $textDiv = document.createElement('div');
  $textDiv.className = 'column-half';
  const $titleH3 = document.createElement('h3');
  $titleH3.textContent = entry.title;
  const $notesP = document.createElement('p');
  $notesP.textContent = entry.notes;
  $entryLI.appendChild($rowDiv);
  $rowDiv.appendChild($imgDiv);
  $imgDiv.appendChild($entryImg);
  $rowDiv.appendChild($textDiv);
  $textDiv.appendChild($titleH3);
  $textDiv.appendChild($notesP);
  return $entryLI;
}
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $allEntriesUl.appendChild($newEntry);
  }
});
function toggleNoEntries() {
  if (!$noEntriesLi) throw new Error('$noEntriesLi query failed');
  if ($noEntriesLi.matches('.hidden')) {
    $noEntriesLi.className = '';
  } else {
    $noEntriesLi.className = 'hidden';
  }
}
toggleNoEntries();
