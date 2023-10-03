// deklaracja zmiennych dla utworzenia kalendarza
const currDate = document.querySelector('.plans__date-current');
const monthsBtn = document.querySelectorAll('.plans__date-btn');
const days = document.querySelector('.plans__days');

let date = new Date();
let currMonth = date.getMonth();
let year = date.getFullYear();
const month = [
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

// deklaracja zmiennych dla okna z wydarzeniami
const eventWindow = document.querySelector('.plans__event');
const selectedDay = document.querySelector('.selected-day');
const eventBtn = document.querySelectorAll('.plans__event-btn');
const addErrorInfo = document.querySelector('.plans__event-information');

// deklaracja zmiennych do obsługi kalendarza
let lastClickedDay = null;
let clickedDay;
let dataValues;
const eventMonth = {};
// let dotArray = [];

// deklaracja zmiennych dla listy z wydarzeniami
const eventDayList = document.querySelector('.plans__event-day-list');
const eventDayListContainer = document.querySelector(
	'.plans__event-day-list-container'
);
const eventComment = document.getElementById('comment');
const eventHour = document.getElementById('event-hour');
const eventWindowError = document.querySelector('.plans__event-error');
const eventArray = [];
let eArray;
let eventDate;
let createEvent;

const dotsData = [];

// funkcja odpowiedzialna za obsługę kalendarza wczytanie dni
const createCalendar = () => {
	// deklarujemy zmienną dynamiczną przechowującą dany rok oraz miesiąc ustawiony na pozycję 1
	let firstDayOfMonth = new Date(year, currMonth, 1).getDay();
	console.log(firstDayOfMonth);

	let lastDateOfMonth = new Date(year, currMonth + 1, 0).getDate();
	console.log(lastDateOfMonth);

	// tworzymy dynamiczną zmienną przechowującą nową datę z argumentami aktualny rok, aktualny miesiąc oraz ostatnia data miesiąca. uruchamiamy funkcję getDay()
	let lastDayOfMonth = new Date(year, currMonth, lastDateOfMonth).getDay();
	console.log(lastDayOfMonth);

	// tworzymy zmienną dynamiczną przechowującą ostatni dzień ostatniego miesiąca
	let lastDateOfLastMonth = new Date(year, currMonth, 0).getDate();
	console.log(lastDateOfLastMonth);

	// deklarujemy pustą zmienną dynamiczną
	let dayTag = '';

	// pętla for odpowiedzialna za wypisanie ostatnich dni poprzedniego miesiąca. ustawiamy zmienną dynamiczną i na pierwszy dzień miesiąca; sprawdzamy czy i jest większe od 0 i>0; jeśli tak to zmniejszamy i--;
	for (let i = firstDayOfMonth; i > 0; i--) {
		// zmienną dynamiczną zwiększamy tyle razy ile wykonuje się pętla i przypisujemy paragraf z klasą day__inactive natomiast jako zawartość zwracamy ostatnią datę ostatniego miesiąca - i + 1

		dayTag += `<div class="day__inactive">${lastDateOfLastMonth - i + 1}</div>`;
	}

	// pętla for odpowiedzialna za przydzielanie wszystkich aktualnych dni danego miesiąca do kalendarza. Zienną i ustawiamy na 1; sprawdzamy czy i jest mniejsze lub równe ostatni dzień miesiąca (lastDateOfMonth); jeśli jest mniejsze to zwiększamy i++
	for (let i = 1; i <= lastDateOfMonth; i++) {
		// tworzymy nową dynamiczną zmienną do której przypisujemy i
		let todayTag = i;

		// następnie sprawdzamy instrukcją warunkową czy todayTag jest identyczne co aktualna data todayTag === date.getDate()

		if (todayTag === date.getDate()) {
			// jeśli tak, przypisz nazwę klasy 'day__active' do zmiennej todayTag
			todayTag = 'day day__active';
		} else {
			// w przeciwnym wypadku ustaw pustą klasę
			todayTag = 'day';
		}

		// skrócony zapis pętli if
		// let todayTag = i === date.getDate() ? "day__active" : "";

		if (dotsData.length == 0) {
			// przypisujemy i zwiększamy zmienną dayTag o paragraf przechowujący nazwę klasy (pustą lub day__active)
			dayTag += `<div class='${todayTag}'>${i}</div>`;
		} else {
			dayTag += `<div class='${todayTag}'>${i} TW </div>`;
		}

		// addDotsToMonth(dayTag, todayTag, i);
	}

	// pętla odpowiedzialna za wypisanie ostatnich dni miesiąca. Ustawiamy zmienną i przypisując jej ostatni dzień miesiąca; sprawdzamy czy i jest mniejsze od 6 i < 6; jeśli tak zwiększamy i++
	for (let i = lastDayOfMonth; i < 6; i++) {
		// tyle razy ile wykona się pętla for, zmienną dayTag zwiększamy + i przypisujemy = paragraf z klasą day__inactive natomiast zawartość od i odejmujemy ostatni dzień miesiąca i dodajemy 1
		dayTag += `<div class="day__inactive">${i - lastDayOfMonth + 1}</div>`;
	}

	// do zmiennej przechowującej miesiąc z rokiem przypisujemy jako tekst (textContent) miesiąc pobieramy pozycje miesiąca z tablicu (month[currMonth]) oraz rok
	currDate.textContent = `${month[currMonth]} ${year}`;

	// sprawdzamy czy klucz obiektu eventMonth pasuje/zawiera includes (wartość bieżący miesiąc rok (currDate))

	days.innerHTML = dayTag;

	addDotsToMonth();
};

// przechodzimy pętlą forEach przez każdy przycisk w kalendarzu (przyciski przełączania miesiąca)
monthsBtn.forEach((btn) => {
	// na przycisk ustawiamy nasłuch na klik
	btn.addEventListener('click', () => {
		// // jeśli id przycisku jest równe 'prev'
		// if(btn.id === 'prev')
		// {
		//     // zminiejszamy miesiąc o jedną wartość
		//     currMonth -= 1;
		//     // a następnie wczytujemy funkcje kalendarza
		//     createCalendar();
		// }
		// // w przeciwnym wytpadku jeśli id jest równe 'next'
		// else if(btn.id === 'next')
		// {
		//     // zwiększamy miesiąc o jeden
		//     currMonth += 1;
		//     // wczytujemy ponownie kalendarz
		//     createCalendar();
		// }

		// sposób krótszego zapisu pętli if
		currMonth = btn.id === 'prev' ? currMonth - 1 : currMonth + 1;

		// warunek odpowiedzialny za wyświetlanie poprawnej daty poza bieżącym rokiem. Warunek sprawdza czy obecny miesiąc currMonth jest mniejszy od zera lub || większy od 11
		if (currMonth < 0 || currMonth > 11) {
			// to tworzymy nową zmienną date przechowującą date z obecnym miesiącem oraz rokiem
			date = new Date(year, currMonth);
			// do zmiennej rok przypisujemy obecną datę pobierającą rok
			year = date.getFullYear();
			// do zmiennej currMonth przypisujemy obecną datę pobierającą miesiąc
			currMonth = date.getMonth();
		}
		// w przeciwnym wypadku
		else {
			// przekaż datę jako nowa data
			date = new Date();
		}

		createCalendar();
	});
});

// funkcja odpowiedzialna za dodawanie elementów do objektu. Tworzymy obiekt który będzie przechowywał dany dzień miesiąc oraz rok jako klucz natomiast elementem tego klucza będzie zadanie
const addTaskToObject = (selectedE) => {
	// tworzymy zmienną przechwytującą
	dataValues = `${clickedDay.innerText} ${month[currMonth]} ${year}`;

	eArray = [];

	eArray.push(
		dataValues,
		selectedE.defaultValue,
		eventComment.value,
		eventHour.value
	);
	eventArray.push(eArray);

	// eventArray.sort(function(a,b) {
	//     const dateA = new Date(a[0]);
	//     const dateB = new Date(b[0]);
	//     return dateA - dateB;
	// });

	console.log('eventArray: ', eventArray);
};

// funkcja odpowiedzialna za przechowywanie każedego z miesiąca razem z dniami na które zostaly naniesione eventy. Uruchamia się gdy przełączamy miesiące
// const addMonthToObject = () =>
// {
//     let monthKey = `${month[currMonth]} ${year}`;
//     eventMonth[monthKey] = [];

//     eventMonth[monthKey].push(days.innerHTML);
//     console.log(`eventMonth:`, eventMonth);
// }

// funkcja odpowiedzialna za tworzenie kropki i dodawanie jej
const createDotsMonth = () => {
	// jeśli tak to tworzymy nową zmienną przechowującą kliknięty radio input
	const selectedEvent = document.querySelector("input[name='event']:checked");

	addTaskToObject(selectedEvent);

	// sprawdzamy czy input radio zawiera
	// if(selectedEvent)
	// {
	// sprawdzamy co zwraca konsola
	console.log('selectedEvent: ', selectedEvent);
	// tworzymy kolejną zmienną do której przypisujemy nowo utworzony paragraf
	createEvent = document.createElement('p');
	// przypisujemy klasę utworzonemu paragrafowi
	createEvent.classList.add('event-dot');

	dotsData.push(createEvent);

	if (selectedEvent.value === 'call') {
		createEvent.setAttribute('data-value', `${dataValues}`);
		createEvent.setAttribute('data-name', `${selectedEvent.value}`);

		createEvent.style.background = 'rgb(250, 60, 60)';
		// do ostatniego klikniętego elementu dodajemy utworzony element appendChild
		lastClickedDay.appendChild(createEvent);
		//  console.log('createEvent: ', createEvent);
		//  eArray.push(createEvent.style.background);
	} else if (selectedEvent.value === 'meeting') {
		createEvent.setAttribute('data-value', `${dataValues}`);
		createEvent.setAttribute('data-name', `${selectedEvent.value}`);
		createEvent.style.background = 'orange';
		lastClickedDay.appendChild(createEvent);
	} else if (selectedEvent.value === 'personal') {
		createEvent.setAttribute('data-value', `${dataValues}`);
		createEvent.setAttribute('data-name', `${selectedEvent.value}`);
		createEvent.style.background = 'rgb(0, 219, 0)';
		lastClickedDay.appendChild(createEvent);
	} else if (selectedEvent.value === 'travel') {
		createEvent.setAttribute('data-value', `${dataValues}`);
		createEvent.setAttribute('data-name', `${selectedEvent.value}`);
		createEvent.style.background = 'royalblue';
		lastClickedDay.appendChild(createEvent);
	} else if (selectedEvent.value === 'conference') {
		createEvent.setAttribute('data-value', `${dataValues}`);
		createEvent.setAttribute('data-name', `${selectedEvent.value}`);
		createEvent.style.background = 'rgb(184, 39, 197)';
		lastClickedDay.appendChild(createEvent);
	} else if (selectedEvent.value === 'training') {
		createEvent.setAttribute('data-value', `${dataValues}`);
		createEvent.setAttribute('data-name', `${selectedEvent.value}`);
		createEvent.style.background = 'rgb(119, 65, 21)';
		lastClickedDay.appendChild(createEvent);
	}

	//  wywołujemy funkcje dodającą do tablicy dwie wartości
	// addDotToCalendar(dataValues, createEvent.style.background);
	console.log('dotsData: ', dotsData);
};

const addDotsToMonth = (dayT, todayT, index) => {
	dotsData.forEach((paragraph) => {
		const dateValue = paragraph.getAttribute('data-value').split(' ');
		const day = parseInt(dateValue[0]);

		const monthYear = dateValue[1] + ' ' + dateValue[2];

		console.log('day: ', day);
		console.log('monthYear: ', monthYear);
		console.log('clicked day inner: ', clickedDay.innerText);
		console.log('currDate: ', currDate.innerText);

		if (clickedDay.innerText == day && currDate.innerText == monthYear);
		{
			dayT += `<div class='${todayT}'>${index} ${paragraph} </div>`;
			console.log('paragraph: ', paragraph.cloneNode(true));
		}
	});
};

// funkcja odpowiedzialna za usuwanie kropek z kalendarza
const deleteDot = (eDoneBtn) => {
	const dotToDelete = document.querySelectorAll(
		`[data-value = "${createEvent.dataset.value}"]`
	);

	console.log('dotToDelete: ', dotToDelete);

	dotToDelete.forEach((dot) => {
		eDoneBtn.addEventListener('click', () => {
			console.log('dotToDelete: ', dot);
			dot.remove();

			dotsData.splice(dot, 1);

			console.log('dotsData: ', dotsData);
		});
	});
};

// funkcja odpowiedzialna za tworzenie listy zadań
const createDayList = () => {
	// do zadeklarowanej zmiennej globalnej przypisujemy date
	eventDate = eArray[0];
	// do nowej zmiennej lokalnej eventName przypisujemy pozycje nr 1 z tablicy eArray przechowującą wydarzenia
	const eventName = eArray[1];
	// zmienna lokalna przyjmuje wartość z pozycji nr 2 tablicy eArray czyli komentarz
	const eventComment = eArray[2];
	// zmienna lokalna przyjmuje wartość z pozycji nr 3 eArray czyli godzinę
	const eventHour = eArray[3];

	console.log('eArray: ', eArray);

	// tworzymy dynamicznie element div który będzie przechowywał wcześniej przypisane pozycje
	const newEventDay = document.createElement('div');
	// nadajemy zmiennej klase
	newEventDay.className = 'plans__event-day-current';

	// do nowo utworzonego diva z klasą wkładamy za pomoca innerHTML zawartość tworzącą zadanie z wcześniej utworzonymi zmiennymi
	newEventDay.innerHTML = `
        <p class="plans__event-day-date">${eventDate}</p>
        <p class="plans__event-day-name">${eventName}</p>
        <p class="plans__event-day-comment">${eventComment}</p>
        <p class="plans__event-day-hour">${eventHour}</p>
        `;

	// dodajemy do nowo utworzony div z zawartością do kontenera
	eventDayListContainer.appendChild(newEventDay);

	// tworzymy zmienną lokalną do której przypisujemy wszystkie elementy przechowujące klasę plans__event-day-name
	const eventDayCurrent = document.querySelectorAll('.plans__event-day-name');

	// przechodzimy pętlą po wszystkich elementach
	eventDayCurrent.forEach((element) => {
		// sprawdzamy czy zawrtość elementu textContent jest identyczna co nazwa klasy
		if (element.textContent === eventName) {
			// jeśli wszystko się zgadza tworzymy zmienną rodzic elementu do którego przypisujemy najblizszy element o nazwie klasy plans__event-day-current
			const eventParent = element.closest('.plans__event-day-current');

			// jeśli eventName jest taki sam jak meeting
			if (eventName === 'meeting') {
				// na rodzica klasy nadajemy styl odpowiedni do koloru kropki na kalendarzu
				eventParent.style.borderBottom = '1px solid orange';
			}
			if (eventName === 'call') {
				eventParent.style.borderBottom = '1px solid rgb(250, 60, 60)';
			}
			if (eventName === 'conference') {
				eventParent.style.borderBottom = '1px solid rgb(184, 39, 197)';
			}
			if (eventName === 'training') {
				eventParent.style.borderBottom = '1px solid rgb(119, 65, 21)';
			}
			if (eventName === 'personal') {
				eventParent.style.borderBottom = '1px solid rgb(0, 219, 0)';
			}
			if (eventName === 'travel') {
				eventParent.style.borderBottom = '1px solid royalblue';
			}
		}
	});

	// następnie listę trzeba posortować zgodnie z datą wprowadzenia wydarzenia

	// tworzymy zmienną lokalną, która przechowuje wszystkie utworzone wydarzenia
	const eventDays = document.querySelectorAll('.plans__event-day-current');
	// następnie tworzymy kolejną zmienną lokalną przechowującą tablicę elementów z from zmiennej eventDays
	const eventDaysArray = Array.from(eventDays);

	// sortujemy tablicę, ustawiamy dwie zmienne które zostaną zwrócone a i b
	eventDaysArray.sort((a, b) => {
		// tworzymy zmienną lokalną dateA która przechowuje nową datę zmiennej a która jest ustawiona na plans__event-day-date.textContent
		const dateA = new Date(
			a.querySelector('.plans__event-day-date').textContent
		);
		// tworzymy zmienną lokalną dateB która przechowuje nową datę zmiennej b która jest ustawiona na plans__event-day-date.textContent
		const dateB = new Date(
			b.querySelector('.plans__event-day-date').textContent
		);
		// odejmujemy daty od siebie i zwracamy wynik
		return dateA - dateB;
	});

	eventDaysArray.forEach((element) => {
		eventDayListContainer.appendChild(element);
	});

	console.log('eventDaysArray :', eventDaysArray);

	eventDays.forEach((element, index) => {
		if (!element.querySelector('.plans__event-day-btn')) {
			const eventDoneBtn = document.createElement('button');
			eventDoneBtn.classList.add('plans__event-day-btn');
			eventDoneBtn.id = `event-done-${index}`;
			eventDoneBtn.innerHTML = ` <i class="fa-solid fa-check"></i>`;

			eventDoneBtn.addEventListener('click', () => {
				element.remove();
				console.log('element: ', element);

				if (eventDayListContainer.childElementCount === 0) {
					eventDayList.classList.remove('show');
				}
			});

			deleteDot(eventDoneBtn);

			element.appendChild(eventDoneBtn);
		}
	});

	eventDayList.classList.add('show');
};

// funkcja odpowiedzialna za sterowanie kalendarzem
const calendarControl = () => {
	// przechodzimy pętłą przez dwa przyciski add oraz dismiss
	eventBtn.forEach((btn) => {
		// ustawiamy nasłuchiwanie na klik na dwa przyciski
		btn.addEventListener('click', () => {
			// sprawdzamy czy id przycisku jest identyczne co 'btn-add-event' jeśli tak
			if (btn.id === 'btn-add-event') {
				if (eventComment.value == '' || eventHour.value == '') {
					eventWindowError.classList.add('show');
				} else {
					// sprawdzamy czy zmienna lastClickedDay przechowuje ostatni dzień
					if (lastClickedDay) {
						createDotsMonth();
						// addMonthToObject();
						createDayList();
					}

					// usuwamy klasę wyświetlającą okno z wydarzeniami
					eventWindow.classList.remove('show');
					eventWindowError.classList.remove('show');
				}
			}
			//jeśli wybrany przycisk ma id równe btn-dismiss-event
			else if (btn.id === 'btn-dismiss-event') {
				// to zamknij okno z dodawaniem zadania
				eventWindow.classList.remove('show');
				eventWindowError.classList.remove('show');

				if (eventArray.length > 0) {
					eventDayList.classList.add('show');
				} else {
					eventDayList.classList.remove('show');
				}
			} else if (btn.id === 'btn-dismiss-list-event') {
				eventDayList.classList.remove('show');
			}
		});
	});
};

days.addEventListener('click', (event) => {
	clickedDay = event.target.closest('.day');

	selectedDay.innerText = `${event.target.innerText} ${month[currMonth]}`;

	if (
		event.target.classList.contains('day') ||
		event.target.classList.contains('day__active')
	) {
		eventWindow.classList.add('show');
		addErrorInfo.classList.remove('show');
		eventDayList.classList.remove('show');
		console.log('clicked Day: ', clickedDay);

		if (clickedDay) {
			lastClickedDay = clickedDay;
		}
	} else {
		eventWindow.classList.remove('show');
		addErrorInfo.classList.add('show');
		console.log('day INACTIVE is clicked!');
	}
});

// wywołanie funkcji
createCalendar();
calendarControl();
