var mongoose = require('mongoose');
var Schema = mongoose.Schema;

JobsSchema = new Schema({
	title: String,
	details: String,
	notes: String,
	images: String,
	details: String,
	userNotes: String,
	completed: Boolean,
	
}),
	Jobs = mongoose.model('Jobs', JobsSchema);

module.exports = Jobs;
