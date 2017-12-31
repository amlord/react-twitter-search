import { CONSUMER_KEY, CONSUMER_SECRET } from './Twitter.conf';

describe('Twitter API', () => {
    it('Consumer Key Set', () => {
        expect(CONSUMER_KEY).toBeTruthy();
    });
    it('Consumer Secret Set', () => {
        expect(CONSUMER_SECRET).toBeTruthy();
    });
});
