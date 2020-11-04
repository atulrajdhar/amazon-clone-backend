import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { compare } from 'bcryptjs';
import getBcryptHash from '../helpers/getBcryptHash';

chai.use(chaiAsPromised);

describe('getBcryptHash', () => {
    it('should not accept null string', async () => {
        await expect (
            getBcryptHash (null, 10)
        ).to.be.rejectedWith(Error);
    });

    it('should not accept empty string', async () => {
        await expect (
            getBcryptHash ("", 10)
        ).to.be.rejectedWith(Error);
    });

    it('should not accept a string of more than 72 bytes', async () => {
        const input = "string containing more than 72 bytes is not processed by bcrypt as it has an upper limit of 72 bytes.";
        await expect (
            getBcryptHash (input, 10)
        ).to.be.rejectedWith(Error);
    });

    it('should fail when salt is null', async () => {
        const input = "input";
        await expect (
            getBcryptHash (input, null)
        ).to.be.rejectedWith(Error);
    });

    it('should fail when salt is 0', async () => {
        const input = "input";
        await expect (
            getBcryptHash (input, 0)
        ).to.be.rejectedWith(Error);
    });

    it('should fail when salt is negative', async () => {
        const input = "input";
        await expect (
            getBcryptHash (input, -1)
        ).to.be.rejectedWith(Error);
    });

    it('should fail when salt is greater than 15', async () => {
        const input = "input";
        await expect (
            getBcryptHash (input, 16)
        ).to.be.rejectedWith(Error);
    });

    it('should generate a hash using bcryptjs', async () => {
        const input = "input";
        const salt = 10;        
        const getBcryptHashResult = await getBcryptHash(input, salt);
        const testResult = await compare(input, getBcryptHashResult);
        expect(testResult).to.be.true; 
    });

});