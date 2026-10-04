/**
 * The HTTP API allows scripts to send HTTP requests to web services,
 * enabling integration between Memento Database and external systems.
 *
 * All HTTP operations are performed through the Http object,
 * which is accessed via the global http() function.
 * @description
 * NOTE: HTTP requests must be executed asynchronously in the last Phase of an Event
 * NOTE: The library must have the “Network” permission enabled
 * @example
 * // Get current exchange rate from API
 * var result = http().get("https://data.fixer.io/api/latest?access_key=[API Key]");
 *
 * // Parse the JSON response
 * var usdToEur = JSON.parse(result.body)["rates"]["EUR"];
 * log("Current USD to EUR rate: " + usdToEur);
 *
 * // Update entry with converted price
 * var usdPrice = entry().field("PriceUSD");
 * var eurPrice = usdPrice * usdToEur;
 * entry().set("PriceEUR", eurPrice);
 * log("Converted " + usdPrice + " USD to " + eurPrice + " EUR");
 *
 * @see https://scripts.mementodatabase.com/script_api/http/
 * @see https://scripts.mementodatabase.com/script_api/http/#examples
 */

declare global {
  /**
   * Global function that returns an Http object for making HTTP requests.
   * @returns A new Http object instance for making HTTP requests
   * @example
   * var httpClient = http();
   * log("Created new HTTP client");
   * @see https://scripts.mementodatabase.com/script_api/http/#http-1
   */
  function http(): HttpObject;
}

/**
 * The Http object provides methods for making HTTP requests and managing request headers.
 * It is obtained through the global http() function.
 * @see https://scripts.mementodatabase.com/script_api/http/#http-object
 */
export interface HttpObject {
  /**
   * Executes an HTTP GET request to the specified URL.
   * @param url The complete URL starting with http:// or https://
   * @returns Object containing the response from the HTTP request
   * @example
   * var result = http().get("http://api.fixer.io/latest?base=USD");
   * log("Response code: " + result.code);
   * log("Response body: " + result.body);
   * @see https://scripts.mementodatabase.com/script_api/http/#geturl
   */
  get(url: string): HttpResult;

  /**
   * Executes an HTTP POST request to the specified URL with the given body content.
   * PATCH and PUT requests are also supported through patch(…) and put(…) using the same parameter structure.
   * @param url The complete URL starting with http:// or https://
   * @param body The content to send in the POST request body
   * @returns Object containing the response from the HTTP request
   * @example
   * var result = http().post("http://httpbin.org/post", "Hello World");
   * log("POST response code: " + result.code);
   * @see https://scripts.mementodatabase.com/script_api/http/#posturl-body
   */
  post(url: string, body: string): HttpResult;

  /**
   * Executes an HTTP DELETE request to the specified URL.
   * @param url The complete URL starting with http:// or https://
   * @returns Object containing the response from the HTTP request
   * @example
   * // Delete a resource on the server
   * var result = http().del("http://httpbin.org/delete");
   * log("DELETE response code: " + result.code);
   * @see https://scripts.mementodatabase.com/script_api/http/#delurl
   */
  del(url: string): HttpResult;

  /**
   * Sets HTTP headers for subsequent requests.
   * @param info Key-value pairs of header names and values
   * @returns The Http object (for method chaining)
   * @example
   * var httpClient = http();
   * httpClient.headers({"User-Agent": "Memento Script", "Accept": "application/json"});
   * var result = httpClient.get("http://httpbin.org/get");
   * log("Request with custom headers completed: " + result.code);
   * @see https://scripts.mementodatabase.com/script_api/http/#headersinfo
   */
  headers(info: string): this;
}

/**
 * The HttpResult object contains the response from an HTTP request.
 * @see https://scripts.mementodatabase.com/script_api/http/#httpresult-object
 */
export interface HttpResult {
  /** The response body as text */
  body: string;

  /** The HTTP status code of the response (e.g., 200 for success) */
  code: number;

  /**
   * Retrieves a specific header from the response.
   * @param tag The name of the header to retrieve
   * @returns The value of the specified header
   * @example
   * var result = http().get("http://httpbin.org/get");
   * var etag = result.header("etag");
   * log("Response ETag: " + etag);
   * @see https://scripts.mementodatabase.com/script_api/http/#headertag
   */
  header(tag: string): string;
}
