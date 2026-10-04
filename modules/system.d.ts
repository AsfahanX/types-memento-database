/**
 * @see https://scripts.mementodatabase.com/script_api/system/
 */

declare global {
  /**
   * Stops the current system operation that triggered the event.
   * Useful for preventing operations during validation phases.
   * @description
   * This method works only in triggers or event scripts executed before saving or before creating an entry.
   * @example
   * // Prevent saving if validation fails
   * if (!isValid) {
   *     log("Validation failed - canceling save");
   *     cancel();
   * }
   * @see https://scripts.mementodatabase.com/script_api/system/#cancel
   */
  function cancel(): void;

  /**
   * Terminates script execution immediately.
   * @example
   * log("Performing early exit");
   * exit();
   * @see https://scripts.mementodatabase.com/script_api/system/#exit
   */
  function exit(): void;

  /**
   * Returns information about the current system environment.
   * @example
   * let sys = system();
   * log("Operating system: " + sys.os);
   * log("Current user: " + sys.username);
   * @see https://scripts.mementodatabase.com/script_api/system/#system-1
   */
  function system(): SystemObject;

  /**
   * Generates a random unique identifier string.
   * @example
   * let uniqueId = guid();
   * log("Generated ID: " + uniqueId);
   * @see https://scripts.mementodatabase.com/script_api/system/#guid
   */
  function guid(): string;

  /**
   * Creates an Intent object for inter-application communication (Android only).
   * @param action Standard Android intent action (e.g., “android.intent.action.VIEW”)
   * @example
   * // Create intent to dial a phone number
   * let i = intent("android.intent.action.DIAL");
   * i.data("tel:+1234567890");
   * i.send();
   * @see https://scripts.mementodatabase.com/script_api/system/#intentaction
   */
  function intent(action: IntentAction): Intent;
}

/**
 * @see https://scripts.mementodatabase.com/script_api/system/#system-object
 */
export interface SystemObject {
  /** Operating system name */
  os: string;
  /** Current user’s username */
  username: string;
}

type IntentAction =
  | "android.intent.action.DIAL"
  | "android.intent.action.EDIT"
  | "android.intent.action.INSERT"
  | "android.intent.action.MAIN"
  | "android.intent.action.PICK"
  | "android.intent.action.SEND"
  | "android.intent.action.SENDTO"
  | "android.intent.action.VIEW";

type MimeType = "text/plain" | "image/jpeg";

/**
 * Represents an Android Intent for inter-application communication.
 * @see https://scripts.mementodatabase.com/script_api/system/#intent-object
 */
export interface Intent {
  action(action: IntentAction): this;
  extraArrayInt(): this;
  extraBool(): this;
  extraDouble(): this;
  extraInt(): this;
  extraUri(): this;
  packageName(name: string): this;

  /**
   * Sets the data URI for the intent.
   * @param uri URI for the data (e.g., “tel:”, “mailto:”, file path)
   * @example
   * let i = intent("android.intent.action.VIEW");
   * i.data("http://example.com");
   * @see https://scripts.mementodatabase.com/script_api/system/#datauri
   */
  data(uri: string): this;

  /**
   * Adds extra data to the intent as key-value pairs.
   * @param key Key identifier for the extra data
   * @param value Value to associate with the key
   * @example
   * let i = intent("android.intent.action.SEND");
   * i.extra("android.intent.extra.TEXT", "Hello World");
   * @see https://scripts.mementodatabase.com/script_api/system/#extrakey-value
   */
  extra(key: string, value: unknown): this;

  /**
   * Adds extra data specifically as Long type values.
   * @param key Key identifier for the extra data
   * @param value Long value to associate with the key
   * @example
   * // Calendar event example
   * let i = intent("android.intent.action.INSERT");
   * i.data("content://com.android.calendar/events");
   * i.extraLong("beginTime", new Date().getTime());
   * @see https://scripts.mementodatabase.com/script_api/system/#extralongkey-value
   */
  extraLong(key: string, value: number): this;

  /**
   * Sets the MIME type for the intent data.
   * @param mime MIME type (e.g., “text/plain”, “image/jpeg”)
   * @example
   * let i = intent("android.intent.action.SEND");
   * i.mimeType("text/plain");
   * @see https://scripts.mementodatabase.com/script_api/system/#mimetypemime
   */
  mimeType(mime: MimeType): this;

  /**
   * Executes the intent, sending it to the Android system.
   * @example
   * // Complete SMS example
   * let i = intent("android.intent.action.SENDTO");
   * i.data("smsto:+1234567890");
   * i.extra("sms_body", "Hello from Memento!");
   * i.send();
   * @see https://scripts.mementodatabase.com/script_api/system/#send
   */
  send(): void;
}
