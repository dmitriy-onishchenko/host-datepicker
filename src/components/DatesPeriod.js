import React, { Component } from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import 'moment/locale/ru';
import { isMobile } from "react-device-detect";
import { DateRangePicker, isInclusivelyAfterDay } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './style.css';

var classNames = require('classnames');

class DatesPeriod extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focusedInput: null
        };
    }

    onFocusChange = focusedInput => this.setState({ focusedInput: focusedInput})

    renderDayDesktop = (day) => {
        return (
            <div className="CalendarDay__item">
                {day.format('D')}
            </div>
        )
    }

    render() {
        const {label, startDateId, endDateId, startDate, endDate, onDatesChange, mode, timeArray, timeStart, timeEnd, onChangeTime, onClickDate} = this.props;

        var groupClasses = classNames(
            'date-range',
            {
              'date-range-start': mode === 'start',
              'date-range-end': mode === 'end'
            }
        );

        return (
            <div className="mb-4">
                <div className={groupClasses}>
                    <b className="date-label">{label}</b>
                    <div className="date-period-item">
                        <select 
                            className="date-time select-default" 
                            value={timeStart ? timeStart : timeEnd}
                            onChange={onChangeTime}
                            >
                            {timeArray.map((time, key) => {
                                return (
                                    <option key={key} value={time}>{time}</option>
                                );
                            })}
                        </select>
                        {isMobile &&
                            <div className="DateRangePicker DateRangePicker_1">
                                <div>
                                    <div className="DateRangePickerInput DateRangePickerInput_1">
                                        <div className="DateInput DateInput_1" onClick={onClickDate}>
                                            <div className="DateInput_input DateInput_input_1">
                                                {startDate &&
                                                    startDate.format('DD.MM.YYYY')
                                                }
                                            </div>
                                        </div>
                                        <div className="DateInput DateInput_1" onClick={onClickDate}>
                                            <div className="DateInput_input DateInput_input_1">
                                                {endDate &&
                                                    endDate.format('DD.MM.YYYY')
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        
                        <div className="select-arrow-icon"></div>
                        {!isMobile &&
                            <DateRangePicker
                                startDate={startDate}
                                endDate={endDate}
                                startDateId={startDateId}
                                endDateId={endDateId}
                                onDatesChange={onDatesChange}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={this.onFocusChange}
                                renderDayContents={this.renderDayDesktop}
                                enableOutsideDays={false}
                                hideKeyboardShortcutsPanel={true}
                                minimumNights={0}
                                numberOfMonths={1}
                                noBorder
                                isOutsideRange={day => !isInclusivelyAfterDay(day, moment())}
                                isDayBlocked={this.isDayBlocked}
                            />
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}
    
export default DatesPeriod;



