import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);

    expect(wrapper).toMatchSnapshot();
})

//should render expense form with expense data
test('should render expense form with expense data correctly', () => {
    const wrapper = shallow( <ExpenseForm /> );

    expect(wrapper).toMatchSnapshot();
})

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const wrapper = shallow( <ExpenseForm /> );
    const value = 'New description';
    wrapper.find('input').at(0).simulate('change', {target: { value }});

    expect(wrapper.state('description')).toBe('New description');
});

test('should set note on textarea change', () => {
    const wrapper = shallow( <ExpenseForm /> );
    const value = 'New note';
    wrapper.find('textarea').simulate('change', {target: { value }});

    expect(wrapper.state('note')).toBe('New note');
});

//should set amount if valid input
// 23.50
test('should set amount if valid input', () => {
    const wrapper = shallow( <ExpenseForm /> );
    const value = '23.50';
    wrapper.find('input').at(1).simulate('change', {target: { value }});

    expect(wrapper.state('amount')).toBe(value);
});

//should set amount with invalid input
// 12.122
test('should set amount with invalid input', () => {
    const wrapper = shallow( <ExpenseForm /> );
    const value = '12.122';
    wrapper.find('input').at(1).simulate('change', {target: { value }});

    expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    
    const wrapper = shallow( <ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy}/> );

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        categoryClass: expenses[1].categoryClass,
        categoryLabel: expenses[1].categoryLabel,
        description: expenses[1].description,
        amount: expenses[1].amount,
        note: expenses[1].note,
        createdAt: expenses[1].createdAt
    });
});

test('should set a new date on date changed', () => {
    const now = moment();
    const wrapper = shallow( <ExpenseForm /> );

    wrapper.find('SingleDatePicker').prop('onDateChange')(now);

    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focused on changed', () => {
    const focused = true;
    const wrapper = shallow( <ExpenseForm /> );

    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});

    expect(wrapper.state('calendarFocused')).toBe(focused);
})