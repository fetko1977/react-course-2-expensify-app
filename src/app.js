import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import VisibleExpenses from './selectors/expenses';
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

const expenseOne = store.dispatch(addExpense({
    description: 'This is my Water bill expense',
    note: '',
    amount: 1000,
    createdAt: 4500
}));

const expenseTwo = store.dispatch(addExpense({
    description: 'This is my Gas bill expense',
    note: '',
    amount: 1500,
    createdAt: 5000
}));

const expenseThree = store.dispatch(addExpense({
    description: 'This is my Rent bill expense',
    note: '',
    amount: 2000,
    createdAt: 1000
}));

const state = store.getState();

console.log(VisibleExpenses(state.expenses, state.filters));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
    
);

ReactDOM.render(jsx, document.getElementById('app'));