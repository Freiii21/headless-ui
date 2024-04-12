# Headless ui

### Project setup
```
npm install
```

### Environment configuration
See ``config/app/config.json``

### Compilation and hot-reload for development
```
npm start
```

### Creating build for production
```
npm run build
```

### Styles convention
Global styles for the entire project
``
src/ui/style/globalStyles.ts
``

The project uses adaptive layout to correctly display the application on different screen sizes.\
To maintain this behavior, please specify all sizes in ``rem`` (including for imported svg).\
For convenience, the environment is configured in such a way that ``1rem`` is equal to ``10px`` (* on the fixed screen sizes, see globalStyles.ts).

It is also necessary to use predefined sets of colors ``src/ui/style/colors.ts`` and font sizes ``src/ui/style/fonts.ts``\
If you need additional ones, just add them to the collections.