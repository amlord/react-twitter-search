import { KEY, TIMELINE_URL, SEARCH_URL } from './Twitter.conf';
import { Twitter } from './Twitter';

// valid URL Regular Expression
const urlRegEx = /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

describe('Twitter API', () => {
    describe('Config', () => {
        it('Key Set', () => {
            expect( KEY ).toBeTruthy();
        });

        it('`Timeline` API URL Set', () => {
            expect( urlRegEx.test( TIMELINE_URL ) ).toBeTruthy();
        });

        it('`Search` API URL Set', () => {
            expect( urlRegEx.test( SEARCH_URL ) ).toBeTruthy();
        });
    });

    describe('API Calls', () => {
        describe('User timeline', () => {
            it('Tweets fetched for @twitterapi', () => {
                expect.assertions(4);
                return Twitter.fetchUserTimeline( 'twitterapi' ).then(data => {
                    expect(data).toBeInstanceOf(Array);
                    expect(data).toHaveLength(20);
                    expect(data[0]).toHaveProperty('created_at');
                    expect(data[0]).toHaveProperty('text');
                });
            });
        });

        describe('Search tweets', () => {
            it("Fetched tweets matching 'React'", () => {
                
                const SEARCH = 'React';

                expect.assertions(6);
                return Twitter.searchTweets( SEARCH ).then(data => {
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
        });
    });
});
