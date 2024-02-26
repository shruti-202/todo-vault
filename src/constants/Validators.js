export const titleValidator = (title) => {
  const titleRegex = /^[A-Z][a-zA-Z]*(\s[A-Z][a-zA-Z]*)*$/;
  return titleRegex.test(title);
};

export const descriptionValidator = (description) => {
  const descriptionRegex = /^[A-Z][a-z]*(?: [A-Za-z0-9][a-z0-9]*)*$/;
  return descriptionRegex.test(description);
};
