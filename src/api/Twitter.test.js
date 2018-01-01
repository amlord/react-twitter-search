import { CONSUMER_KEY, CONSUMER_SECRET } from './Twitter.conf';
import { Twitter } from './Twitter';

describe('Twitter API', () => {
    describe('Config', () => {
        it('Consumer Key Set', () => {
            expect( CONSUMER_KEY ).toBeTruthy();
        });

        it('Consumer Secret Set', () => {
            expect( CONSUMER_SECRET ).toBeTruthy();
        });

        it('Encode Secret', () => {
            expect( Twitter.encodeSecret( CONSUMER_KEY, CONSUMER_SECRET ) ).toBeTruthy();
        });
    });

    describe('Authentication', () => {
        it('Consumer Secret Set', () => {
            //expect(CONSUMER_SECRET).toBeTruthy();
        });
    });
});
