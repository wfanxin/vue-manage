module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [ // element-ui样式
      "@babel/preset-env",
      { "modules": false }
    ]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
