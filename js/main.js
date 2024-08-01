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
const $deleteEntryBtn = document.querySelector('#delete-entry-btn');
const $deleteEntryDialog = document.querySelector('#delete-entry-dialog');
const $cancelDeleteBtn = document.querySelector('#cancel-delete-btn');
const $confirmDeleteBtn = document.querySelector('#confirm-delete-btn');
const $searchForm = document.querySelector('#search-form');
const $searchInput = document.querySelector('#search-input');
const $clearSearchBtn = document.querySelector('#clear-search-btn');
const $tagsInput = document.querySelector('#tags-input');
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
if (!$deleteEntryBtn) throw new Error('$deleteEntryBtn query failed');
if (!$deleteEntryDialog) throw new Error('$deleteEntryDialog query failed');
if (!$cancelDeleteBtn) throw new Error('$cancelDeleteBtn query failed');
if (!$confirmDeleteBtn) throw new Error('$confirmDeleteBtn query failed');
if (!$searchForm) throw new Error('$searchForm query failed');
if (!$searchInput) throw new Error('$searchInput query failed');
if (!$clearSearchBtn) throw new Error('$clearSearchBtn query failed');
if (!$tagsInput) throw new Error('$tagsInput query failed');
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
  let tags;
  if (!$tagsInput.value) {
    tags = 'none';
  } else {
    tags = $tagsInput.value;
  }
  const entryValues = {
    title,
    photoUrl,
    notes,
    tags,
  };
  if (data.editing === null) {
    entryValues.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(entryValues);
    const $newEntry = renderEntry(entryValues);
    $allEntriesUl.prepend($newEntry);
  } else {
    entryValues.entryId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i] = entryValues;
        break;
      }
    }
    const $editedEntry = renderEntry(entryValues);
    const $replaceEntry = document.querySelector(
      `li[data-entry-id="${data.editing.entryId}"]`,
    );
    if (!$replaceEntry) throw new Error('$replaceEntry query failed');
    $replaceEntry.replaceWith($editedEntry);
    data.editing = null;
    $deleteEntryBtn.className = 'hidden';
  }
  writeData();
  resetEntryForm();
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
  data.editing = null;
  viewSwap('entries');
  resetEntryForm();
});
function resetEntryForm() {
  $entryImg.setAttribute('src', '/images/placeholder-image-square.jpg');
  $entryForm.reset();
  $entryFormHeader.textContent = 'New Entry';
}
$newEntryA.addEventListener('click', () => {
  data.editing = null;
  viewSwap('entry-form');
  $deleteEntryBtn.className = 'hidden';
});
$allEntriesUl.addEventListener('click', (event) => {
  const $target = event.target;
  if (!$target) throw new Error('$target query failed');
  if (!$target.matches('.fa-pencil')) {
    return;
  }
  const $targetLi = $target.closest('li');
  if (!$targetLi) throw new Error('$targetLi query failed');
  const targetLiId = Number($targetLi.getAttribute('data-entry-id'));
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === targetLiId) {
      data.editing = data.entries[i];
      break;
    }
  }
  if (!data.editing) throw new Error('data.editing has no value');
  $titleInput.value = data.editing.title;
  $photoUrlInput.value = data.editing.photoUrl;
  $tagsInput.value = data.editing.tags;
  $notesTextArea.value = data.editing.notes;
  $entryImg.setAttribute('src', data.editing.photoUrl);
  $deleteEntryBtn.className = '';
  $entryFormHeader.textContent = 'Edit Entry';
  viewSwap('entry-form');
});
$deleteEntryBtn.addEventListener('click', () => {
  $deleteEntryDialog.showModal();
});
$cancelDeleteBtn.addEventListener('click', () => {
  $deleteEntryDialog.close();
});
$confirmDeleteBtn.addEventListener('click', () => {
  if (!data.editing) throw new Error('data.editing has no value');
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);
      const $deleteLi = document.querySelector(
        `li[data-entry-id="${data.editing.entryId}"]`,
      );
      if (!$deleteLi) throw new Error('$deleteLi query failed');
      $deleteLi.remove();
      break;
    }
  }
  toggleNoEntries();
  $deleteEntryDialog.close();
  data.editing = null;
  viewSwap('entries');
  resetEntryForm();
});
$searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = $searchInput.value.toLowerCase();
  if (!searchTerm) return;
  $searchInput.className = 'with-clear';
  $clearSearchBtn.className = '';
  const entryLiList = document.querySelectorAll(
    '#entries-ul > li[data-entry-id]',
  );
  if (!entryLiList) throw new Error('entryLiList query failed');
  for (let i = 0; i < entryLiList.length; i++) {
    if (!entryLiList[i].textContent?.toLowerCase().includes(searchTerm)) {
      entryLiList[i].className = 'hidden';
    } else {
      entryLiList[i].className = '';
    }
  }
});
$clearSearchBtn.addEventListener('click', () => {
  const entryLiList = document.querySelectorAll(
    '#entries-ul > li[data-entry-id]',
  );
  if (!entryLiList) throw new Error('entryLiList query failed');
  for (let i = 0; i < entryLiList.length; i++) {
    entryLiList[i].className = '';
  }
  $searchForm.reset();
  $clearSearchBtn.className = 'hidden';
  $searchInput.className = '';
});
