/**
 * Model for associate a group of error messages with a key (generally form field id).
 */
class FieldError {
    key: string;
    errors: Array<string>
  }
  
  export { FieldError }
  