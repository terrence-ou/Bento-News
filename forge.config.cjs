require("dotenv").config();

module.exports = {
  packagerConfig: {
    icon: "resources/icon",
    ignore: [
      /^\/src/,
      /(.eslintrc.json)|(.gitignore)|(electron.vite.config.ts)|(forge.config.cjs)|(tsconfig.*)/,
    ],
    osxSign: {},
    osxNotarize: {
      tool: "notarytool",
      appleId: process.env.VITE_APPLE_ID,
      appleIdPassword: process.env.VITE_APPLE_PASSWORD,
      teamId: process.env.VITE_TEAM_ID,
    },
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-dmg",
      config: {
        name: "Bento News Installer",
        icon: "resources/icon.icns",
      },
    },
  ],
};
