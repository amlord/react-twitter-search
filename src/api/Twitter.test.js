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
        it('Get Bearer Token', () => {
            
        });
    });

    describe('Search', () => {
        it('', () => {
            
        });
    });
});
