// -----------burger---------
function burger() {
	const burgerBtn = document.getElementById('burgerBtn')
	const nav = document.getElementById('nav')
	const headerBtm = document.getElementById('headerBtm')
	const headerContacts = document.getElementById('headerContacts')

	function burgerAction(
		burgerAction,
		navAction,
		headerBtmAction,
		headerContactsAction
	) {
		burgerBtn.classList[burgerAction]('burger--active')
		nav.classList[navAction]('nav--visible')
		headerBtm.classList[headerBtmAction]('header-btm--hide')
		headerContacts.classList[headerContactsAction]('contacts--visible')
	}

	burgerBtn.addEventListener('click', () =>
		burgerAction('toggle', 'toggle', 'toggle', 'toggle')
	)

	return burgerAction
}

function handleScroll(isFlag, burgerAction) {
	const windowHeight = window.innerHeight
	const scrollHeight = window.scrollY
	console.log('gggg')

	if (scrollHeight >= 1.4 * windowHeight && isFlag) {
		isFlag = false
		burgerAction('remove', 'remove', 'remove', 'remove')
	}

	if (scrollHeight <= 1.4 * windowHeight && !isFlag) {
		isFlag = true
	}
}

export function showTitle() {
	const titles = document.querySelectorAll('.title')
	gsap.registerPlugin(ScrollTrigger)
	titles.forEach(title => {
		gsap.to(title, {
			scrollTrigger: {
				trigger: title,
				start: 'top 60%',
				end: 'bottom 0',
				onToggle: self => {
					if (self.isActive) {
						title.classList.add('active')
					} else {
						title.classList.remove('active')
					}
				},
			},
		})
	})
}

function showHeading() {
	gsap.from('.header-btm__tagline-heading', {
		opacity: 0,
		scale: 1.4,
		duration: 1,
		delay: 1,
		ease: 'bounce.out',
	})
}

function typeWriterEffect() {
	const servicesItems = document.querySelectorAll('.services__item')

	const servicesList = {
		1: 'Строительство жилых домов',
		2: 'Ремонт и реконструкция',
		3: 'Отделка и дизайн',
		4: 'Строительство объектов инфраструктуры',
		5: 'Инженерные коммуникации',
		6: 'Ландшафтный дизайн',
		7: 'Строительство бассейнов и спа-зон',
		8: 'Энергосберегающие технологии',
		9: 'Консультационные услуги',
	}

	const typingSpeed = 70

	function writerLetter(index, text, element) {
		if (index < text.length) {
			element.innerHTML += text.charAt(index)
			setTimeout(() => writerLetter(index + 1, text, element), typingSpeed)
		}
	}

	servicesItems.forEach((item, index) => {
		const text = servicesList[index + 1]
		writerLetter(0, text, item)
	})
}

function map() {
	ymaps.ready(init)
	function init() {
		const mapElem = document.querySelector('#map')
		const myMap = new ymaps.Map(
			'map',
			{
				center: [55.75846806898367, 37.60108849999989],
				zoom: 14,
				controls: ['geolocationControl', 'zoomControl'],
			},
			{
				suppressMapOpenBlock: true,
				geolocationControlSize: 'large',
				geolocationControlPosition: { top: '200px', right: '20px' },
				geolocationControlFloat: 'none',
				zoomControlSize: 'small',
				zoomControlFloat: 'none',
				zoomControlPosition: { top: '120px', right: '20px' },
			}
		)

		myMap.behaviors.disable('scrollZoom')

		const myPlacemark = new ymaps.Placemark(
			[55.75846806898367, 37.60108849999989],
			{},
			{
				iconLayout: 'default#image',
				iconImageHref: '../icon/loc.ico',
				iconImageSize: [50, 50],
				iconImageOffset: [0, 0],
			}
		)

		myMap.geoObjects.add(myPlacemark)
		myMap.container.fitToViewport()
	}
}



window.addEventListener('DOMContentLoaded', () => {
	let isFlagWriter = true
	let isFlagHeight = true

	const burgerAction = burger()
	showTitle()
	showHeading()
	map()

	// -------------------------------
	gsap.to('.services__item', {
		scrollTrigger: {
			trigger: '.services__item',
			start: 'top 100%',
			end: 'bottom 0',
			onEnter: () => {
				if (isFlagWriter) {
					typeWriterEffect()
					isFlagWriter = false
				}
			},
		},
	})

	// -------------------------------
	const swiperReviews = new Swiper('.reviews__slider-content', {
		direction: 'horizontal',
		loop: false,

		slidesPerView: 1,
		spaceBetween: 20,

		grabCursor: true,
		autoHeight: true,

		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},

		watchOverflow: true,

		slidesPerGroup: 1,

		speed: 600,

		breakpoints: {
			1444: {
				slidesPerView: 2,
				slidesPerGroup: 2,
			},
		},

		// Navigation arrows
		navigation: {
			nextEl: '.reviews__btn-next',
			prevEl: '.reviews__btn-prev',
		},
	})

	// -------------------------------
	window.addEventListener('scroll', () => handleScroll(isFlagHeight, burgerAction))

})
