const {$inject, $install} = require('./anchor');
const credentials = require('../../test-credentials.config');
const rbapi = require('rbapi');

describe('Anchor', () => {
    describe('Injecting robinhood as a dependency', () => {
        it('should be able to install robinhood', async () => {
            const robinhood = await rbapi.create(credentials);
            $install('robinhood', robinhood);

            const actualRobinhood = $inject('robinhood');

            expect(actualRobinhood).toEqual(robinhood);
        });
    });
});
