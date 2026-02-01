import express from "express";
import {
  createBooksCollection,
  createBookIndex,
  insertOneBook,
  insertManyBooks,
  updateBookYear,
  findBookByTitle,
  findBooksByYearRange,
  findBooksByGenre,
  skipLimitBooks,
  yearIsInteger,
  excludeGenres,
  deleteBeforeYear,
  aggregate1,
  aggregate2,
  aggregate3,
  aggregate4,
} from "./book.service.js";

const router = express.Router();

router.post("/collection/", createBooksCollection);
router.post("/collection/index", async (req, res) => {
  const result = await createBookIndex(req.body);
  res.json(result);
});
router.post("/", async (req, res) => {
  const result = await insertOneBook(req.body);
  res.json(result);
});
router.post("/batch", async (req, res) => {
  const result = await insertManyBooks(req.body);
  res.json(result);
});

router.patch("/:title", async (req, res) => {
  const result = await updateBookYear(req.params);
  res.json(result);
});

router.get("/title", async (req, res) => {
  const result = await findBookByTitle(req.query);
  res.json(result);
})
router.get("/year", async (req, res) => {
  const books = await findBooksByYearRange(req.query);
  res.json(books);
});
router.get("/genre", async (req, res) => {
  const books = await findBooksByGenre(req.query);
  res.json(books);
});
router.get("/skip-limit", async (req, res) => {
  const books = await skipLimitBooks();
  res.json(books);
});
router.get("/year-integer", async (req, res) => {
  const books = await yearIsInteger();
  res.json(books);
})
router.get("/exclude-genres", async (req, res) => {
  const books = await excludeGenres();
  res.json(books);
});
router.delete("/before-year", async (req, res) => {
  const result = await deleteBeforeYear(req.query);
  res.json(result);
});

router.get("/aggregate1", async (req, res) => {
  const result = await aggregate1();
  res.json(result);
}); 
router.get("/aggregate2", async (req, res) => {
  const result = await aggregate2();
  res.json(result);
});
router.get("/aggregate3", async (req, res) => {
  const result = await aggregate3();
  res.json(result);
});
router.get("/aggregate4", async (req, res) => {
  const result = await aggregate4();
  res.json(result);
});

export default router;
