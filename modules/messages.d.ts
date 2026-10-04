/**
 * @see https://scripts.mementodatabase.com/script_api/messages/
 * @see https://wiki.mementodatabase.com/index.php/Memento_JavaScript_Library#Interaction_with_the_system
 */

import type { IconCode, UIObject } from "./ui";

declare global {
  /**
   * Displays a brief notification message to the user.
   *
   * @param text The text content of the notification to display
   *
   * @example
   * message("Operation completed successfully");
   *
   * @see https://scripts.mementodatabase.com/script_api/messages/#messagetext
   */
  function message(text: string): void;

  /**
   * Writes a line to the script’s log file.
   * @param text 	The text to write to the log file
   * @example
   * log("Starting data processing...");
   * @see https://scripts.mementodatabase.com/script_api/messages/#logtext
   */
  function log(text: string): void;

  /**
   * Creates a dialog builder for constructing and displaying modal dialogs.
   * @returns a Dialog object that can be used to configure and display the dialog.
   *
   * @example
   * const myDialog = dialog()
   *    .title("Confirm Action")
   *    .text("Are you sure you want to proceed?")
   *    .positiveButton("Yes", () => {
   *        log("User confirmed action");
   *        return true;
   *    })
   *    .negativeButton("No", () => {
   *        log("User cancelled action");
   *        return true;
   *    })
   *    .show();
   *
   * @see https://scripts.mementodatabase.com/script_api/messages/#dialog
   */
  function dialog(): Dialog;

  /**
   * Creates a notification builder for constructing and displaying system notifications.
   * @returns a Notification object that can be used to configure and display the notification.
   * @example
   * notification()
   *     .id(1)
   *     .title("New Message")
   *     .text("You have received a new message")
   *     .bigText("Long message content here...")
   *     .show();
   * log("Notification displayed");
   * @see https://scripts.mementodatabase.com/script_api/messages/#notification
   */
  function notification(): Notification;
}

/**
 * A builder object for creating and customizing dialog windows.
 * @see https://scripts.mementodatabase.com/script_api/messages/#dialog-object
 */
export interface Dialog {
  /**
   * Sets the title of the dialog.
   * @param text The title text to display
   * @see https://scripts.mementodatabase.com/script_api/messages/#titletext
   */
  title(text: string): this;

  /**
   * Sets the main content text of the dialog.
   * @param text The main message text
   * @see https://scripts.mementodatabase.com/script_api/messages/#texttext
   */
  text(text: string): this;

  /**
   * Sets a custom view for the dialog.
   * @param uiObject A custom UI object to display in the dialog
   * @see https://scripts.mementodatabase.com/script_api/messages/#viewuiobject
   */
  view(uiObject: UIObject): this;

  /**
   * Adds a positive action button to the dialog.
   * @param text The button text
   * @param callback Function to execute when button is clicked
   * @see https://scripts.mementodatabase.com/script_api/messages/#positivebuttontext-callback
   */
  positiveButton(text: string, callback: () => boolean | void): this;

  /**
   * Adds a negative action button to the dialog.
   * @param text The button text
   * @param callback Function to execute when button is clicked
   * @see https://scripts.mementodatabase.com/script_api/messages/#negativebuttontext-callback
   */
  negativeButton(text: string, callback: () => boolean | void): this;

  /**
   * Adds a neutral action button to the dialog.
   * @param text The button text
   * @param callback Function to execute when button is clicked
   * @see https://scripts.mementodatabase.com/script_api/messages/#neutralbuttontext-callback
   */
  neutralButton(text: string, callback: () => boolean | void): this;

  /**
   * Controls whether the dialog automatically closes after button click.
   * @param autoDismiss If false, dialog only closes when callback returns true
   * @see https://scripts.mementodatabase.com/script_api/messages/#autodismissboolean
   */
  autoDismiss(autoDismiss: boolean): this;

  /**
   * Displays the configured dialog.
   * @see https://scripts.mementodatabase.com/script_api/messages/#show
   */
  show(): void;
}

/**
 * A builder object for creating and customizing system notifications.
 * @see https://scripts.mementodatabase.com/script_api/messages/#notification-object
 */
export interface Notification {
  /**
   * Sets the unique identifier for the notification.
   * @param value Unique ID for the notification
   * @see https://scripts.mementodatabase.com/script_api/messages/#idvalue
   */
  id(value: number | string): this;

  /**
   * Sets the notification title.
   * @param text The title text
   * @see https://scripts.mementodatabase.com/script_api/messages/#titletext-1
   */
  title(text: string): this;

  /**
   * Sets the notification content text.
   * @param content The main notification text
   * @see https://scripts.mementodatabase.com/script_api/messages/#textcontent
   */
  text(content: string): this;

  /**
   * Sets the expanded notification text.
   * @param content The expanded text content
   * @see https://scripts.mementodatabase.com/script_api/messages/#bigtextcontent
   */
  bigText(content: string): this;

  /**
   * Sets the small notification icon.
   * @param icon The icon code to use
   * @see https://scripts.mementodatabase.com/script_api/messages/#smalliconicon
   */
  smallIcon(icon: IconCode): this;

  /**
   * Sets the large notification icon.
   * @param icon Icon code or image URL
   * @see https://scripts.mementodatabase.com/script_api/messages/#largeiconicon
   */
  largeIcon(icon: IconCode): this;

  /**
   * Configures the notification to alert only once.
   * @see https://scripts.mementodatabase.com/script_api/messages/#alertonce
   */
  alertOnce(): this;

  /**
   * Displays the configured notification.
   * @see https://scripts.mementodatabase.com/script_api/messages/#show-1
   */
  show(): void;

  buttonAction: unknown;
  tapAction: unknown;
}
