const { defineConfig } = require('cypress');
const path = require('path');

// Função para obter a data no formato YYYY-MM-DD

const getFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Obtém a data atual
const date = getFormattedDate();
const reportFilename = `report_${date}`;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://seubarriga.wcaquino.me/login',
    setupNodeEvents(on, config) {
      // Configurações dos eventos
    },
    video: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: reportFilename,
      overwrite: false,
      html: true
    },
  },
});
