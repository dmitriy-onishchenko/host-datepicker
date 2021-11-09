import React, { Component } from 'react';
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import 'react-dates/initialize';
import 'dayjs/locale/ru';
import moment from 'moment';
import 'moment/locale/ru';
import { SingleDatePicker} from 'react-dates';
import MonthDayItem from './components/MonthDayItem';
import DateIndicator from './components/DateIndicator';
import DateSelector from './components/DateSelector';
import WeekDays from './components/WeekDays';
import DatesPeriod from './components/DatesPeriod';
import Polipop from 'polipop';
import DatePickerMobile from './components/DatePickerMobile';
import 'polipop/dist/css/polipop.core.min.css';
import 'polipop/dist/css/polipop.default.min.css';
import 'react-dates/lib/css/_datepicker.css';

dayjs.extend(weekday);
dayjs.locale('ru');
moment().locale('ru');

var polipop = new Polipop('mypolipop', {
    layout: 'popups',
    insert: 'before',
	position: 'top-right',
	effect: 'slide',
	closer: false,
	pauseOnHover: true,
	icons: false
});

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			selectedDate: dayjs(),
			currentFullName: null,
			selected: null,
			currentMonthDays: null,
			previousMonthDays: null,
			nextMonthDays: null,
			createdAt: moment(),
    		calendarFocused: false,
			isShowMobileDatepicker: false,
			today: dayjs().format("YYYY-MM-DD"),
			days: null,
			carPrice: null,
			carsData: null,
			minDate: moment(),
            startDate: null,
            endDate: null,
			holdId: null,
			infoBooked: null,
			choicePeriod: null,
			timeStart: '10:00',
			timeEnd: '11:00',
			timeArray: [],
			year: Number(dayjs().format("YYYY")),
		}
	}

	getWeekday(date) {
		return dayjs(date).weekday();
	}

	currentMonthDays() {
		let currentMonthDays =  [...Array(dayjs(this.state.selectedDate).daysInMonth())].map((day, index) => {
			return {
			date: dayjs(`${dayjs(this.state.selectedDate).format("YYYY")}-${dayjs(this.state.selectedDate).format("M")}-${index + 1}`).format(
				"YYYY-MM-DD"
			),
				isCurrentMonth: true
			};
		});

		this.setState({currentMonthDays: currentMonthDays })
	}

	previousMonthDays() {
		const year = dayjs(this.state.selectedDate).format("YYYY");
		const month = this.state.selectedDate.format("M")
	
		const firstDayOfTheMonthWeekday = this.getWeekday(
			this.state.currentMonthDays[0].date
		);
		const previousMonth = dayjs(`${year}-${month}-01`).subtract(
			1,
			"month"
		);

		const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
			? firstDayOfTheMonthWeekday
			: 7;

		const previousMonthLastMondayDayOfMonth = dayjs(
			this.state.currentMonthDays[0].date
		)
			.subtract(visibleNumberOfDaysFromPreviousMonth, "day")
			.date();

		const previousMonthDays = [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
			(day, index) => {
			return {
				date: dayjs(
				`${previousMonth.year()}-${previousMonth.month() +
					1}-${previousMonthLastMondayDayOfMonth + index}`
				).format("YYYY-MM-DD"),
				isCurrentMonth: false
			};
			}
		);
		this.setState({previousMonthDays: previousMonthDays})
	}

	nextMonthDays() {
		const year = dayjs(this.state.selectedDate).format("YYYY");
		const month = this.state.selectedDate.format("M")

		const lastDayOfTheMonthWeekday = this.getWeekday(
			`${year}-${month}-${this.state.currentMonthDays.length}`
		);

		const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");

		const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
			? 7 - lastDayOfTheMonthWeekday
			: lastDayOfTheMonthWeekday;

		let nextMonthDays =  [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
			return {
				date: dayjs(
					`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
				).format("YYYY-MM-DD"),
				isCurrentMonth: false
			};
		});

		this.setState({nextMonthDays: nextMonthDays})
	}

	days() {
		const days = [
			...this.state.previousMonthDays,
			...this.state.currentMonthDays,
			...this.state.nextMonthDays
		];

		this.setState({days: days});
	}

	onDatesChange = ({ startDate, endDate }) => {
        this.setState({ startDate, endDate });
    }

	onDateChange = (createdAt) => {
		this.setState(() => ({ createdAt }));
	};
	
	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calendarFocused: focused }))
	};

	selectDate = (newSelectedDate) => {
		this.setState({selectedDate: newSelectedDate})
	}

	selectFullName = (day, selected, price) => {
		const holdPerDate = this.state.carsData.holdPerDate;
		const dateSelected = moment(selected, 'YYYY-MM-DD').format('YYYY-MM-DD');
		const holdId = holdPerDate[dateSelected];
		let infoBooked = [];

		if (holdId) {
			holdId.map((id) => {
				const infoItem = this.state.carsData.holdList.filter(el => el.id === id);
	
				infoBooked.push(infoItem[0]);
			});

			console.log(infoBooked)
		}

		this.setState({
			currentFullName: day,
			selected: selected,
			choicePeriod: null,
			startDate: moment(selected, 'YYYY-MM-DD'),
			endDate: moment(selected, 'YYYY-MM-DD').add(1, 'days'),
			timeStart: '10:00',
			timeEnd: '11:00',
			carPrice: price,
			holdId: holdId[0] ? holdId : null,
			infoBooked: infoBooked.length > 0 ? infoBooked : null
		})
	}

	onDatesChangeMobile = (startDate, endDate) => {
		this.setState({ startDate, endDate, isShowMobileDatepicker: false });
	}

	onClickDate = () => {
		this.setState({isShowMobileDatepicker: true})
	}

	onReset = () => {
		this.setState({isShowMobileDatepicker: false})
	}

	initHoldInfo() {
		const holdPerDate = this.state.carsData.holdPerDate;
		const dateSelected = moment(this.state.selected, 'YYYY-MM-DD').format('YYYY-MM-DD');
		const holdId = holdPerDate[dateSelected];
		let infoBooked = [];

		if (holdId) {
			holdId.map((id) => {
				const infoItem = this.state.carsData.holdList.filter(el => el.id === id);

				infoBooked.push(infoItem[0]);
			});
		}

		this.setState({
			choicePeriod: null,
			holdId: holdId ? holdId : null,
			infoBooked: infoBooked.length > 0 ? infoBooked : null
		})
	}

	initTimeSelect() {
		let timeArray = [];

		for (let index = 0; index < 24; index++) {
			if (index < 10) {
				timeArray.push(`0${index}:00`);
			} else {
				timeArray.push(`${index}:00`);
			}
        }

		this.setState({timeArray})
	}

	onChangeStartTime = (event) => {
		this.setState({ timeStart: event.target.value });
	}

	onChangeEndTime = (event) => {
		this.setState({ timeEnd: event.target.value });
	}

	saveDates = () => {
		const _this = this;
		const {timeStart, timeEnd} = this.state;
		const startDate = moment(this.state.startDate).format("DD.MM.YYYY");
		const endDate = moment(this.state.endDate).format("DD.MM.YYYY");
		
		this.setState({ isLoading: true });
		BX.ajax.runAction('winter:main.api.Car.hold',{
			mode: 'ajax',
			data : {
				lang: window.shopSettings.lang,
				carId: window.shopSettings.carId,
				start: startDate,
				end: endDate,
				start_t: timeStart,
				end_t: timeEnd
			}
			}).then(function(res) {
				if (res.data.isSuccess) {
					const hold = true;

					_this.getCarsData(hold);
					_this.setState({selected: null})
					polipop.add({
						content: res.data.message[0] ? res.data.message[0] : 'Success',
						type: 'success',
					});
				} else {
					polipop.add({
						content: res.data.message[0] ? res.data.message[0] : 'Something went wrong',
						type: 'error',
					});
				}
				_this.setState({ isLoading: false });
			}).catch(function (res) {
				console.log(res);
			});
	}

	removeDate = (id) => {
		const _this = this;
		const info = this.state.infoBooked.filter(el => el.id !== id);

		this.setState({ isLoading: true });
		BX.ajax.runAction('winter:main.api.Car.removeHold',{
			mode: 'ajax',
			data : {
				lang: window.shopSettings.lang,
				holdId: id
			}
			}).then(function(res) {	
				if (res.data.isSuccess) {
					_this.getCarsData();
					_this.setState({ holdId: null, selected: null, infoBooked: info && info.length > 0 ? info : null });
					polipop.add({
						content: res.data.message[0] ? res.data.message[0] : 'Unavailability successfully removed.',
						type: 'success',
					});
				} else {
					polipop.add({
						content: res.data.message[0] ? res.data.message[0] : 'Something went wrong',
						type: 'error',
					});
				}

				_this.setState({ isLoading: false });
			}).catch(function (res) {
				console.log(res);
		});
	}

	getCarsData(hold) {
		const _this = this;

		// fetch('https://market.wvdev.com.ua/dev/calendar/json.php')
		// 	.then((res) => {
		// 		return res.json()
		// 	})
		// 	.then((data) => {
		// 		this.setState({ carsData: data.data.data })
		// 	});
		
		BX.ajax.runAction('winter:main.api.Car.getCalendar', {
			mode: 'ajax',
			data : {
				lang: window.shopSettings.lang,
				carId: window.shopSettings.carId
			}
			}).then(function(res) {
				_this.setState({ carsData: res.data.data });

				if (hold) {
					_this.initHoldInfo();
				}
			}).catch(function (res) {
				console.log(res);
			});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.currentMonthDays !== this.state.currentMonthDays) {
			this.previousMonthDays();
			this.nextMonthDays();
		}

		if (prevState.nextMonthDays !== this.state.nextMonthDays) {
			this.days()
		}

		if (prevState.selectedDate !== this.state.selectedDate) {
			this.currentMonthDays();
		}
	}

	componentDidMount() {
		this.currentMonthDays();
		this.getCarsData();
		this.initTimeSelect();
	}

	render() {
		return (
			<div className="calendar-view">
				<div className="calendar-view__header d-xl-none mb-4 pb-3">
					<div className="calendar-sidebar__title">Календарь</div>
					<div className="calendar-sidebar__text">
						Для вашего удобства, блокируйте те дни, когда ваш автомобиль недоступен. В эти дни Гости не смогут забронировать ваш автомобиль для своих поездок.
					</div>
				</div>
				<div className="calendar-month">
					<div className="calendar-month-header">
						<DateIndicator 
							selectedDate={this.state.selectedDate}
						/>

						<DateSelector
							currentDate={this.state.today}
							selectedDate={this.state.selectedDate}
							dateSelected={this.selectDate}
						/>
					</div>

					<WeekDays 
						weekdays={WEEKDAYS}
					/>

					{this.state.days && this.state.carsData &&
						<div>
							<ol className="days-grid">
								{this.state.days.map((day) => {
									return (
										<MonthDayItem
											key={day.date}
											day={day}
											carPrice={this.state.carsData.prices[day.date]}
											selectDate={this.state.selectedDate}
											selectFullName={this.selectFullName}
											active={day.date === this.state.selected}
											dayInfo={this.state.carsData.availability[day.date]}
											isPrev={day.date < this.state.today}
											isToday={day.date === this.state.today}
										/>
									);
								})}
							</ol>
							<div className="day-info d-flex align-items-center flex-wrap mt-4">
								<div className="day-info__item day-info__item--booked d-flex align-items-center">
									<div className="day-info__icon-item"></div>
									Забронировано
								</div>
								<div className="day-info__item day-info__item--unavailable d-flex align-items-center ms-4">
									<div className="day-info__icon-item"></div>
									Недоступно
								</div>
							</div>
						</div>
					}
				</div>
				<div className={this.state.selected ? 'calendar-sidebar is-open-sidebar' : 'calendar-sidebar'}>
					{!this.state.selected && !this.state.choicePeriod &&
						<div className="d-none d-xl-block">
							<div className="calendar-sidebar__title">Календарь</div>
							<div className="calendar-sidebar__text">
								Для вашего удобства, блокируйте те дни, когда ваш автомобиль недоступен. В эти дни Гости не смогут забронировать ваш автомобиль для своих поездок.
							</div>
						</div>
					}

					{this.state.selected && !this.state.choicePeriod &&
						<div className="calendar-sidebar__close" onClick={() => {
							this.setState({
								selected: null,
								currentFullName: null
							})
						}}>
							<div className="calendar-sidebar__button-close"></div>
						</div>
					}

					{this.state.choicePeriod &&
						<div className="calendar-sidebar__close" onClick={() => {
							this.setState({
								choicePeriod: null
							})
						}}>
							<div className="calendar-sidebar__button-close"></div>
						</div>
					}

					{this.state.selected && !this.state.choicePeriod &&
						<div>
							<div className="calendar-sidebar__title mb-4 pb-2">{this.state.currentFullName}</div>
							{/* <div className="calendar-sidebar__info mb-4 pb-2">
								<div className="d-flex justify-content-between mb-2">
									<b>${this.state.carPrice}</b>
									<div className="button-link">Edit</div>
								</div>
								<p className="mb-0">
									Set a custom price to override your standard pricing settings.
								</p>
							</div> */}
							<div className="calendar-sidebar__info mb-4">
								{!this.state.infoBooked &&
									<div>
										<div className="d-flex justify-content-between mb-2">
											<b>Недоступно</b>
										</div>
										<p className="mb-0">
											Установите недоступность вашего автомобиля, чтобы блокировать бронирования в эти периоды.
										</p>
									</div>
								}
								
								{this.state.infoBooked && this.state.infoBooked.map((item) => {
									return (
										<div key={item.id} className="date-remove d-flex justify-content-between mt-3 mb-3">
											<div className="date-selected-info">
												{item.type === 'order' &&
													<div className="date-selected-info__item">
														<span>Заказ №</span>
														<a href={item.url}>{item.id}</a>
													</div>
												}
												<div className="date-selected-info__item">
													<span>From</span>
													{item.title_start}
												</div>
												<div className="date-selected-info__item">
													<span>To</span>
													{item.title_end}
												</div>
											</div>
											{item.type === 'block' &&
												<div className={this.state.isLoading ? 'date-remove__button is-disabled' : 'date-remove__button'} onClick={() => this.removeDate(item.id)}>Remove</div>
											}
										</div>
									);
								})}

								{!this.state.infoBooked &&
									<div className="d-flex justify-content-end mt-2">
										<div className="button-link" onClick={() => {
											this.setState({choicePeriod: true})
										}}>+ Добавьте недоступный период</div>
									</div>
								}
							</div>

							{this.state.infoBooked && this.state.infoBooked.length > 0 && this.state.infoBooked[0].type == 'order'
								?
								<div className="calendar-sidebar__info">
									<div className="d-flex justify-content-between mb-2">
										<b>Поездки</b>
									</div>
									<p className="mb-0">
										Кликните на номер заказа чтобы увидеть детали поездки
									</p>
								</div>
								
								: <div className="calendar-sidebar__info">
									<div className="d-flex justify-content-between mb-2">
										<b>Поездки</b>
									</div>
									<p className="mb-0">
										У вас нет бронирований в этот день.
									</p>
								</div>
							}	
							
							{/* <SingleDatePicker
								date={this.state.createdAt} 
								onDateChange={this.onDateChange}
								focused={this.state.calendarFocused} 
								onFocusChange={this.onFocusChange} 
								numberOfMonths={1}
								isOutsideRange={() => false}
								displayFormat="DD.MM.YYYY"
							/> */}
						</div>
					}

					{this.state.choicePeriod &&
						<div>
							<div className="calendar-sidebar__title mb-2">Добавить недоступность</div>
							<div className="calendar-sidebar__info mb-2 pb-1">
								<p className="mb-0">
									Заблокируйте те дни, когда ваш автомобиль недоступен для бронирования. Помните, что у вас будет больше поездок, если вы сделаете свой автомобиль доступным, особенно в выходные и праздничные дни.
								</p>
							</div>
							<div className="calendar-sidebar__info mb-2 pb-1">
								<b className="textCapitalize">{this.state.currentFullName}</b>
							</div>
							<DatesPeriod 
								label="Начало"
								startDateId="start-date"
								endDateId="end-date"
								mode="start"
								onClickDate={this.onClickDate}
								timeArray={this.state.timeArray}
								startDate={this.state.startDate}
								endDate={this.state.endDate}
								timeStart={this.state.timeStart}
								onChangeTime={this.onChangeStartTime}
								onDatesChange={this.onDatesChange}
							/>

							<DatesPeriod 
								label="Конец"
								startDateId="start-date-2"
								endDateId="end-date-2"
								mode="end"
								onClickDate={this.onClickDate}
								timeArray={this.state.timeArray}
								startDate={this.state.startDate}
								endDate={this.state.endDate}
								onChangeTime={this.onChangeEndTime}
								timeEnd={this.state.timeEnd}
								onDatesChange={this.onDatesChange}
							/>


							{this.state.startDate && this.state.isShowMobileDatepicker &&
								<DatePickerMobile
									onReset={this.onReset}
									startDate={this.state.startDate}
									endDate={this.state.endDate}
									onDatesChangeMobile={this.onDatesChangeMobile}
								/>
							}

							<div className="mt-4">
								<button type="button" disabled={this.state.isLoading} className="btn btn-default has-ripple" onClick={this.saveDates}>
									Добавить
									{this.state.isLoading &&
										<span className="spinner-border"></span>
									}
								</button>
							</div>
						</div>	
					}					
				</div>
			</div>
		);
	}
}

export default App;