import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ["commands", "tabs", "activeTab", "background"],
    description: "Gitingest extension to open github links in gitingest",
    commands: {
      "_execute_action": {        
        description: "Open the popup menu."
      },
      "change-github-link-to-gitingest-link": {
        description: "Change GitHub link to Gitingest link",
        suggested_key: {
          default: "Ctrl+Shift+M",
          mac: "Command+Shift+M",
          windows: "Ctrl+Shift+M",  // Changed from Control to Ctrl
          linux: "Ctrl+Shift+M"     // Changed from Control to Ctrl
        },
        global: true,
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
