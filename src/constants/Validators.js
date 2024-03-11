export const titleValidator = (title) => {
  const gibberishRegex = /(.)\1{2,}/; 
  if (gibberishRegex.test(title)) {
    return false; 
  }
  const titleRegex = /^(?:[A-Z][a-z]*|[A-Z]+)(?:\s(?:[A-Z][a-z]*|[A-Z]+|[a-z]+))*$/
  return titleRegex.test(title);
};

export const descriptionValidator = (description) => {
  const gibberishRegex = /(.)\1{3,}/; 
  if (gibberishRegex.test(description)) {
    return false; 
  }
  const descriptionRegex = /^(?:[A-Z][a-z]*|[A-Z]+)(?:\s(?:[A-Z][a-z]*|[A-Z]+|[a-z]+|\d+))*$/
  return /\b[A-Z][a-z]*\b/.test(description) && descriptionRegex.test(description);
};
