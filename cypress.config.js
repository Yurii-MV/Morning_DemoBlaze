const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    retries: 0,
    baseUrl: 'https://www.demoblaze.com/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUserData() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            name: `YuriiMV${randomNumber}`,
            password: `Qwerty${randomNumber}@`
          };
        }
      });
    }
  }
});
