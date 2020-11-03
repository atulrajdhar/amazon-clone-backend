import { expect } from 'chai';
import validateUsername from '../helpers/validateUsername';

describe('validateUsername', () => {
    it('should fail when username is null', () => {        
        expect( () => {
            validateUsername(null);
        }).to.throw(Error);
    });

    it('should fail when username is an empty string', () => {        
        expect ( () => {
            validateUsername("");
        }).to.throw(Error);
    });

    it('should fail when username contains fewer than 6 characters', () => {
        const usernames = ['a', 'ab', 'abc', 'abcd', 'abcde'];
        usernames.forEach(username => {
            expect ( () => {
                validateUsername(username);
            }).to.throw(Error); 
        });
    });

    it('should fail when username contains other special character than _', () => {
        const usernames = ['!abcde', 'a$bcde', 'ab<cde', 'abc|de', 'abcde#',
                           'a@b*cde', '%^()[]-+=/,.?~`{}:;|' ];
        usernames.forEach(username => {
            expect ( () => {
                validateUsername(username);
            }).to.throw(Error); 
        });
    });    

    it('should fail when username do not contain an alphabet', () => {
        const usernames = ["123456", "1_2_3_", "______"];
                                   
        usernames.forEach(username => {
            expect ( () => {
                validateUsername(username);
            }).to.throw(Error);
        });
    });

    it('should pass when username contains no error', () => {
        const usernames = ["abcdef", "abc_def", "abc123", "abc_123",
                           "123ABC", "_123abc", "_abcdef"];                                   
        usernames.forEach(username => {
            expect ( () => {
                validateUsername(username);
            }).to.not.throw(Error);
        });
    });
});