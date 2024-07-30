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
const $allEntriesDiv = document.querySelector('div[data-view="entries"]');

if (!$entryForm) throw new Error('$entryForm query failed');
if (!$entryImg) throw new Error('$entryImg query failed');
if (!$titleInput) throw new Error('$titleInput query failed');
if (!$photoUrlInput) throw new Error('$photoUrlInput query failed');
if (!$notesTextArea) throw new Error('$notesTextArea query failed');
if (!$allEntriesDiv) throw new Error('$allEntriesDiv query failed');

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
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(entryValues);
  writeData();
  $entryImg.setAttribute('src', '/images/placeholder-image-square.jpg');
  $entryForm.reset();
});

function renderEntry(entry: Entry): HTMLLIElement {
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
    $allEntriesDiv.appendChild($newEntry);
  }
});
