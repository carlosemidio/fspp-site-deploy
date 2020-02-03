const bcrypt = require('bcryptjs');

const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('user', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should encrypt user password', async () => {
        const user = await User.create({ 
            name: 'test1', 
            email: 'test1@email.com', 
            password: 'ielwjlwiuoiwuoiuio1212121' 
        });

        const compare_hash = await bcrypt.compare('ielwjlwiuoiwuoiuio1212121', user.password_hash);

        expect(compare_hash).toBe(true);
    });
})