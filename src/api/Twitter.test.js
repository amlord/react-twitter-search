import { CONSUMER_KEY, CONSUMER_SECRET, AUTH_URL, TIMELINE_URL, SEARCH_URL } from './Twitter.conf';
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

            expect( urlRegEx.test( AUTH_URL ) ).toBeTruthy();
        });

        it('Encode Secret', () => {
            expect( Twitter.encodeSecret( CONSUMER_KEY, CONSUMER_SECRET ) ).toBeTruthy();
        });
    });

    describe('Authentication', () => {
        const SECRET = Twitter.encodeSecret( CONSUMER_KEY, CONSUMER_SECRET );

        it('Bearer Token Fetched', () => {
            expect.assertions(2);
            return Twitter.fetchBearerToken( AUTH_URL, SECRET ).then(data => {
                expect(data).toBeTruthy();
                expect(data).toHaveLength(112);
            });
        });

        it('Fails with error; bad secret data', () => {
            expect.assertions(1);
            return Twitter.fetchBearerToken( AUTH_URL, 'SECRET' ).catch(e => expect(e).toMatch('authenticity_token_error'));
        });

        it('Fails with error; bad URL', () => {
            expect.assertions(1);
            return Twitter.fetchBearerToken( 'API_URL', SECRET ).catch(e => expect(e).toMatch('connection_error'));
        });
    });

    describe('API Calls', () => {
        let TOKEN;

        beforeAll(() => {
            const SECRET = Twitter.encodeSecret( CONSUMER_KEY, CONSUMER_SECRET );

            // promise to return the bearer token for this set of tests
            return Twitter.fetchBearerToken( AUTH_URL, SECRET ).then(data => {
                TOKEN = data;
            });
        });

        describe('User timeline', () => {
            it('Tweets fetched for @twitterapi', () => {
                expect.assertions(4);
                return Twitter.fetchUserTimeline( TIMELINE_URL, 'twitterapi', TOKEN ).then(data => {
                    expect(data).toBeInstanceOf(Array);
                    expect(data).toHaveLength(20);
                    expect(data[0]).toHaveProperty('created_at');
                    expect(data[0]).toHaveProperty('text');
                });
            });

            it('Fails with error; bad URL', () => {
                expect.assertions(1);
                return Twitter.fetchUserTimeline( 'TIMELINE_URL', 'twitterapi', TOKEN ).catch(e => expect(e).toMatch('connection_error'));
            });
        });

        describe('Search tweets', () => {
            it("Fetched tweets matching 'React'", () => {
                
                const SEARCH = 'React';

                expect.assertions(6);
                return Twitter.searchTweets( SEARCH_URL, SEARCH, TOKEN ).then(data => {
                    // cheeck search response structure
                    expect(data).toBeInstanceOf(Object);
                    expect(data).toHaveProperty('search_metadata');
                    expect(data.search_metadata).toHaveProperty('query', SEARCH);
                    expect(data).toHaveProperty('statuses');

                    // check first tweet structure
                    expect(data.statuses[0]).toHaveProperty('created_at');
                    expect(data.statuses[0]).toHaveProperty('text');
                });
            });

            it('Fails with error; bad URL', () => {
                expect.assertions(1);
                return Twitter.searchTweets( 'SEARCH_URL', 'React', TOKEN ).catch(e => expect(e).toMatch('connection_error'));
            });
        });
    });
});
