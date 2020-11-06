import { expect } from 'chai';
import validatePassword from '../../helpers/validatePassword';

describe('validatePassword', () => {    
    it('should fail when password is null', () => {        
        expect( () => {
            validatePassword(null);
        }).to.throw(Error);
    });

    it('should fail when password is an empty string', () => {        
        expect ( () => {
            validatePassword("");
        }).to.throw(Error);
    });

    it('should fail when password contains fewer than 8 characters', () => {
        const passwords = ['a', 'ab', 'abc', 'abcd', 'abcde',
                           'abcdef', 'abcdefg'];
        passwords.forEach(password => {
            expect ( () => {
                validatePassword(password);
            }).to.throw(Error); 
        });
    });

    it('should fail when password do not contain a special character', () => {
        const passwords = ["abcdefgh", "abc12345", "12345678",
                           "123abcde", "abc123def", "123abc456",
                           "asd98f7as9d8f7as98d7fa90s8dfa09s8d"];
        passwords.forEach(password => {
            expect ( () => {
                validatePassword(password);
            }).to.throw(Error);
        });
    });

    it('should fail when password do not contain a numeric character', () => {
        const passwords = ["@abcdefgh", "!abcdefg@", "!@#$%^&*?_",
                           "!@$abcde", "a!bc@d?f", "a#b^c&d@",
                           ];
        passwords.forEach(password => {
            expect ( () => {
                validatePassword(password);
            }).to.throw(Error);
        });
    });

    it('should fail when password do not contain an alphabet', () => {
        const passwords = ["!1@2#3$4", "5%6^7&8*"];
                                   
        passwords.forEach(password => {
            expect ( () => {
                validatePassword(password);
            }).to.throw(Error);
        });
    });

    it('should fail when password contains an invalid character', () => {
        const passwords = ["!1ab<de2", "abc,def1%", "$abc.def;5"];                                   
        passwords.forEach(password => {
            expect ( () => {
                validatePassword(password);
            }).to.throw(Error);
        });
    });

    it('should pass when password contains no error', () => {
        const passwords = ["!1abcde2", "abcdef1%", "$abcdef5"];                                   
        passwords.forEach(password => {
            expect ( () => {
                validatePassword(password);
            }).to.not.throw(Error);
        });
    });
});