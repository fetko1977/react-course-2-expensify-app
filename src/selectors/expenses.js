import moment from 'moment';

export default (expenses, {
    categoryLabel,
    text,
    sortBy,
    startDate,
    endDate
}) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) || expense.note.toLowerCase().includes(text.toLowerCase());
        const categoryMatch = expense.categoryLabel.toLowerCase().includes(categoryLabel.toLowerCase())

        return startDateMatch && endDateMatch && textMatch && categoryMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }

        if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}