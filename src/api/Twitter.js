/*** create-twitter-bearer-token.js ***/
import request from 'request';

const Twitter = {
    encodeSecret: function(key, secret){
        return new Buffer(key + ':' + secret).toString('base64');
    },
    fetchBearerToken: function(url, secret){
        const options = {
            url,
            headers: {
                'Authorization': 'Basic ' + secret,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            body: 'grant_type=client_credentials'
        };

        return new Promise((resolve, reject) => {
            request.post(options, (error, response, body) => {
                if( error ){
                    reject('connection_error');
                }

                let responseData = JSON.parse(body);

                if( responseData.hasOwnProperty('errors') ){
                    reject(responseData.errors[0].label);
                }

                resolve(responseData.access_token);
            });
        });
    },
    fetchUserTimeline: function(url, user, token) {
        const options = {
            method: 'GET',
            url,
            qs: {
                "screen_name": user
            },
            json: true,
            headers: {
                "Authorization": "Bearer " + token
            }
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