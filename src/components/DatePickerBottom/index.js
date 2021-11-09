import React, { Component } from 'react';
import moment from 'moment';
import './style.css';

class DatePickerBottom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time_end: null,
            start: moment("2020-06-05 00:00", "YYYY-MM-DD HH:mm"),
            end: moment("2020-06-05 23:30", "YYYY-MM-DD HH:mm"),
            end_start: moment("2020-06-05 00:00", "YYYY-MM-DD HH:mm"),
            end_end: moment("2020-06-05 23:30", "YYYY-MM-DD HH:mm"),
            startTime: null,
            endTime: null,
            end_selected: null,
            class: null
        };
    }

    componentDidMount() {
        const { onBottomHeightInit } = this.props;

        onBottomHeightInit(this.bottomElement.clientHeight);
    }

    handleOnChangeStart = (data) => {
        const { onInitStartTime } = this.props;
        const data_start = moment(data.from, 'x').format("H:mm");
        const sliderWidth = this.timerangeItem.clientWidth;

        this.setState({ class: 'is-changing', sliderWidth: sliderWidth, end_start: moment(`2020-06-05 ${data_start}`, "YYYY-MM-DD HH:mm") });
        onInitStartTime(data.from);
    }

    handleOnChangeEnd = (data) => {
        const { onInitEndTime } = this.props;

        this.setState({ classEnd: 'is-changing' })
        onInitEndTime(data.from);
    }

    handleOnFinish = (data) => {
        const { startDate, endDate, onInitEndTime, time_end, time_start} = this.props;

        this.setState({ class: null });

        if (startDate && endDate) {
            let start_date = moment(startDate).format("MM-DD-YYYY");
            let end_date = moment(endDate).format("MM-DD-YYYY");

            if (moment(end_date).isAfter(start_date)) {
                this.ionSliderEnd.update({
                    min: this.state.start.format("x"),
                    max: this.state.end.format("x"),
                    step: 1800000,
                    hide_min_max: true
                })
            } else {
                if (!time_end) {
                    onInitEndTime(this.state.end_start)
                    this.ionSliderEnd.update({
                        min: this.state.start.format("x"),
                        max: this.state.end.format("x"),
                        from: this.state.end_start.format("x"),
                        step: 1800000,
                        hide_min_max: true
                    })
                } else {
                    if (typeof time_end === 'object') {
                        if (time_start > Number(time_end.format("x"))) {
                            onInitEndTime(this.state.end_start)
                            this.ionSliderEnd.update({
                                min: this.state.start.format("x"),
                                max: this.state.end.format("x"),
                                from: this.state.end_start.format("x"),
                                step: 1800000,
                                hide_min_max: true
                            })
                        }
                    } else {
                        if (time_start > Number(time_end)) {
                            onInitEndTime(this.state.end_start)
                            this.ionSliderEnd.update({
                                min: this.state.start.format("x"),
                                max: this.state.end.format("x"),
                                from: this.state.end_start.format("x"),
                                step: 1800000,
                                hide_min_max: true
                            })
                        }
                    }
                }
            }
        } else if (!startDate || !endDate) {
            if (!time_end) {
                onInitEndTime(this.state.end_start)
                this.ionSliderEnd.update({
                    min: this.state.start.format("x"),
                    max: this.state.end.format("x"),
                    from: this.state.end_start.format("x"),
                    step: 1800000,
                    hide_min_max: true
                })
            } else {
                if (typeof time_end === 'object') {
                    if (time_start > Number(time_end.format("x"))) {
                        onInitEndTime(this.state.end_start)
                        this.ionSliderEnd.update({
                            min: this.state.start.format("x"),
                            max: this.state.end.format("x"),
                            from: this.state.end_start.format("x"),
                            step: 1800000,
                            hide_min_max: true
                        })
                    }
                } else {
                    if (time_start > Number(time_end)) {
                        onInitEndTime(this.state.end_start)
                        this.ionSliderEnd.update({
                            min: this.state.start.format("x"),
                            max: this.state.end.format("x"),
                            from: this.state.end_start.format("x"),
                            step: 1800000,
                            hide_min_max: true
                        })
                    }
                }
            }
        }
    }

    handleOnFinishEnd = () => {
        this.setState({ classEnd: null })
    }

    prettify = (num) => {
        return moment(num, 'x').format("H:mm");
    }

    onClick = () => {
        const { startDate, endDate, time_start, time_end, onHideDatepicker } = this.props;
        let startDateValue;
        let endDateValue;
        let timeStartValue;
        let timeEndValue;

        if (startDate) {
            startDateValue = startDate.format("DD.MM.YYYY");
        } else {
            startDateValue = '';
        }

        if (endDate) {
            endDateValue = endDate.format("DD.MM.YYYY");
        } else {
            endDateValue = '';
        }

        if (time_start) {
            timeStartValue = moment(time_start, 'x').format("HH:mm");
        } else {
            timeStartValue = '00:00';
        }

        if (time_end) {
            timeEndValue = moment(time_end, 'x').format("HH:mm");
        } else {
            timeEndValue = '00:00';
        }
       
        if (startDate && endDate) {
            // alert(`${moment(startDate).format("D MMMM")}, ${moment(time_start, 'x').format("H:mm")} - ${moment(endDate).format("D MMMM")}, ${moment(time_end, 'x').format("H:mm")}`);
            document.querySelectorAll('[name=dateStart]')[0].value = startDateValue;
            document.querySelectorAll('[name=dateEnd]')[0].value = endDateValue;
            document.querySelectorAll('[name=timeStart]')[0].value = timeStartValue;
            document.querySelectorAll('[name=timeEnd]')[0].value = timeEndValue;
            document.querySelectorAll('.mobile-search__dates')[0].textContent = `${startDateValue}, ${timeStartValue} - ${endDateValue}, ${timeEndValue}`;
            document.querySelectorAll('.search-form__date-wrapper')[0].textContent = `${startDateValue}, ${timeStartValue} - ${endDateValue}, ${timeEndValue}`;
            onHideDatepicker();
            document.getElementsByTagName("html")[0].classList.remove('is-show-datepicker');
        } else {
            return false;
            // alert('Select pickup and return date');
        }
    }

    render() {
        const { onSaveDates } = this.props;
        
        return (
            <div className="Datepicker-bottom" ref={(bottomElement) => { this.bottomElement = bottomElement }}>
                <button className="Datepicker-save" onClick={onSaveDates} type="button">Сохранить</button>
            </div>
        )
    }
}

export default DatePickerBottom;