/* global data, writeData */

const $entryForm = document.querySelector('#entry-form') as HTMLFormElement;
const $entryImg = document.querySelector('#entry-img') as HTMLImageElement;
const $titleInput = document.querySelector('#title-input') as HTMLInputElement;
const $photoUrlInput = document.querySelector(
  '#photo-url-input',
) as HTMLInputElement;
const $notesTextArea = document.querySelector(
  '#notes-text-area',
) as HTMLTextAreaElement;
const $allEntriesUl = document.querySelector('#entries-ul') as HTMLUListElement;
const $noEntriesLi = document.querySelector('#no-entries-li') as HTMLLIElement;
const $entryFormDiv = document.querySelector(
  'div[data-view="entry-form"]',
) as HTMLDivElement;
const $entriesDiv = document.querySelector(
  'div[data-view="entries"]',
) as HTMLDivElement;
const $entriesViewA = document.querySelector(
  '#entries-view-a',
) as HTMLAnchorElement;
const $newEntryA = document.querySelector('#new-entry-a') as HTMLAnchorElement;
const $entryFormHeader = document.querySelector(
  '#entry-form-header',
) as HTMLHeadElement;
const $deleteEntryBtn = document.querySelector(
  '#delete-entry-btn',
) as HTMLButtonElement;
const $deleteEntryDialog = document.querySelector(
  '#delete-entry-dialog',
) as HTMLDialogElement;
const $cancelDeleteBtn = document.querySelector(
  '#cancel-delete-btn',
) as HTMLButtonElement;
const $confirmDeleteBtn = document.querySelector(
  '#confirm-delete-btn',
) as HTMLButtonElement;

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

$photoUrlInput.addEventListener('input', () => {
  if (!$photoUrlInput.value) {
    $entryImg.setAttribute('src', '/images/placeholder-image-square.jpg');
    return;
  }

  $entryImg.setAttribute('src', $photoUrlInput.value);
});

$entryForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const title = $titleInput.value;
  const photoUrl = $photoUrlInput.value;
  const notes = $notesTextArea.value;
  const entryValues: Entry = {
    title,
    photoUrl,
    notes,
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

function renderEntry(entry: Entry): HTMLLIElement {
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

function toggleNoEntries(): void {
  if (!$noEntriesLi) throw new Error('$noEntriesLi query failed');
  if (data.entries.length > 0) {
    $noEntriesLi.className = 'hidden';
  } else {
    $noEntriesLi.className = '';
  }
}

function viewSwap(view: string): void {
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
  resetEntryForm();
});

function resetEntryForm(): void {
  $entryImg.setAttribute('src', '/images/placeholder-image-square.jpg');
  $entryForm.reset();
  $entryFormHeader.textContent = 'New Entry';
}

$newEntryA.addEventListener('click', () => {
  viewSwap('entry-form');
  $deleteEntryBtn.className = 'hidden';
});

$allEntriesUl.addEventListener('click', (event: Event) => {
  const $target = event.target as HTMLElement;
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
