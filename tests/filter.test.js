const test = require('node:test');
const assert = require('node:assert');
const {
    propertiesData,
    filterPropertiesList,
    sortPropertiesList
} = require('../script.js');

test('Property Filtering Engine', async (t) => {
    await t.test('returns all properties when no filter is provided', () => {
        const results = filterPropertiesList(propertiesData, {});
        assert.strictEqual(results.length, propertiesData.length);
    });

    await t.test('filters properties by city query correctly', () => {
        const delhiProps = filterPropertiesList(propertiesData, { city: 'delhi' });
        assert.ok(delhiProps.length > 0);
        delhiProps.forEach(p => {
            const loc = (p.location + ' ' + p.city).toLowerCase();
            assert.ok(loc.includes('delhi'));
        });
    });

    await t.test('filters properties by max price in Crores', () => {
        const cheapProps = filterPropertiesList(propertiesData, { maxPriceCr: 10 });
        cheapProps.forEach(p => {
            assert.ok(p.price / 10000000 <= 10, `Property ${p.title} price ${p.price} exceeds 10 Cr`);
        });
    });

    await t.test('filters properties by property type (Flat, Villa, Penthouse)', () => {
        const villas = filterPropertiesList(propertiesData, { selectedTypes: ['Villa'] });
        assert.ok(villas.length > 0);
        villas.forEach(p => assert.strictEqual(p.type, 'Villa'));

        const flatsAndPenthouses = filterPropertiesList(propertiesData, { selectedTypes: ['Flat', 'Penthouse'] });
        flatsAndPenthouses.forEach(p => assert.ok(['Flat', 'Penthouse'].includes(p.type)));
    });

    await t.test('filters properties by BHK bedroom count', () => {
        const threeBhk = filterPropertiesList(propertiesData, { selectedBHK: '3' });
        threeBhk.forEach(p => assert.strictEqual(p.beds, 3));

        const fivePlusBhk = filterPropertiesList(propertiesData, { selectedBHK: '5+' });
        fivePlusBhk.forEach(p => assert.ok(p.beds >= 5));
    });

    await t.test('filters properties by furnishing status', () => {
        const furnished = filterPropertiesList(propertiesData, { selectedFurnishings: ['Furnished'] });
        furnished.forEach(p => assert.strictEqual(p.furnishing, 'Furnished'));
    });

    await t.test('combines multiple filter criteria simultaneously', () => {
        const combined = filterPropertiesList(propertiesData, {
            selectedTypes: ['Flat'],
            maxPriceCr: 10,
            selectedBHK: '3'
        });
        combined.forEach(p => {
            assert.strictEqual(p.type, 'Flat');
            assert.strictEqual(p.beds, 3);
            assert.ok(p.price / 10000000 <= 10);
        });
    });
});

test('Property Sorting Engine', async (t) => {
    await t.test('sorts properties by price ascending (price-low)', () => {
        const sorted = sortPropertiesList(propertiesData, 'price-low');
        for (let i = 1; i < sorted.length; i++) {
            assert.ok(sorted[i - 1].price <= sorted[i].price);
        }
    });

    await t.test('sorts properties by price descending (price-high)', () => {
        const sorted = sortPropertiesList(propertiesData, 'price-high');
        for (let i = 1; i < sorted.length; i++) {
            assert.ok(sorted[i - 1].price >= sorted[i].price);
        }
    });

    await t.test('defaults to ID sorting when default or unspecified', () => {
        const sorted = sortPropertiesList(propertiesData, 'default');
        for (let i = 1; i < sorted.length; i++) {
            assert.ok(sorted[i - 1].id <= sorted[i].id);
        }
    });
});
