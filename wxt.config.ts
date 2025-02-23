import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ["commands", "tabs", "activeTab", "background"],
    commands: {
      "change-github-link-to-gitingest-link": {
        description: "Change GitHub link to Gitingest link",
        suggested_key: {
          default: "Ctrl+Shift+G",
          mac: "Command+Shift+G",
        },
      },
    },
  },
  manifestVersion: 3,
  dev: {
    server: {
      port: 5187
    }
  },
});
