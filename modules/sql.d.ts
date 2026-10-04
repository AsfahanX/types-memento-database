/**
 * @see https://scripts.mementodatabase.com/script_api/sql/
 */

import type { Entry } from "./entries";

declare global {
  /**
   * Executes a SELECT SQL query and returns an SQL result object.
   * @param query The SELECT SQL query to execute using SQLite syntax
   * @example
   * let result = sql("SELECT COUNT(*) as total FROM MyLibrary");
   * log("Total records: " + result.asInt());
   * @see https://scripts.mementodatabase.com/script_api/sql/#sqlquery
   */
  function sql(query: string): SQLObject;
}

/**
 * The SQL object provides methods to access and manipulate query results in different formats.
 * @see https://scripts.mementodatabase.com/script_api/sql/#sql-object
 */
interface SQLObject {
  /**
   * Converts the query results into an array of JavaScript objects
   * where each object represents a row with column names as properties.
   * @example
   * let books = sql("SELECT id, Title, Author FROM MyLibrary").asObjects();
   * books.forEach(book => {
   *     log(`Book: ${book.Title} by ${book.Author}`);
   * });
   * @returns Array of objects where each object represents a row from the query results.
   * @see https://scripts.mementodatabase.com/script_api/sql/#asobjects
   */
  asObjects(): object[];

  /**
   * Returns query results as a list of Memento Database entry objects.
   * @example
   * let highRatedBooks = sql("SELECT id, Title, Rating FROM MyLibrary WHERE Rating > 4").asEntries();
   * highRatedBooks.forEach(entry => {
   *     log(`High rated book: ${entry.field("Title")}`);
   * });
   * @description
   * NOTE: The SQL query must include the id column
   * NOTE: Only fields specified in the SELECT statement will be included in the entries
   * NOTE: For better performance, specify needed fields instead of using SELECT *
   * @returns Array of Entry objects representing the matching database records.
   * @see https://scripts.mementodatabase.com/script_api/sql/#asentries
   */
  asEntries<T>(): Entry<T>[];

  /**
   * Returns the first column of the first row as an integer value.
   * @returns Integer value from the first column of the first row.
   * @example
   * let bookCount = sql("SELECT COUNT(*) FROM MyLibrary").asInt();
   * log(`Total number of books: ${bookCount}`);
   * @see https://scripts.mementodatabase.com/script_api/sql/#asint
   */
  asInt(): number;

  /**
   * Returns the first column of the first row as a floating-point number.
   * @returns Double (floating-point) value from the first column of the first row.
   * @example
   * let avgRating = sql("SELECT AVG(Rating) FROM MyLibrary").asDouble();
   * log(`Average book rating: ${avgRating.toFixed(2)}`);
   * @see https://scripts.mementodatabase.com/script_api/sql/#asdouble
   */
  asDouble(): number;

  /**
   * Returns the first column of the first row as a string.
   * @returns String value from the first column of the first row.
   * @example
   * let firstAuthor = sql("SELECT Author FROM MyLibrary ORDER BY Author LIMIT 1").asString();
   * log(`First author alphabetically: ${firstAuthor}`);
   * @see https://scripts.mementodatabase.com/script_api/sql/#asstring
   */
  asString(): string;
}
