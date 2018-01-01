import request from 'request';

import { KEY, TIMELINE_URL, SEARCH_URL } from './Twitter.conf';

const Twitter = {
    fetchUserTimeline: function(user) {
        const options = {
            method: 'GET',
            url: TIMELINE_URL + "/" + user,
            qs: {
                "key": KEY
            },
            json: true
        };

        return new Promise((resolve, reject) => {
            request(options, function(error, response, body) {
                // connection issue
                if( error ){
                    reject('connection_error');
                }

                // request issue
                if( response.hasOwnProperty('errors') ){
                    reject(response.errors[0].label);
                }

                resolve(body);
            });
        });
    },
    searchTweets: function(search) {
        const options = {
            method: 'GET',
            url: SEARCH_URL + "/" + search,
            qs: {
                "key": KEY
            },
            json: true
        };

        return new Promise((resolve, reject) => {
            request(options, function(error, response, body) {
                // connection issue
                if( error ){
                    reject('connection_error');
                }

                // request issue
                if( response.hasOwnProperty('errors') ){
                    reject(response.errors[0].label);
                }

                resolve(body);
            });
        });
    }
};

export { Twitter };