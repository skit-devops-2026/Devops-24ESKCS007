const test = require('node:test');
const assert = require('node:assert');
const {
    propertiesData,
    extraProperties,
    calculatePriceInCr,
    formatIndianCurrency
} = require('../script.js');

test('Properties Data Schema & Integrity', async (t) => {
    await t.test('propertiesData contains valid initial listings', () => {
        assert.ok(Array.isArray(propertiesData));
        assert.ok(propertiesData.length >= 5, 'Should have at least 5 default properties');
    });

    await t.test('each property has required attributes', () => {
        propertiesData.forEach((prop) => {
            assert.ok(typeof prop.id === 'number', `Property #${prop.id} must have numeric id`);
            assert.ok(typeof prop.title === 'string' && prop.title.length > 0, `Property #${prop.id} must have title`);
            assert.ok(typeof prop.price === 'number' && prop.price > 0, `Property #${prop.id} must have positive price`);
            assert.ok(typeof prop.type === 'string', `Property #${prop.id} must have type`);
            assert.ok(typeof prop.city === 'string', `Property #${prop.id} must have city`);
            assert.ok(typeof prop.beds === 'number' && prop.beds > 0, `Property #${prop.id} must have beds`);
            assert.ok(typeof prop.sqft === 'number' && prop.sqft > 0, `Property #${prop.id} must have sqft`);
            assert.ok(typeof prop.image === 'string' && prop.image.startsWith('http'), `Property #${prop.id} must have image URL`);
        });
    });

    await t.test('extraProperties contains valid additional commercial/residential items', () => {
        assert.ok(Array.isArray(extraProperties));
        assert.ok(extraProperties.length > 0);
        extraProperties.forEach((prop) => {
            assert.ok(prop.id > 0);
            assert.ok(prop.title.length > 0);
            assert.ok(prop.price > 0);
        });
    });
});

test('Pricing & Currency Helpers', async (t) => {
    await t.test('calculatePriceInCr converts INR to Crores correctly', () => {
        assert.strictEqual(calculatePriceInCr(10000000), 1.00);
        assert.strictEqual(calculatePriceInCr(165000000), 16.50);
        assert.strictEqual(calculatePriceInCr(85000000), 8.50);
        assert.strictEqual(calculatePriceInCr(0), 0);
        assert.strictEqual(calculatePriceInCr(-500), 0);
    });

    await t.test('formatIndianCurrency formats numbers with Rupee symbol', () => {
        const formatted = formatIndianCurrency(15000000);
        assert.ok(formatted.startsWith('₹'));
        assert.ok(formatted.includes('1,50,00,000') || formatted.includes('15,000,000'));
        assert.strictEqual(formatIndianCurrency(-10), '₹0');
    });
});
