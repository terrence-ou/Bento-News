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
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "terrence-ou",
          name: "Bento-News",
        },
        prerelease: true,
      },
    },
  ],
  makers: [
    {
      name: "@electron-forge/maker-zip",
      config: {
        name: "BentoNews",
        icon: "resources/icon",
      },
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        name: "BentoNews",
        icon: "resources/icon.icns",
      },
    },
  ],
};
