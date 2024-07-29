/* exported data */

interface Entry {
  title: string;
  photoUrl: string;
  notes: string;
  entryId: number;
}

const data = {
  view: 'entry-form',
  entries: [] as Entry[],
  editing: null,
  nextEntryId: 1,
};

if (!data) console.log('getting an error that data is never used');
