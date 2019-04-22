import moment from 'moment';

export default [{
        id: '1',
        categoryClass: 'rent',
        categoryLabel: 'Rent',
        description: 'Water Bill',
        note: '',
        amount: 120,
        createdAt: 0
    },
    {
        id: '2',
        categoryClass: 'rent',
        categoryLabel: 'Rent',
        description: 'Gas Bill',
        note: '',
        amount: 150,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    },
    {
        id: '3',
        categoryClass: 'education',
        categoryLabel: 'Education',
        description: 'Rent Bill',
        note: '',
        amount: 450,
        createdAt: moment(0).add(4, 'days').valueOf()
    }
];