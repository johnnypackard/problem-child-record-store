let myApp = angular.module( 'myApp', [] );

myApp.controller( 'RecordController', ['$http', function($http){
  // use "vm" as the name in script
  let vm = this;
  vm.records = [];
  // use nickname in HTML

  // simple click event
  vm.testClick = function(){
    console.log('test click');
  } // end testClick

  // Gets the data entered on the form
  vm.getRecord = function(){

    // Put the title from the form in an Object to send as data
    let newRecord = {
      title: vm.recordIn
    }
    // Send it to the server
    $http({
      method: 'POST', 
      url: '/movie',
      data: newRecord
    }).then(function(response){
      console.log('Sent movie to the server ');
      vm.requestRecords(); // Get records from the server again
      vm.recordIn = '';
    }).catch(function(error){
      console.log('Error adding a record');
    });
  } // end getRecord
  
  vm.removeMe = function( index ){
    console.log('in removeMe:', index );
    let recordToDelete = vm.records[index];
    $http({
      method: 'DELETE',
      url: `/records?id=${recordToDelete.id}`
    })
    .then(function(response){
      console.log('Deleted record', recordToDelete);
      vm.requestRecords(); // Get the records from the server again
    })
  } // end removeMe

  vm.requestRecords = function() {
    $http({
      method: 'GET',
      url: '/movie'
    })
    .then(function(response){
      console.log(`Got response from the server:`, response);
      vm.records = response.data;
      console.log( 'your records:', vm.records );
    })
    .catch(function(error){
      console.log(`Error getting records: ${error}`);
    });
  }

  // Get the records when the controller loads
  console.log('RecordController is created');
  vm.requestRecords();
  
}]); // end controller





















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