module.exports = {
    "extends": "airbnb-base",
    "parser": "babel-eslint",
    "globals": {
        App: true,
    },
    "env": {
        browser: true,
        node: true,
        jest: true
    },
    "rules": {
        "semi": [2, 'never'],
        "no-underscore-dangle": 0
    }
};

// https://github.com/okonet/lint-staged