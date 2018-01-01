import { CONSUMER_KEY, CONSUMER_SECRET, API_URL } from './Twitter.conf';
import { Twitter } from './Twitter';

describe('Twitter API', () => {
    describe('Config', () => {
        it('Consumer Key Set', () => {
            expect( CONSUMER_KEY ).toBeTruthy();
        });

        it('Consumer Secret Set', () => {
            expect( CONSUMER_SECRET ).toBeTruthy();
        });

        it('API URL Set', () => {
            // valid URL Regular Expression
            const urlRegEx = /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

            expect( urlRegEx.test( API_URL ) ).toBeTruthy();
        });

        it('Encode Secret', () => {
            expect( Twitter.encodeSecret( CONSUMER_KEY, CONSUMER_SECRET ) ).toBeTruthy();
        });
    });

    describe('Authentication', () => {
        const SECRET = Twitter.encodeSecret( CONSUMER_KEY, CONSUMER_SECRET );

        it('Bearer Token Fetched', () => {
            expect.assertions(2);
            return Twitter.fetchBearerToken( API_URL, SECRET ).then(data => {
                expect(data).toBeTruthy();
                expect(data).toHaveLength(112);
            });
        });

        it('Fails with error; bad secret data', () => {
            expect.assertions(1);
            return Twitter.fetchBearerToken( API_URL, 'SECRET' ).catch(e => expect(e).toMatch('authenticity_token_error'));
        });

        it('Fails with error; bad URL', () => {
            expect.assertions(1);
            return Twitter.fetchBearerToken( 'API_URL', SECRET ).catch(e => expect(e).toMatch('connection_error'));
        });
    });

    describe('Search', () => {
        // it('', () => {
            
        // });
    });
});
