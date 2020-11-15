const router = require("express").Router();
let Book = require("../models/book.model");

router.route("/").get((req, res) => {
	Book.find()
		.then((books) => res.json(books))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
	const isbn = req.body.isbn;
	const title = req.body.title;
	const author = req.body.author;
	const publishing_date = Date(req.body.publishing_date);
	const posting_user = req.body.posting_user;
	const condition = req.body.condition;
	const book_points = Number(req.body.book_points);
	const available = Boolean(req.body.available);
	const image = req.body.image;
	const requested = Boolean(req.body.swap.requested);
	const accepted = Boolean(req.body.swap.accepted);
	const rejected = Boolean(req.body.swap.rejected);
	const shipped = Boolean(req.body.swap.shipped);
	const received = Boolean(req.body.swap.received);
	const request_date = Date(req.body.swap.request_date);
	const requesting_user = req.body.swap.requesting_user;

	const newBook = new Book({
		isbn,
		title,
		author,
		publishing_date,
		posting_user,
		condition,
		book_points,
		available,
		image,
		swap: {
			requested,
			accepted,
			rejected,
			shipped,
			received,
			request_date,
			requesting_user,
		},
	});

	newBook
		.save()
		.then(() => res.json("Book added!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

// Update a book field (currently used for accept and reject)
router.route('/update/:id').post((req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      book.swap.accepted = req.body.swap.accepted;
			book.swap.rejected = req.body.swap.rejected;
      book.save()
        .then(() => res.json('Book updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
