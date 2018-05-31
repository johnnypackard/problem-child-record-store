$(document).ready(onReady);

function onReady() {
  console.log('Client side Woot!');
  $("#add-record").on('click', function(event){
    event.preventDefault();
    let record = getNewRecord();
    addRecord(record);
    // addRecord( getNewRecord() );
  })
  getAllRecords();
}

function clearRecordInputs() {
  $("#in-artist").val(''),
  $("#in-album").val(''),
  $("#in-year").val(''),
  $("#in-genre").val('')
}

function getNewRecord() {
  let record = {
    artist: $("#in-artist").val(),
    album: $("#in-album").val(),
    year: $("#in-year").val(),
    genre: $("#in-genre").val()
  }
  return record;
}

function addRecord(record) {
  $.ajax({
    method: 'POST',
    url: '/record',
    data: record
  }).then( function(response) {
    // clear input fields
    clearRecordInputs();
    getAllRecords();
  }).catch( function(response) {
    console.log("Something bad happened:", response.status);
  });
}

function getAllRecords() {
  $.ajax({
    method: 'GET',
    url: '/record'
  }).then( function(response) {
    displayAllRecords( response );
  });
}


function displayAllRecords(recordArray) {
  let $recordsTarget = $('#records');
  $recordsTarget.empty();
  for (let record of recordArray) {
    $recordsTarget.append( makeRowFor(record) );
  }
}

function makeRowFor(record) {
  let rowHtml = `<tr>
      <td>${record.artist}</td>
      <td>${record.albumName}</td>
      <td>${record.year}</td>
      <td>${ record.genreList.join(', ') }</td>
    </tr>`;
    return rowHtml;
}