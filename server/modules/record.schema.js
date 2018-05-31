// class Record {
//   constructor(artist, albumName, year, genreList) {
//     this.artist = artist;
//     this.albumName = albumName;
//     this.year = year;
//     this.genreList = genreList;
//   }
//   addGenre(string) {
//     // Make sure that there is an array
//     if (this.genreList == null) {
//       this.genreList = [];
//     }
//     // TODO - make sure we don't add the same one twice
//     this.genreList.push(string);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    artist: { type: String, required: true, unique: true },
    albumName: { type: String, required: true },
    year: { type: Date },
    genreList: { type: String, required: true}
  }
);

module.exports = mongoose.model('record', recordSchema);
 
// module.exports = Record;

