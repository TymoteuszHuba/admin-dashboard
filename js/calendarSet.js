const currentDate = document.querySelector('.plans__date-current');
const monthBtn = document.querySelectorAll('.plans__date-btn');
const daysContainer = document.querySelector('.plans__days');

let today = new Date();
let activeDay;
let currMonth = today.getMonth();
let currYear = today.getFullYear();
// let clickedDay;

const monthsArray = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const eventWindow = document.querySelector('.plans__event');
const selectedDay = document.querySelectorAll('.selected-day');
const eventBtn = document.querySelectorAll('.plans__event-btn');
const eventBtnControls = document.querySelector('.plans__event-controls');
const eventBtnControlInput = document.querySelector('.plans__event-controls-input');
const eventBtnControlGo = document.querySelector('.plans__event-controls-btn');

const todayBtn = document.getElementById('today-search');
const addBtnList = document.getElementById('btn-add-list-event');
const dismissBtnList = document.getElementById('btn-dismiss-list-event');

const eventName = document.getElementById('event-name');
// const eventTimeFrom = document.getElementById('event-from-time');
// const eventTimeTo = document.getElementById('event-to-time');
const eventTimeInput = document.querySelectorAll('.event-time-input');
const eventHour = document.getElementById('event-hour-reminder');

const eventList = document.querySelector('.plans__event-day-list');
const eventListContainer = document.querySelector('.plans__event-day-list-container');

// default eventsArray incl objets with events array
let eventsArr = [];

// call function to show saved events to local storage
getEvents();
// const eventsArr = [
// 	{
// 		day: 11,
// 		month: 9,
// 		year: 2023,
// 		events: [
// 			{
// 				title: 'lorem ipssum dolar sit gefunda terdssd ',
// 				time: '10:00 AM ',
// 			},
// 			{
// 				title: 'Event 2',
// 				time: '12:00 AM',
// 			},
// 		],
// 	},
// 	{
// 		day: 15,
// 		month: 9,
// 		year: 2023,
// 		events: [
// 			{
// 				title: 'inne zadanie sprawdzaczy czy wszystkoe sie zgadza a powinno ',
// 				time: '22:00 AM ',
// 			},
// 			{
// 				title: 'Event 2 dla ogarniecia',
// 				time: '12:00 AM',
// 			},
// 		],
// 	},
// ];

console.log('eventArr: ', eventsArr);

// function which creates calendar
const createCalendar = () => {
	// get prev month days and curr month all days
	const firstDay = new Date(currYear, currMonth, 1);
	const lastDay = new Date(currYear, currMonth + 1, 0);
	const prevLastDay = new Date(currYear, currMonth, 0);
	const prevDays = prevLastDay.getDate();
	const lastDate = lastDay.getDate();
	const day = firstDay.getDay();
	const nextDays = 7 - lastDay.getDay() - 1;

	// add current date to calendar
	currentDate.textContent = `${monthsArray[currMonth]} ${currYear}`;

	let days = '';

	// prev month days
	for (let i = day; i > 0; i--) {
		days += `<div class="day day__prev">${prevDays - i + 1}</div>`;
	}

	// current month days
	for (let i = 1; i <= lastDate; i++) {
		let event = false;

		// check if eventArr contains day, month and year
		eventsArr.forEach((eventObj) => {
			if (
				eventObj.day === i &&
				eventObj.month === currMonth + 1 &&
				eventObj.year === currYear
			) {
				event = true;
			}
		});

		// if day is today
		if (
			i === new Date().getDate() &&
			currMonth === new Date().getMonth() &&
			currYear === new Date().getFullYear()
		) {
			activeDay = i;
			showEvent(i);

			if (event) {
				// setup current day
				if (
					i === new Date().getDate() &&
					currYear === new Date().getFullYear() &&
					currMonth === new Date().getMonth()
				) {
					days += `<div class="day day__active active-hover">${i}
                    <p class=event-dot></p>
                   </div>`;
				} else {
					// rest days
					days += `<div class="day">${i} <p class=event-dot></p></div>`;
				}
			} else {
				// setup current day
				if (
					i === new Date().getDate() &&
					currYear === new Date().getFullYear() &&
					currMonth === new Date().getMonth()
				) {
					days += `<div class="day day__active active-hover">${i}</div>`;
				} else {
					// rest days
					days += `<div class="day">${i}</div>`;
				}
			}
		} else {
			if (event) {
				// setup current day
				if (
					i === new Date().getDate() &&
					currYear === new Date().getFullYear() &&
					currMonth === new Date().getMonth()
				) {
					days += `<div class="day day__active active-hover">${i}
                    <p class=event-dot></p>
                   </div>`;
				} else {
					// rest days
					days += `<div class="day">${i} <p class=event-dot></p></div>`;
				}
			} else {
				// setup current day
				if (
					i === new Date().getDate() &&
					currYear === new Date().getFullYear() &&
					currMonth === new Date().getMonth()
				) {
					days += `<div class="day day__active">${i}</div>`;
				} else {
					// rest days
					days += `<div class="day">${i}</div>`;
				}
			}
		}
	}

	// next month days
	for (let i = 1; i <= nextDays; i++) {
		days += `<div class="day day__next">${i}</div>`;
	}

	daysContainer.innerHTML = days;
	// turn on function addListenerOnDay
	addListenerOnDay();
};

// prev month
const prevMonth = () => {
	currMonth--;
	if (currMonth < 0) {
		currMonth = 11;
		currYear--;
	}
	createCalendar();
};

// next month
const nextMonth = () => {
	currMonth++;
	if (currMonth > 11) {
		currMonth = 0;
		currYear++;
	}
	createCalendar();
};

// switch months buttons
monthBtn.forEach((btn) => {
	btn.addEventListener('click', () => {
		if (btn.id == 'prev') {
			prevMonth();
		} else if (btn.id == 'next') {
			nextMonth();
		}
	});
});

// addEventListener on today btn
todayBtn.addEventListener('click', () => {
	today = new Date();
	currMonth = today.getMonth();
	currYear = today.getFullYear();
	createCalendar();
});

// function which setup calendar to current month with current day
const goToDate = () => {
	const dateArr = eventBtnControlInput.value.split('/');
	if (dateArr.length === 2) {
		if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
			currMonth = dateArr[0] - 1;
			currYear = dateArr[1];
			createCalendar();
			return;
		}
	}
	alert('invalid date!');
};

// addEventListener on input
eventBtnControlInput.addEventListener('input', (e) => {
	// allow only numbers and remove placeholder
	eventBtnControlInput.value = eventBtnControlInput.value.replace(/[^0-9/]/g, '');

	// if length is equal 2 add slash
	if (eventBtnControlInput.value.length === 2) {
		eventBtnControlInput.value += '/';
	}

	// if length is bigger than seven remove (splice) rest numbers
	if (eventBtnControlInput.value.length > 7) {
		eventBtnControlInput.value = eventBtnControlInput.value.slice(0, 7);
	}

	if (e.inputType === 'deleteContentBackward') {
		if (eventBtnControlInput.value.length === 3) {
			eventBtnControlInput.value = eventBtnControlInput.value.slice(0, 2);
		}
	}
});

// addEventListener to click on today button and run goToDate
eventBtnControlGo.addEventListener('click', () => {
	goToDate();
});

// remove active on clicked hover
const removeActiveHover = () => {
	const allDays = document.querySelectorAll('.day');
	const currDay = document.querySelector('.day__active');

	allDays.forEach((day) => {
		if (day.classList.contains('day day__active')) {
			currDay.classList.add('active-hover');
		} else {
			day.classList.remove('active-hover');
		}
	});
};

//show events on Event list
const showEvent = (date) => {
	let events = '';

	eventsArr.forEach((event) => {
		// get events from active day only
		if (date === event.day && currMonth + 1 === event.month && currYear === event.year) {
			// show events on event list
			event.events.forEach((event) => {
				events += `<div class="plans__event-day">
                        <div class="plans__event-day-title">
                            <i class="fa-solid fa-angle-right"></i>
                            <h3>${event.title}</h3>
                        </div>
                        <div class="plans__event-day-time">
                            <p>${event.time}</p>
                        </div>
                    </div>`;
			});

			if (activeDay === event.day) {
				eventList.classList.add('show');
				eventBtnControls.classList.add('hide');
				showDate(event.day);

				// if (
				// 	eventBtn.forEach((btn) => {
				// 		btn.addEventListener('click', () => {
				// 			if (btn.id === 'btn-dismiss-list-event') {
				// 				eventList.classList.remove('show');
				// 				eventBtnControls.classList.remove('hide');
				// 			} else if (btn.id === 'btn-add-list-event') {
				// 				eventList.classList.remove('show');
				// 				eventWindow.classList.add('show');
				// 			}
				// 		});
				// 	})
				// );
			}

			console.log('event: ', event);
		}
	});

	eventListContainer.innerHTML = events;
	// console.log("events: ", events);

	// turn on function to save events to file
	saveEvents();
};

// show current date (day, month, year)
const showDate = (e) => {
	selectedDay.forEach((selectDay) => {
		selectDay.innerText = `${e} ${monthsArray[currMonth].substring(0, 3)} ${currYear}`;
	});
};

// add event to eventArray
const addEventToEventList = () => {
	const addTitle = eventName.value;
	const addTimeFrom = document.getElementById('event-from-time');
	const addTimeTo = document.getElementById('event-to-time');

	// emty fields validation
	if (addTitle === '' || addTimeFrom.value === '' || addTimeTo.value === '') {
		alert('Please fill all fields!');
		return;
	}

	// invalid time format validation
	const timeFromArr = addTimeFrom.value.split(':');
	const timeToArr = addTimeTo.value.split(':');

	if (
		timeFromArr.length !== 2 ||
		timeToArr.length !== 2 ||
		timeFromArr[0] > 23 ||
		timeFromArr[0] === '' ||
		timeFromArr[1] > 59 ||
		timeFromArr[1] === '' ||
		timeToArr[0] > 23 ||
		timeToArr[0] === '' ||
		timeToArr[1] > 59 ||
		timeToArr[1] === ''
	) {
		alert('Ivalid time format!');
		return;
	}

	const timeFrom = addTimeFrom.value;
	const timeTo = addTimeTo.value;

	console.log('timeFromArr: ', timeFromArr[1]);
	// create new event
	const newEvent = {
		title: addTitle,
		time: timeFrom + ' - ' + timeTo,
	};

	let eventAdded = false;

	// check if eventsArr isn't empty
	if (eventsArr.length > 0) {
		// check if currDay has alredy any event then add
		eventsArr.forEach((item) => {
			if (
				item.day === activeDay &&
				item.month === currMonth + 1 &&
				item.year === currYear
			) {
				item.events.push(newEvent);
				eventAdded = true;
			}
		});
	}

	// if event array empty or currDay has no event, then create new
	if (!eventAdded) {
		eventsArr.push({
			day: activeDay,
			month: currMonth + 1,
			year: currYear,
			events: [newEvent],
		});
	}

	// remove active from add event form
	// removeActiveHover();

	// set empty fields
	eventName.value = '';
	addTimeFrom.value = '';
	addTimeTo.value = '';

	showEvent(activeDay);
};

// event listener on button controls
eventBtn.forEach((btn) => {
	btn.addEventListener('click', () => {
		if (btn.id === 'btn-add-event') {
			addEventToEventList();
			eventWindow.classList.remove('show');
			eventList.classList.remove('show');
			eventBtnControls.classList.remove('hide');
			createCalendar();
		} else if (btn.id === 'btn-dismiss-event') {
			eventWindow.classList.remove('show');
			eventBtnControls.classList.remove('hide');
			removeActiveHover();
			createCalendar();
		} else if (btn.id === 'btn-add-list-event') {
			// addEventToEventList();
			eventWindow.classList.add('show');
			eventList.classList.remove('show');
		}
		console.log('eventsArr :', eventsArr);
	});
});

dismissBtnList.addEventListener('click', () => {
	eventList.classList.remove('show');
	eventBtnControls.classList.remove('hide');
});

// set max 30 char into eventName
eventName.addEventListener('input', (e) => {
	eventName.value = eventName.value.slice(0, 30);
});

// set numbers in input starts at / end
eventTimeInput.forEach((input) => {
	input.addEventListener('input', (e) => {
		// possiblity to add just numbers into input
		input.value = input.value.replace(/[^0-9:]/g, ' ');

		if (input.value.length === 2) {
			input.value += ':';
		}

		if (input.value.length > 5) {
			input.value = input.value.slice(0, 5);
		}
	});
});

// add listener on each day
const addListenerOnDay = () => {
	const days = document.querySelectorAll('.day');

	days.forEach((day) => {
		day.addEventListener('click', (e) => {
			// set current day as active day
			activeDay = Number(e.target.innerText);

			// show date
			showDate(e.target.innerText);

			console.log('e target: ', e);

			// remove active from active day
			days.forEach((day) => {
				day.classList.remove('active-hover');
			});

			if (e.target.classList.contains('day' || 'day__active')) {
				eventWindow.classList.add('show');
				eventBtnControls.classList.add('hide');
			}

			if (e.target.childNodes.length >= 2) {
				eventWindow.classList.remove('show');
				eventList.classList.add('show');
				showEvent(Number(e.target.textContent));
			} else {
				eventList.classList.remove('show');
			}

			if (e.target.classList.contains('day__prev')) {
				prevMonth();
				eventWindow.classList.remove('show');
				eventBtnControls.classList.remove('hide');
				eventList.classList.remove('show');
			}

			if (e.target.classList.contains('day__next')) {
				nextMonth();
				eventWindow.classList.remove('show');
				eventBtnControls.classList.remove('hide');
				eventList.classList.remove('show');
			}

			if (
				!e.target.classList.contains('day day__prev') ||
				!e.target.classList.contains('day day__next')
			) {
				e.target.classList.add('active-hover');
			}

			console.log('activeDay: ', activeDay);
			console.log('e.target: ', e.target.innerText);
		});
	});
};

// remove event from list on click
eventListContainer.addEventListener('click', (e) => {
	if (e.target.classList.contains('plans__event-day')) {
		const eventTitle = e.target.children[0].children[1].innerHTML;

		// get the title of event correct with title from title list
		eventsArr.forEach((event) => {
			if (
				event.day === activeDay &&
				event.month === currMonth + 1 &&
				event.year === currYear
			) {
				event.events.forEach((item, index) => {
					if (item.title === eventTitle) {
						event.events.splice(index, 1);
					}
				});
			}

			// check if events is empty then
			if (event.events.length === 0) {
				// eventsArr.splice(eventsArr.indexOf(event), 1);

				console.log('eventsArr.splce: ', eventsArr.splice(eventsArr.indexOf(event), 1));

				// const activeDayEl = document.querySelector('.day');
				const eventDot = document.querySelector('.event-dot');

				eventDot.style.dispay = 'none';
				createCalendar();

				// createCalendar();
			}
		});

		// udpate day
		showEvent(activeDay);
		eventList.classList.remove('show');
		eventBtnControls.classList.remove('hide');
	}
});

// save events to lacal storage
const saveEvents = () => {
	localStorage.setItem('events', JSON.stringify(eventsArr));
};

// after refresh website events will stay
function getEvents() {
	if (localStorage.getItem('events' === null)) {
		return;
	} else if (localStorage.getItem('events') !== null) {
		eventsArr.push(...JSON.parse(localStorage.getItem('events')));
	}
}

createCalendar();
