'use strict';
/* global data, writeData */
const $entryForm = document.querySelector('#entry-form');
const $entryImg = document.querySelector('#entry-img');
const $titleInput = document.querySelector('#title-input');
const $photoUrlInput = document.querySelector('#photo-url-input');
const $notesTextArea = document.querySelector('#notes-text-area');
const $allEntriesUl = document.querySelector('#entries-ul');
const $noEntriesLi = document.querySelector('#no-entries-li');
const $entryFormDiv = document.querySelector('div[data-view="entry-form"]');
const $entriesDiv = document.querySelector('div[data-view="entries"]');
const $entriesViewA = document.querySelector('#entries-view-a');
const $newEntryA = document.querySelector('#new-entry-a');
const $entryFormHeader = document.querySelector('#entry-form-header');
if (!$entryForm) throw new Error('$entryForm query failed');
if (!$entryImg) throw new Error('$entryImg query failed');
if (!$titleInput) throw new Error('$titleInput query failed');
if (!$photoUrlInput) throw new Error('$photoUrlInput query failed');
if (!$notesTextArea) throw new Error('$notesTextArea query failed');
if (!$allEntriesUl) throw new Error('$allEntriesDiv query failed');
if (!$noEntriesLi) throw new Error('$noEntriesLi query failed');
if (!$entryFormDiv) throw new Error('$entryFormDiv query failed');
if (!$entriesDiv) throw new Error('$entriesDiv query failed');
if (!$entriesViewA) throw new Error('$entriesViewA query failed');
if (!$newEntryA) throw new Error('$newEntryA query failed');
if (!$entryFormHeader) throw new Error('$entryFormHeader query failed');
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
  const $newEntry = renderEntry(entryValues);
  $allEntriesUl.prepend($newEntry);
  $entryImg.setAttribute('src', '/images/placeholder-image-square.jpg');
  $entryForm.reset();
  viewSwap('entries');
  toggleNoEntries();
});
function renderEntry(entry) {
  const $entryLI = document.createElement('li');
  $entryLI.setAttribute('data-entry-id', String(entry.entryId));
  const $rowDiv = document.createElement('div');
  $rowDiv.className = 'row';
  const $imgDiv = document.createElement('div');
  $imgDiv.className = 'column-half';
  const $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.photoUrl);
  $entryImg.setAttribute('alt', 'image of' + entry.title);
  const $textDiv = document.createElement('div');
  $textDiv.className = 'column-half';
  const $titleDiv = document.createElement('div');
  $titleDiv.className = 'row justify-sb';
  const $titleH3 = document.createElement('h3');
  $titleH3.textContent = entry.title;
  const $pencilIcon = document.createElement('i');
  $pencilIcon.className = 'fa-solid fa-pencil';
  const $notesP = document.createElement('p');
  $notesP.textContent = entry.notes;
  $entryLI.appendChild($rowDiv);
  $rowDiv.appendChild($imgDiv);
  $imgDiv.appendChild($entryImg);
  $rowDiv.appendChild($textDiv);
  $textDiv.appendChild($titleDiv);
  $titleDiv.appendChild($titleH3);
  $titleDiv.appendChild($pencilIcon);
  $textDiv.appendChild($notesP);
  return $entryLI;
}
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $allEntriesUl.appendChild($newEntry);
  }
  viewSwap(data.view);
  toggleNoEntries();
});
function toggleNoEntries() {
  if (!$noEntriesLi) throw new Error('$noEntriesLi query failed');
  if (data.entries.length > 0) {
    $noEntriesLi.className = 'hidden';
  } else {
    $noEntriesLi.className = '';
  }
}
function viewSwap(view) {
  if (!$entryFormDiv) throw new Error('$entryFormDiv query failed');
  if (!$entriesDiv) throw new Error('$entriesDiv query failed');
  if (view === 'entries') {
    $entryFormDiv.className = 'hidden';
    $entriesDiv.className = '';
  } else {
    $entriesDiv.className = 'hidden';
    $entryFormDiv.className = '';
  }
  data.view = view;
  writeData();
}
$entriesViewA.addEventListener('click', () => {
  viewSwap('entries');
});
$newEntryA.addEventListener('click', () => {
  viewSwap('entry-form');
});
$allEntriesUl.addEventListener('click', (event) => {
  const $target = event.target;
  if (!$target) throw new Error('$target query failed');
  if (!$target.matches('.fa-pencil')) {
    return;
  }
  viewSwap('entry-form');
  const $targetLi = $target.closest('li');
  if (!$targetLi) throw new Error('$targetLi query failed');
  const targetLiId = Number($targetLi.getAttribute('data-entry-id'));
  console.log('targetId:', targetLiId);
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === targetLiId) {
      data.editing = data.entries[i];
      break;
    }
  }
  if (!data.editing) throw new Error('data.editing has no value');
  console.log('data.editing:', data.editing);
  $titleInput.value = data.editing.title;
  $photoUrlInput.value = data.editing.photoUrl;
  $notesTextArea.value = data.editing.notes;
  $entryImg.setAttribute('src', data.editing.photoUrl);
  $entryFormHeader.textContent = 'Edit Entry';
});
