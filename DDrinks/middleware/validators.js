// Validação de email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validação de senha forte
export const isStrongPassword = (password) => {
  return password.length >= 8;
};

// Validação de username
export const isValidUsername = (username) => {
  return username.length >= 3 && username.length <= 20 && /^[a-zA-Z0-9_-]+$/.test(username);
};

// Validação de telefone
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Validação de data
export const isValidDate = (dateString) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

// Sanitização de entrada
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

// Validação de número
export const isValidNumber = (value) => {
  return !isNaN(value) && isFinite(value) && value >= 0;
};

