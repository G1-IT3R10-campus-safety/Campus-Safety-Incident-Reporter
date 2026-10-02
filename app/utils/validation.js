// ==========================================
// Business Layer: Incident Report Validation
// Assigned Member: Junrey Roxas
// Demonstrates: Separation of Business Logic from UI
// ==========================================

export function validateReport(report) {
  const { title, category, description } = report;

  // Rule 1: Title validation
  if (!title || title.trim().length === 0) {
    return { isValid: false, error: 'Incident title is required.' };
  }
  if (title.trim().length < 3) {
    return { isValid: false, error: 'Title must be at least 3 characters long.' };
  }

  // Rule 2: Category validation
  if (!category) {
    return { isValid: false, error: 'Please select an incident category.' };
  }

  // Rule 3: Description validation
  if (!description || description.trim().length === 0) {
    return { isValid: false, error: 'Please provide a short description of the incident.' };
  }

  return { isValid: true, error: null };
}