/**
 * Convert string to regular expression - contains 'string'.
 *
 * @param {String} str
 *
 * @return
 *  Regular expression of text or regex - get all
 *
 */
const toRegex = str =>
  str ? new RegExp(str.toLowerCase().trim(), 'i') : /[\s\S\d]*/;

export default { toRegex };
