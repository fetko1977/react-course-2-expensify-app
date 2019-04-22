import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import Select from 'react-select';
import categories from '../categories/categories';

class ExpenseForm extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            category: props.expense && props.expense.categoryClass !== '' && props.expense.categoryLabel !== '' ? {value: props.expense.categoryClass, label: props.expense.categoryLabel} : null,
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }

    onCategoryChange = (category) => {
        this.setState(() => ({ category }));
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };

    onDateChange = (createdAt) => {
        if(createdAt) {
            this.setState(() => ({
                createdAt
            }))
        }
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({
            calendarFocused: focused
        }))
    }

    submit = (e) => {
        e.preventDefault();
        const category = this.state.category === null ? {value: '', label: ''} : this.state.category;

        if (!this.state.description || !this.state.amount) {
            // Set error state  - Please provide description and amount
            this.setState(() => ({
                error: 'Please provide description and amount'
            }))
        } else {
            this.setState(() => ({
                error: ''
            }))
            this.props.onSubmit({
                categoryClass: category.value,
                categoryLabel: category.label,
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    }

    render() {
        return (
            <form className="form" onSubmit={this.submit}>
                { this.state.error && <p className="form__error">{this.state.error}</p>}
                <Select
                    value={this.state.category}
                    onChange={this.onCategoryChange}
                    isClearable={true}
                    options={categories}
                    placeholder="Select Category"
                />
                <input 
                    type="text" 
                    className="text-input" 
                    placeholder="Description" 
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input 
                    type="text"
                    className="text-input" 
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker 
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea 
                    placeholder="Add note to your expense (optional)"
                    className="textarea"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                ></textarea>
                <div>
                    <button className="btn btn--blue">Save Expense</button>
                </div>
            </form>
        )
    }
}

export default ExpenseForm;