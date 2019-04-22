import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setCategoryFilter, setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import Select from 'react-select';
import categories from '../categories/categories';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
    category: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocused) => {
      this.setState(() => ({ calendarFocused }));
  }

  onCategoryChange = (category) => {
      const categoryLabel = category === null ? '' : category.label;
      this.setState(() => ({ category }));
      this.props.setCategoryFilter(categoryLabel);
  }

  onTextChange = (e) => {
      this.props.setTextFilter(e.target.value);
  }

  onSortChange = (e) => {
    if (e.target.value === "amount") {
      this.props.sortByAmount();
    } else if (e.target.value === "date") {
      this.props.sortByDate();
    }
  }
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
            <div className="input-group__item">
                <input type="text" className="text-input" placeholder="Search expenses" value={this.props.filters.text} onChange={this.onTextChange} />
            </div>
            <div className="input-group__item">
                <select className="select" value={this.props.filters.sortBy} onChange={this.onSortChange}>
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                </select>
            </div>
            <div className="input-group__item input-group__item--category-filter">
                <Select
                    value={this.state.category}
                    isClearable={true}
                    onChange={this.onCategoryChange}
                    options={categories}
                    placeholder="Filter By Category"
                />
            </div>
            <div className="input-group__item">
                <DateRangePicker
                  startDate={this.props.filters.startDate}
                  endDate={this.props.filters.endDate}
                  onDatesChange={this.onDatesChange}
                  focusedInput={this.state.calendarFocused}
                  onFocusChange={this.onFocusChange}
                  showClearDates={true}
                  numberOfMonths={1}
                  isOutsideRange={() => false}
                />
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ filters: state.filters });

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    setCategoryFilter: (categoryLabel) => dispatch(setCategoryFilter(categoryLabel)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);