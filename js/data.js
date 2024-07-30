'use strict';
/* exported data, writeData */
const data = readData();
function writeData() {
  const dataJson = JSON.stringify(data);
  localStorage.setItem('entriesData', dataJson);
}
function readData() {
  const dataJson = localStorage.getItem('entriesData');
  if (!dataJson) {
    const dataDefault = {
      view: 'entry-form',
      entries: [],
      editing: null,
      nextEntryId: 1,
    };
    return dataDefault;
  }
  const dataObj = JSON.parse(dataJson);
  return dataObj;
}
