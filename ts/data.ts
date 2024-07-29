/* exported data, writeData */

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

writeData();

function writeData(): void {
  const dataJson = JSON.stringify(data);
  localStorage.setItem('entriesData', dataJson);
}

function readData(): DataObject {
  if (!localStorage.getItem('entriesData')) {
    const dataDefault: DataObject = {
      view: 'entry-form',
      entries: [] as Entry[],
      editing: null,
      nextEntryId: 1,
    };
    return dataDefault;
  }

  const dataJson = localStorage.getItem('entriesData') as string;
  const dataObj = JSON.parse(dataJson);
  return dataObj;
}
