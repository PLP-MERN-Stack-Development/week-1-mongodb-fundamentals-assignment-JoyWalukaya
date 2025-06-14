// queries.js
// MongoDB Queries for Week 1 Assignment

// Task 2: Basic CRUD Operations

// Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } })

// Find books by a specific author
db.books.find({ author: "George Orwell" })

// Update the price of a specific book
db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { price: 15.99 } }
)

// Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" })

// Task 3: Advanced Queries

// Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// Projection: return only title, author, and price
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)

// Sort by price ascending
db.books.find().sort({ price: 1 })

// Sort by price descending
db.books.find().sort({ price: -1 })

// Pagination: limit & skip
db.books.find().skip(0).limit(5)
db.books.find().skip(5).limit(5)
db.books.find().skip(10).limit(5)

// Task 4: Aggregation Pipeline

// Calculate average price by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
])

// Find author with most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])

// Group books by publication decade and count
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $toString: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } },
          "s"
        ]
      },
      count: { $sum: 1 }
    }
  }
])

// Task 5: Indexing

// Create index on title
db.books.createIndex({ title: 1 })

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })
