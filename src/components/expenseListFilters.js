import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';
import { sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';



export class ExpenseListFilters extends React.Component {
    state = {
        calanderFocused: null,
    };

    onDatesChange =({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    onFocusChange = (newCalanderFocused) => {
        this.setState(() => ({ calanderFocused: newCalanderFocused }))
    }

    onTextChange = (e) =>{
        this.props.setTextFilter(e.target.value)
    }

    onSortChange = (e) => {
        if(e.target.value==="date"){
            this.props.sortByDate();
        } else if (e.target.value==="amount"){
            this.props.sortByAmount();
        }
    }

    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            className="text-input"
                            type='text'
                            value={this.props.filters.text}
                            onChange={this.onTextChange}
                            placeholder="Search Expenses"
                        />
                    </div>

                    <div className="input-group__item">
                        <select
                            className="select"
                            name="sortBy"
                            value={this.props.filters.sortBy}
                            onChange={this.onSortChange}>
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>

                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            startDateId="startDateId"
                            endDate={this.props.filters.endDate}
                            endDateId="endDateId"
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calanderFocused}
                            onFocusChange={this.onFocusChange}
                            isOutsideRange={(day) => false}
                            numberOfMonths={1}
                            showClearDates={true}
                            showDefaultInputIcon
                        />
                    </div>
                </div>
            </div>
        )
    }
}



const mapStoreToProps = (state) =>{
    return {
        filters: state.filters
    }
};

const mapDispatchToProps = (dispatch) =>({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setTextFilter: (textValue) => dispatch(setTextFilter(textValue)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount())

})

export default connect(mapStoreToProps, mapDispatchToProps)(ExpenseListFilters);


                        // <label htmlFor="sortBy" >Sort By</label>
