const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for Express .
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// register handlebar helpers
hbs.registerHelper("each", function (context, options) {
	var ret = "";

	for (var i = 0, j = context.length; i < j; i++) {
		ret = ret + options.fn(context[i]);
	}

	return ret;
});


//index.com
app.get("", (req, res) => {
	res.render("index", {
		nav: [{
				url: "#news",
				title: "News"
			},
			{
				url: "#services",
				title: "Services",
				jumboLink: true
			},
			{
				url: "#gallery",
				title: "Gallery"
			},
			{
				url: "#ourstory",
				title: "Our Story"
			},
			{
				url: "#contact",
				title: "Contact"
			},
		],

		secondaryNav: [{
				url: "#services",
				title: "Long-Arm Services",
			},
			{
				url: "#services",
				title: "T-Shirt & Memory Quilts"
			},
			{
				url: "#services",
				title: "Baby Blankets"
			},
			{
				url: "#classes",
				title: "Classes & Events"
			},
		],

		logoImg: "img/logos/chroma.png",

		masthead: {
			heading: "...Because A Quilt is a Hug that Lasts a Lifetime ",
			subheading: "CUSTOM T-SHIRT AND MEMORY QUILTS, LONG ARM SERVICES AND MORE."
		},
		services: [{
				title: "Long-Arm Services",
				desc: "Test",
				alt: "Image of long-arm sewing machine",
				img: "/img/icons/long-arm-icon.svg",
				bgColor: "bg-dark",
			},
			{
				title: "T-shirt & Memory Quilts",
				desc: "test",
				alt: "Image of quilt square",
				img: "/img/icons/quilt-icon.svg",
				bgColor: "bg-light",
			},
			{
				title: "Baby Blankets & Team Quilts",
				desc: "Test",
				alt: "Image of long-arm sewing machine icon",
				img: "/img/icons/quilt-squares-icon.svg",
				bgColor: "bg-dark",
			},
			{

				title: "Stuffed Animals, Pillows & More",
				desc: "Test",
				alt: "Image of an assortment of buttons icon",
				img: "/img/icons/buttons-icon.svg",
				bgColor: "bg-dark",
			},
		],

		news: [{
				category: "General",
				title: "New Store Hours",
				date: "10-16-20",
				desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.",
				img: "/img/main/store-front.jpg",
				alt: "Image of Chroma Quilting Store Front located at 127 E. 8th Street, Hays, KS  67601"
			},
			{
				category: "Classes",
				title: "Classes postponed",
				date: "10-16/20",
				desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.",
				img: "/img/main/classes.jpg",
				alt: "Image of class schedule."
			},
		],

		gallery: [{
				title: "T-shirt & Memory Quilts",
				desc: "test",
				img: "/img/portfolio/01-thumbnail.jpg",
				galleryHover: "gallery-hover",
				galleryHoverContent: "gallery-hover-content",
				hoverIcon: "fas fa-plus fa-3x"
			},
			{
				title: "T-shirt & Memory Quilts",
				desc: "test",
				img: "/img/icons/cotton-icon.svg",
				icon: true,
				bgColor: "bg-purple-light"
			},
			{
				title: "Long-Arm Services",
				desc: "Test",
				img: "/img/portfolio/02-thumbnail.jpg",
				galleryHover: "gallery-hover",
				galleryHoverContent: "gallery-hover-content",
				hoverIcon: "fas fa-plus fa-3x"

			},
			{
				title: "T-shirt & Memory Quilts",
				desc: "test",
				img: "/img/icons/star-pattern-icon.svg",
				icon: true,
				bgColor: "bg-blue"
			},
			{
				title: "T-shirt & Memory Quilts",
				desc: "test",
				img: "/img/icons/rotary-blade-icon.svg",
				icon: true,
				bgColor: "bg-yellow"
			},
			{
				title: "Stuffed Animals, Pillows & More",
				desc: "Test",
				img: "/img/portfolio/03-thumbnail.jpg",
				galleryHover: "gallery-hover",
				galleryHoverContent: "gallery-hover-content",
				hoverIcon: "fas fa-plus fa-3x"
			},
			{
				title: "T-shirt & Memory Quilts",
				desc: "test",
				img: "/img/icons/bobbins-icon.svg",
				icon: true,
				bgColor: "bg-green",
				galleryIconContent: "So Many Colors",
			},
			{
				title: "Sewing & Quilting Classes",
				desc: "Test",
				img: "/img/portfolio/04-thumbnail.jpg",
				galleryHover: "gallery-hover",
				galleryHoverContent: "gallery-hover-content",
				hoverIcon: "fas fa-plus fa-3x"
			},
			{
				title: "Sewing & Quilting Classes",
				desc: "Test",
				img: "/img/portfolio/05-thumbnail.jpg",
				galleryHover: "gallery-hover",
				galleryHoverContent: "gallery-hover-content",
				hoverIcon: "fas fa-plus fa-3x"
			},
			{
				title: "T-shirt & Memory Quilts",
				desc: "test",
				img: "/img/icons/fabric-icon.svg",
				icon: true,
				bgColor: "bg-purple-dark"
			},
			{
				title: "Sewing & Quilting Classes",
				desc: "Test",
				img: "/img/portfolio/06-thumbnail.jpg",
				galleryHover: "gallery-hover",

			},
			{
				title: "T-shirt & Memory Quilts",
				desc: "test",
				img: "/img/icons/scissors-icon.svg",
				icon: true,
				bgColor: "bg-orange"
			},

		],

		about: {
			img: "/img/team/1.jpg",
		}
	});
});


// Require admin module 
const admin = require("../admin/admin");

app.use('/admin', admin) // mount the sub app

app.get("*", (req, res) => {
	res.render("404", {
		errorMessage: "This is sew embarassing.  Page not found!"
	});
});


// Set localhost
app.listen(3000, () => {
	console.log("Server is up and running on port 3000");
});