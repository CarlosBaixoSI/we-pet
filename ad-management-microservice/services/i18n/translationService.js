//initialize i18n service
const i18n = require("i18n");
const path = require("path");
const dirname = './services/i18n/';
i18n.configure({
  locales: ["pt", "en"],
  directory: path.join(dirname + 'locales'),
  defaultLocale: "pt",
  queryParameter: "lang",
});

module.exports = i18n;
