import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'

const ExpenseListItem = ({
        id,
        categoryClass,
        categoryLabel,
        description,
        amount,
        createdAt
    }) => {
        const listItemCategoryClass = !!categoryClass ? "list-item__category " + categoryClass : "list-item__category";
        return (
            <Link className="list-item" to={`/edit/${id}`}>
                <div>
                    <h3 className="list-item__title">{description}</h3>
                    <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
                    { categoryLabel && <h5 className={listItemCategoryClass}><strong>Category: </strong>{categoryLabel}</h5>}
                </div>
                <h3  className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
            </Link>
        )
    };

export default ExpenseListItem;