export const hasRoles = (userRoles, roles) => userRoles.some((role) => roles.includes(role));
export const isNumeric = (str) => {
  if (typeof str !== 'string') return false; // we only process strings!
  return (
    // eslint-disable-next-line no-restricted-globals
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    // eslint-disable-next-line no-restricted-globals
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};
