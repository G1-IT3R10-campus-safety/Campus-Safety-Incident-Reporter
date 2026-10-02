// ==========================================
// Business Layer: Incident Report Validation
// Course: IT3R10 • Group 1 (Campus Safety Incident Reporter)
// Assigned Member: Junrey Roxas
// Demonstrates: Separation of Business Logic from UI
// ==========================================

export function validateReport(report) {
  if (!report) {
    return { isValid: false, error: 'Report data is required.' };
  }

  const { title, category, description } = report;

  // Rule 1: Title Validation
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return { isValid: false, error: 'Incident title is required.' };
  }
  if (title.trim().length < 3) {
    return { isValid: false, error: 'Title must be at least 3 characters long.' };
  }
  if (title.trim().length > 60) {
    return { isValid: false, error: 'Title must not exceed 60 characters.' };
  }

  // Rule 2: Category Validation
  const validCategories = ['Security', 'Hazard', 'Medical', 'Facility'];
  if (!category || !validCategories.includes(category)) {
    return { isValid: false, error: 'Please select a valid incident category.' };
  }

  // Rule 3: Description Validation
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    return { isValid: false, error: 'Please provide an incident description.' };
  }
  if (description.trim().length < 5) {
    return { isValid: false, error: 'Description must be at least 5 characters for clarity.' };
  }

  // All business rules passed
  return { isValid: true, error: null };
}