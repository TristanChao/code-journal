'use strict';
/* exported data, writeData */
const data = readData();
writeData();
function writeData() {
  const dataJson = JSON.stringify(data);
  localStorage.setItem('entriesData', dataJson);
}
function readData() {
  if (!localStorage.getItem('entriesData')) {
    const dataDefault = {
      view: 'entry-form',
      entries: [],
      editing: null,
      nextEntryId: 1,
    };
    return dataDefault;
  }
  const dataJson = localStorage.getItem('entriesData');
  const dataObj = JSON.parse(dataJson);
  return dataObj;
}
