'use strict';

module.exports = extension =>
  extension.charAt(0) === '.' ? extension.slice(1) : extension;
