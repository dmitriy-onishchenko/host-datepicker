import React, { Component } from 'react';
import * as dayjs from 'dayjs';

class DateIndicator extends Component {
    render() {
        const {selectedDate} = this.props;

        return (
            <div className="calendar-date-indicator calendar-month-header-selected-month">
                { selectedDate.format("MMMM YYYY") }
            </div>
        )
    }
}
    
export default DateIndicator;
