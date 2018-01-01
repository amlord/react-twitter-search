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
    }
};

export { Twitter };