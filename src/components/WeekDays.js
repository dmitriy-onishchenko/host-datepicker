import React, { Component } from 'react';
import * as dayjs from 'dayjs';

class WeekDays extends Component {
    render() {
        const {weekdays} = this.props;

        return (
            <ol className="day-of-week">
                {weekdays.map((weekday, key) => {
                    return (
                            <li key={weekday}>{ weekday }</li>
                        );
                    })}
            </ol>
        )
    }
}

export default WeekDays;


