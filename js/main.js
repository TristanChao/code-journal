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
  if (data.entries.length > 0) {
    toggleNoEntries();
  }
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
