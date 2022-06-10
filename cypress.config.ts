import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: '*/integration/*.ts',
  },
  env: {
    user_email: "chilitest35@gmail.com"
  }
});
