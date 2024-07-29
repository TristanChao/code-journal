/* exported data, writeData */

/* eslint-disable @typescript-eslint/no-unused-vars */

interface Entry {
  title: string;
  photoUrl: string;
  notes: string;
  entryId: number;
}

interface DataObject {
  view: string;
  entries: Entry[];
  editing: null;
  nextEntryId: number;
}

const data = readData();

function writeData(): void {
  const dataJson = JSON.stringify(data);
  localStorage.setItem('entriesData', dataJson);
}

function readData(): DataObject {
  const dataJson = localStorage.getItem('entriesData');

  if (!dataJson) {
    const dataDefault: DataObject = {
      view: 'entry-form',
      entries: [] as Entry[],
      editing: null,
      nextEntryId: 1,
    };
    return dataDefault;
  }

  const dataObj = JSON.parse(dataJson);
  return dataObj;
}
