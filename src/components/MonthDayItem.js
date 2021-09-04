import React, { Component } from 'react';
import * as dayjs from 'dayjs';

var classNames = require('classnames');

class MonthDayItem extends Component {
    getFullName() {
        const day = dayjs(this.props.day.date).format('dddd, MMMM D');
        const selected = dayjs(this.props.day.date).format("YYYY-MM-DD");
        const carPrice = this.props.carPrice ? Number(this.props.carPrice).toFixed(0) : null;

        this.props.selectFullName(day, selected, carPrice);
    }

    getLeftPos(_number) {
        return `${(_number / 5) * 100}%`;
    }

    getStartWidth(_number) {
        const _left = (_number / 5) * 100;

        return `${100 - _left}%`;
    }

    getEndWidth(_number) {
        return `${(_number / 5) * 100}%`;
    }

    getDayDetail(dayInfo) {
        let _array = [];

        dayInfo.map((day) => {
            const data = day.split(':');

            _array.push({
                type: data[0],
                duration: data[1],
                time: data[2] ? data[2] : null
            })
        })
        
        return _array;
    }

    render() {
        const {day, isPrev, isToday, active, carPrice, dayInfo} = this.props;
        const dayDetail = dayInfo ? this.getDayDetail(dayInfo) : null;

        var groupClasses = classNames(
            'calendar-day',
            {
              'calendar-day--not-current': !day.isCurrentMonth,
              'calendar-day--prev': isPrev,
              'calendar-day--today': isToday,
              'calendar-day--selected': active
            }
        );

        return (
            <li className={groupClasses} onClick={() => this.getFullName()}>
                <div className="calendar-day__content">
                    {dayjs(day.date).format("D")}
                    <br/>
                    {carPrice &&
                        `$${Number(carPrice).toFixed(0)}`
                    }
                </div>

                {dayDetail && dayDetail.map((item, key) => {
                    return (
                        <div key={`${day.date}-${key}`} className={item.type === 'blocked' ? 'calendar-day__unavailable' : 'calendar-day__blocked'}>
                            {item.duration === 'full' && day.isCurrentMonth &&
                                <div className="calendar-day__full-period"></div>
                            }

                            {item.duration === 'start' && day.isCurrentMonth &&
                                <div className="calendar-day__half-period" style={{ width: this.getStartWidth(Number(item.time)), left: this.getLeftPos(Number(item.time))}}></div>
                            }

                            {item.duration === 'end' && day.isCurrentMonth &&
                                <div className="calendar-day__half-period" style={{width: this.getEndWidth(Number(item.time))}}></div>
                            }
                        </div>
                    );
                })}

                {/* {dayInfo && dayInfo.length === 2 && (dayInfo[0] === 'blocked' || dayInfo[0] === 'unavailable' ) && dayInfo[1] === 'full' && day.isCurrentMonth &&
                    <div className={dayInfo[0] === 'blocked' ? 'calendar-day__blocked' : 'calendar-day__unavailable'}>
                        <div className="calendar-day__full-period"></div>
                    </div> 
                }

                {dayInfo && dayInfo.length === 3 && (dayInfo[0] === 'blocked' || dayInfo[0] === 'unavailable') && day.isCurrentMonth &&
                    <div className={dayInfo[0] === 'blocked' ? 'calendar-day__blocked' : 'calendar-day__unavailable'}>
                        {dayInfo[1] === 'start' &&
                            <div className="calendar-day__half-period" style={{ width: this.getStartWidth(Number(dayInfo[2])), left: this.getLeftPos(Number(dayInfo[2]))}}></div>
                        }

                        {dayInfo[1] === 'end' &&
                            <div className="calendar-day__half-period" style={{width: this.getEndWidth(Number(dayInfo[2]))}}></div>
                        }
                    </div> 
                } */}
            </li>
        )
    }
}
    
export default MonthDayItem;
