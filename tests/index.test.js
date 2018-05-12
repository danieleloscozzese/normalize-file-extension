'use strict';

const normalizeFileExtension = require('../index.js');

describe('The normalization function', () => {
    describe('validation', () =>{
        it('throws when given a number', () => {
            expect(() => normalizeFileExtension(5)).toThrow(TypeError)
        })

        it('throws when given a boolean', () => {
            expect(() => normalizeFileExtension(true)).toThrow(TypeError)
            expect(() => normalizeFileExtension(false)).toThrow(TypeError)            
        })

        it('throws when given a object', () => {
            expect(() => normalizeFileExtension({})).toThrow(TypeError)            
        })

        it('throws when given null', () => {
            expect(() => normalizeFileExtension(null)).toThrow(TypeError)            
        })

        it('throws when given undefined', () => {
            expect(() => normalizeFileExtension(undefined)).toThrow(TypeError)            
        })

        it('throws when given a Symbol', () => {
            expect(() => normalizeFileExtension(Symbol.for('value'))).toThrow(TypeError)            
        })
    })

    describe('processing', () => {
        it('returns the given value when it does not begin with a dot', () => {
            const extensionName= 'html'
            
            const normalizedExtension = normalizeFileExtension(extensionName);

            expect(normalizedExtension).toEqual(extensionName)
        })

        it('strips the dot from a value when given a dotted extension', () => {
            const normalizedExtension = normalizeFileExtension('.html');

            expect(normalizedExtension).toEqual('html')
        })

        it('does not change values with dots in the non-first position', () => {
            const extensionName= 'test.js'
            
            const normalizedExtension = normalizeFileExtension(extensionName);

            expect(normalizedExtension).toEqual(extensionName)
        })

        it('removes only the first dot from values with dots in the non-first position', () => {            
            const normalizedExtension = normalizeFileExtension('.test.js');

            expect(normalizedExtension).toEqual('test.js')
        })
    })
})