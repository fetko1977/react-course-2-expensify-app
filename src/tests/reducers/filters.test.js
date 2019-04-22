import filtersReducers from '../../reducers/filters';
import moment from 'moment';

test('should setup default filters value', () => {
    const state = filtersReducers(undefined, { type: '@@INIT'});

    expect(state).toEqual({
        categoryLabel: '',
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should be sortBy amount', () => {
    const state = filtersReducers(undefined, { type: 'SORT_BY_AMOUNT'});

    expect(state.sortBy).toBe('amount');
});

test('should be sortBy date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };

    const action = { type: 'SORT_BY_DATE' };

    const state = filtersReducers(currentState, action);
    
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const text = 'Test';

    const action = {
        type: 'SET_TEXT_FILTER',
        text
    }
    
    const state = filtersReducers(undefined, action);

    expect(state.text).toBe('Test');
});

//should set startDate filter
test('should set startDate filter', () => {
    const startDate = moment(0).add(2, 'days').valueOf();

    const action = {
        type: 'SET_START_DATE',
        startDate
    }

    const state = filtersReducers(undefined, action);

    expect(state.startDate).toEqual(startDate);
});

//should set endDate filter

test('should set endDate filter', () => {
    const endDate = moment(0).add(2, 'days').valueOf();

    const action = {
        type: 'SET_END_DATE',
        endDate
    }

    const state = filtersReducers(undefined, action);

    expect(state.endDate).toEqual(endDate);
});