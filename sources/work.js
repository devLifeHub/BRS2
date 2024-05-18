import { showTitle } from './script.js'

function initializeSwiper(sliderClass, nextBtnClass, prevBtnClass) {
	return new Swiper(sliderClass, {
		direction: 'horizontal',
		loop: false,
		slidesPerView: 1,
		spaceBetween: 20,
		grabCursor: true,
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
		navigation: {
			nextEl: nextBtnClass,
			prevEl: prevBtnClass,
		},
	})
}



window.addEventListener('DOMContentLoaded', () => {
	showTitle()

	const swiperwork1 = initializeSwiper(
		'.work__slider1',
		'.work-btn-next1',
		'.work-btn-prev1'
	)

	const swiperwork2 = initializeSwiper(
		'.work__slider2',
		'.work-btn-next2',
		'.work-btn-prev2'
	)

	const swiperwork3 = initializeSwiper(
		'.work__slider3',
		'.work-btn-next3',
		'.work-btn-prev3'
	)

	const swiperwork4 = initializeSwiper(
		'.work__slider4',
		'.work-btn-next4',
		'.work-btn-prev4'
	)
})
