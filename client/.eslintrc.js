module.exports = {
    "extends": "airbnb",
    "plugins": [
      "react",
      "jsx-a11y",
      "import"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true,
        "modules": true
      }
    },
    "env": {
      browser: true,
      es6: true
    },
    "rules": {
      'react/prefer-stateless-function': 0,
      "react/jsx-filename-extension": 0,
      "no-shadow": 0,
    },
    "globals": {
      "document": false
    }
};