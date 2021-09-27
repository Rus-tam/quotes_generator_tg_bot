const request = require('request');

const URL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json';

const quotesGenerator = (callback) => {
    request({ uri: URL, json: true}, (error, { body }) => {
        if (error) {
            callback('error', undefined);
        } else {
            callback(undefined, body);
        }
    });
};

module.exports = quotesGenerator;