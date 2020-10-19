const path = require("path");
const express = require("express");
const hbs = require("hbs");


const admin = express(); // the sub app
// Define paths for Admin Express 
const adminViewsPath = path.join(__dirname, "../admin/templates/views");
const adminPartialsPath = path.join(__dirname, "../admin/templates/partials");

// set views for Admin
admin.set('views', adminViewsPath);
hbs.registerPartials(adminPartialsPath);
admin.set('view engine', 'hbs');

// register handlebar helpers
hbs.registerHelper("each", function (context, options) {
	var ret = "";

	for (var i = 0, j = context.length; i < j; i++) {
		ret = ret + options.fn(context[i]);
	}

	return ret;
});


// Admin panel 
admin.on('mount', function (parent) {
	console.log('Admin Mounted')
	console.log(parent) // refers to the parent app
})


admin.get('/', function (req, res) {
	console.log(admin.mountpath) // /admin
	res.render("dashboard", {
		companyName: "Chroma Quilting"
	});

})


module.exports = admin;