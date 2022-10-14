import formatMoney from '../lib/formatMoney';

    describe('Description', () => {
        test('should work with fractional dollars', () => {
            expect(formatMoney(506552)).toBe('$5,065.52');
            expect(formatMoney(1)).toBe('$0.01');
            expect(formatMoney(0)).toBe('$0');

        });

        test('should leave off cents whe its whole dollars', () => { 
            expect(formatMoney(100)).toBe('$1');
            expect(formatMoney(50000000)).toBe('$500,000');
        });

test('should work with whole and fractional dollars', () => { 
            expect(formatMoney(140)).toBe('$1.40');
            expect(formatMoney(5012)).toBe('$50.12');
            expect(formatMoney(110)).toBe('$1.10');
            expect(formatMoney(101)).toBe('$1.01');
         })
         
    });
    
