const test = require('node:test');
const assert = require('node:assert');
const { validatePropertyListing } = require('../script.js');

test('Property Listing Submission Validation', async (t) => {
    await t.test('accepts a valid property listing submission', () => {
        const validListing = {
            title: 'Spacious 3BHK Penthouse in Bandra',
            price: 150000000,
            type: 'Penthouse',
            beds: 3,
            sqft: 2200
        };
        const res = validatePropertyListing(validListing);
        assert.strictEqual(res.isValid, true);
        assert.strictEqual(res.errors.length, 0);
    });

    await t.test('rejects listing with empty or too short title', () => {
        const invalidListing = {
            title: 'AB',
            price: 1000000,
            type: 'Flat',
            beds: 2,
            sqft: 800
        };
        const res = validatePropertyListing(invalidListing);
        assert.strictEqual(res.isValid, false);
        assert.ok(res.errors.some(e => e.includes('Title')));
    });

    await t.test('rejects non-positive price or NaN price', () => {
        const invalidPrice = {
            title: 'Luxury Villa in Whitefield',
            price: -50000,
            type: 'Villa',
            beds: 4,
            sqft: 3000
        };
        const res = validatePropertyListing(invalidPrice);
        assert.strictEqual(res.isValid, false);
        assert.ok(res.errors.some(e => e.includes('Price')));
    });

    await t.test('rejects unapproved property types', () => {
        const invalidType = {
            title: 'Modern Space in Town',
            price: 5000000,
            type: 'Spaceship',
            beds: 1,
            sqft: 500
        };
        const res = validatePropertyListing(invalidType);
        assert.strictEqual(res.isValid, false);
        assert.ok(res.errors.some(e => e.includes('property type')));
    });

    await t.test('rejects missing or zero bedrooms and sqft', () => {
        const zeroBeds = {
            title: 'Studio Apartment',
            price: 3000000,
            type: 'Flat',
            beds: 0,
            sqft: 0
        };
        const res = validatePropertyListing(zeroBeds);
        assert.strictEqual(res.isValid, false);
        assert.strictEqual(res.errors.length, 2);
    });

    await t.test('handles null or invalid argument gracefully', () => {
        const res = validatePropertyListing(null);
        assert.strictEqual(res.isValid, false);
        assert.ok(res.errors.length > 0);
    });
});
