import { defineConfig } from 'cypress'
require('dotenv').config()

export default defineConfig({
  watchForFileChanges: true,
  e2e: {
      video: false,
  },
})
