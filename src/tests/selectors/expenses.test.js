import selectExpenses from '../../selectors/expenses';
import moment from 'moment';

import expenses from '../fixtures/expenses';

test('should filter by text value', () => {
    const filters= {
        categoryLabel: '',
        text: 'Gas',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([
        expenses[1]
    ]);
});

test('should filter by start date', () => {
    const filters = {
        categoryLabel: '',
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([
        expenses[2], expenses[0]
    ]);
});

//should filter by endDate
test('should filter by end date', () => {
    const filters = {
        categoryLabel: '',
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(3, 'days')
    };

    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([
        expenses[0], expenses[1]
    ]);
});

//should sort by date
test('should filter by end date', () => {
    const filters = {
        categoryLabel: '',
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([
        expenses[2], expenses[0], expenses[1]
    ]);
});

//should sort by amount
test('should filter by end date', () => {
    const filters = {
        categoryLabel: '',
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([
        expenses[2], expenses[1], expenses[0]
    ]);
});