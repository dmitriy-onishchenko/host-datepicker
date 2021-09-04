import React, { Component } from 'react';
import * as dayjs from 'dayjs';

class DateSelector extends Component {
    selectPrevious() {
        const {dateSelected, selectedDate} = this.props;
        const newSelectedDate = dayjs(selectedDate).subtract(1, "month");

        dateSelected(newSelectedDate)
    }

    selectCurrent() {
        const {dateSelected, currentDate} = this.props;
        const newSelectedDate = dayjs(currentDate);

        dateSelected(newSelectedDate)
    }

    selectNext() {
        const {dateSelected, selectedDate} = this.props;
        const newSelectedDate = dayjs(selectedDate).add(1, "month");
        
        dateSelected(newSelectedDate)
    }

    render() {
        return (
            <div className="calendar-date-selector">
                <span className="calendar-prev" onClick={() => this.selectPrevious()}></span>
                <span className="calendar-next" onClick={() => this.selectNext()}></span>
            </div>
        )
    }
}
    
export default DateSelector;



