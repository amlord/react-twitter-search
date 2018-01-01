const Twitter = {
    encodeSecret: function(key, secret){
        return new Buffer(key + ':' + secret).toString('base64');
    }
};

export { Twitter };