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

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const mode = (array) => {
  if (array.length === 0) {
    return null;
  }

  const modeMap = {};
  let maxEl = array[0];
  let maxCount = 1;
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    if (modeMap[el] == null) {
      modeMap[el] = 1;
    } else {
      modeMap[el] += 1;
    }

    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
};
