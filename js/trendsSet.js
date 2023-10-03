const total = 158;
const chartBtns = document.querySelector('.trends__btns');
const chartPie = document.querySelector('.trends__chart-pie');
const activeClass = 'trends__active';

// tworzymy obiekt który przechowuje klucx wartość
const continents = {
	asia: 60,
	europe: 40,
	northAmerica: 20,
	oceania: 5,
	africa: 10,
};

const numberFixer = (number) => {
	const result = (number * total) / 100;
	return result;
};

// tworzymy przycisk dla każdego z kraju
// for (property in continents) {
// 	const chartBtn = document.createElement('button');
// 	chartBtn.textContent = property;
// 	chartBtn.setAttribute('data-name', property);
// 	chartBtn.classList.add('trends__btn')
// 	chartBtns.appendChild(chartBtn);
// }

chartBtns.addEventListener('click', (e) => {
	if (e.target != e.currentTarget) {
		const el = e.target;
		const name = el.getAttribute('data-name');
		console.log('name: ', name);
		console.log('el: ', el);

		renderChart(name);
		setActiveClass(el);
	}
	e.stopPropagation();
});

const renderChart = (name) => {
	const number = continents[name];
	const fixedNumber = numberFixer(number);
	result = fixedNumber + ' ' + total;

	chartPie.style.strokeDasharray = result;
};

const setActiveClass = (el) => {
	for (let i = 0; i < chartBtns.children.length; i++) {
		chartBtns.children[i].classList.remove(activeClass);
		el.classList.add(activeClass);
	}
};
