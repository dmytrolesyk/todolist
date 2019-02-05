module.exports = {
    "extends": "airbnb-base",
    "globals": {
        App: true,
    },
    "env": {
        browser: true,
        node: true,
    },
    "rules": {
        "semi": [2, 'never'],
        "no-underscore-dangle": 0
    }
};

// https://github.com/okonet/lint-staged