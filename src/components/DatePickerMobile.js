import React, { Component } from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import DatepickerHeader from './DatePickerHeader';
import DatePickerBottom from './DatePickerBottom';
import { DayPickerRangeController, isInclusivelyAfterDay } from 'react-dates';
import { isMobile} from "react-device-detect";
import 'react-dates/lib/css/_datepicker.css';
import './style.css';
import 'moment/locale/ru';

class DatePickerMobile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headerHeight: 0,
            bottomHeight: 0,
            minDate: moment(),
            selectOnlyStart: false,
            startDate: null,
            endDate: null,
            time_start: null,
            time_end: null,
            focusedInput: 'startDate',
            daySize: window.innerWidth / 7
        };
    }

    onReset = () => {
        const { onReset } = this.props;
        
        onReset();
    }

    onResetTime = () => {
        this.setState({ time_start: null, time_end: null });
    }

    onSaveDates = () => {
        const {onDatesChangeMobile} = this.props;
        const {startDate, endDate} = this.state;

        if (startDate !== null && endDate !== null) {
            onDatesChangeMobile(startDate, endDate)
        }
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.setState({ startDate, endDate });

        if (startDate && !endDate) {
            this.setState({selectOnlyStart: true})
        } else if (!startDate && !endDate) {
            this.setState({selectOnlyStart: false})
        } else if (startDate && endDate) {
            this.setState({selectOnlyStart: false})
        }
    }

    onHideDatepicker = () => {
        this.setState({showMobileDatepicker: false})
    }

    onBottomHeightInit = (height) => {
        this.setState({ bottomHeight: height })
    }

    onHeaderHeightInit = (height) => {
        this.setState({ headerHeight: height })
    }

    onFocusChange = focusedInput => this.setState({ focusedInput: focusedInput || 'startDate' })

    onInitStartTime = (time) => {
        this.setState({ time_start: time })
    }

    onInitEndTime = (time) => {
        this.setState({ time_end: time })
    }

    renderDay = (day) => {
        const daySize = this.state.daySize;

        return (
            <div className="CalendarDay__item" style={{ height: Math.ceil(daySize)}}>
                {day.format('D')}
            </div>
        )
    }

    componentDidMount() {
        const { startDate, endDate } = this.props;

        this.setState({startDate, endDate});
    }

    render() {
        const {headerHeight, bottomHeight} = this.state;
        let heightWrapp;

        if (headerHeight > 0) {
            heightWrapp = window.innerHeight - headerHeight - bottomHeight - 15;
        }

        return (
            <div className="Datepicker Datepicker_Mobile">
                <DatepickerHeader
                    onReset={this.onReset}
                    onHeaderHeightInit={this.onHeaderHeightInit}
                    startDate={this.state.startDate}
                    time_start={this.state.time_start}
                    endDate={this.state.endDate}
                    time_end={this.state.time_end}
                />
                <div className={`Datepicker-wrapp ${this.state.selectOnlyStart ? 'is-selecting-start' : ''}`}>
                    <DayPickerRangeController
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={this.onFocusChange}
                        orientation="verticalScrollable"
                        numberOfMonths={12}
                        renderDayContents={this.renderDay}
                        noNavButtons
                        noBorder
                        minimumNights={0}
                        daySize={this.state.daySize}
                        hideKeyboardShortcutsPanel={true}
                        isOutsideRange={day => !isInclusivelyAfterDay(day, moment())}
                    />
                </div>

                <DatePickerBottom
                    daySize={this.state.daySize}
                    onSaveDates={this.onSaveDates}
                    onResetTime={this.onResetTime}
                    time_start={this.state.time_start}
                    time_end={this.state.time_end}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onHideDatepicker={this.onHideDatepicker}
                    onInitStartTime={this.onInitStartTime}
                    onInitEndTime={this.onInitEndTime}
                    onBottomHeightInit={this.onBottomHeightInit}
                />
            </div>
        )
    }
}
    
export default DatePickerMobile;
