const cursor = document.querySelector('#cursor');
const cursor2 = document.querySelector('#cursor2');
const cursor3 = document.querySelector('#cursor3');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    cursor2.style.left = e.pageX + 'px';
    cursor2.style.top = e.pageY + 'px';
    cursor3.style.left = e.pageX + 'px';
    cursor3.style.top = e.pageY + 'px';
});
document.querySelectorAll('.hover-target').forEach((item) => {
    item.addEventListener('mouseover', () => {
        cursor.classList.add('hover');
        cursor2.classList.add('hover');
        cursor3.classList.add('hover');
    });
    item.addEventListener('mouseout', () => {
        cursor.classList.remove('hover');
        cursor2.classList.remove('hover');
        cursor3.classList.remove('hover');
    });
});

$(".about-text").on('click', function () {
	$("body").addClass("about-on");
});
$(".about-close").on('click', function () {
	$("body").removeClass("about-on");
});


$(".contact-text").on('click', function () {
	$("body").addClass("contact-on");
});
$(".contact-close").on('click', function () {
	$("body").removeClass("contact-on");
});


$(".Skills").on('click', function () {
	$("body").addClass("Skills-on");
});
$(".Skills-close").on('click', function () {
	$("body").removeClass("Skills-on");
});


$(".Projects").on('click', function () {
	$("body").addClass("Projects-on");
});
$(".Projects-close").on('click', function () {
	$("body").removeClass("Projects-on");
});


$(".nature").on('click', function () {
	$("body").addClass("nature-on");
});
$(".nature-close").on('click', function () {
	$("body").removeClass("nature-on");
});