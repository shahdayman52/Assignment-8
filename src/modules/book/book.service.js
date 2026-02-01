import { db } from "../../database/connection.js";

const booksCollection = db.collection("books");

//Q1
export const createBooksCollection = async (req, res) => {
  await db.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            minLength: 1,
          },
        },
      },
    },
  });
  res.json({ message: "books collection created" });
};

//Q4
export const createBookIndex = async () => {
  await booksCollection.createIndex({ title: 1 });
  return { message: "index created " };
};

//Q5
export const insertOneBook = async (data) => {
  const result = await booksCollection.insertOne(data);
  return result;
};

//Q6
export const insertManyBooks = async (data) => {
  const result = await booksCollection.insertMany(data);
  return result;
};

//Q8
export const updateBookYear = async (data) => {
  const { title } = data;

  const result = await booksCollection.updateOne(
    { title },
    { $set: { year: 2022 } },
  );

  return result;
};


//q9
export const findBookByTitle = async (data) => {
  const { title } = data;
  const book = await booksCollection.findOne({ title });
  return book;
};

//Q10
export const findBooksByYearRange = async (data) => {
  const { from, to } = data;
  const books = await booksCollection
    .find({ year: { $gte: Number(from), $lte: Number(to) } })
    .toArray();
  return books;
};

//q11
export const findBooksByGenre = async (data) => {
  const { genre } = data;
  const books = await booksCollection.find({ genres: genre }).toArray();
  return books;
};

//q12
export const skipLimitBooks = async () => {
  const books = await booksCollection
    .find()
    .sort({ year: -1 })
    .skip(2)
    .limit(3)
    .toArray();
  return books;
};

//13-
export const yearIsInteger = async () => {
  const books = await booksCollection
    .find({ year: { $type: "int" } })
    .toArray();
  return books;
};

//14-
export const excludeGenres = async () => {
  const books = await booksCollection
    .find({
      genres: { $nin: ["Horror", "Science Fiction"] },
    })
    .toArray();
  return books;
};

//15
export const deleteBeforeYear = async (data) => {
  const { year } = data;
  const result = await booksCollection.deleteMany({
    year: { $lt: Number(year) },
  });
  return result;
};

//16
export const aggregate1 = async () => {
  const result = await booksCollection
    .aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }])
    .toArray();
  return result;
};

//17
export const aggregate2 = async () => {
  const result = await booksCollection
    .aggregate([
      { $match: { year: { $gt: 2000 } } },
      {
        $project: {
          _id: 0,
          title: 1,
          author: 1,
          year: 1,
        },
      },
    ])
    .toArray();
  return result;
};

//18
 export const aggregate3 = async () => {
  const result = await booksCollection
    .aggregate([{ $unwind: "$genres" }])
    .toArray();
  return result;
};

//19
export const aggregate4 = async () => {
  const result = await booksCollection
    .aggregate([
      {
        $lookup: {
          from: "logs",
          localField: "_id",
          foreignField: "bookId",
          as: "logs",
        },
      },
    ])
    .toArray();
  return result;
};