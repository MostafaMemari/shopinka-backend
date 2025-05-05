/**
 * Compares two objects and returns only the fields that have changed.
 * @param original The original object (e.g., initial data from the database).
 * @param updated The updated object (e.g., form data).
 * @returns A partial object containing only the changed fields.
 */
function getChangedFields<T extends Record<string, any>>(original: T, updated: Partial<T>): Partial<T> {
  const changedFields: Partial<T> = {}

  // Iterate over the keys of the updated object
  for (const key in updated) {
    if (Object.prototype.hasOwnProperty.call(updated, key)) {
      // Compare values, handling null and undefined correctly
      if (original[key] !== updated[key]) {
        changedFields[key] = updated[key]
      }
    }
  }

  return changedFields
}

export default getChangedFields
