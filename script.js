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
const aboutText = document.querySelector('.about-text');
const contactText = document.querySelector('.contact-text');
const SkillsText = document.querySelector('.Skills');
const ProjectsText = document.querySelector('.Projects');
const natureText = document.querySelector('.nature');

const aboutSection = document.querySelector('.about-section');
const contactSection = document.querySelector('.contact-section');
const SkillsSection = document.querySelector('.Skills-section');
const ProjectsSection = document.querySelector('.Projects-section');
const natureSection = document.querySelector('.nature-section');

const aboutClose = document.querySelector('.about-close');
const contactClose = document.querySelector('.contact-close');
const SkillsClose = document.querySelector('.Skills-close');
const ProjectsClose = document.querySelector('.Projects-close');
const natureClose = document.querySelector('.nature-close')
const body=document.querySelector(".body")

aboutText.addEventListener('click', () => {
    body.classList.add("about-on");
});

contactText.addEventListener('click', () => {
    body.classList.add("contact-on");
});

SkillsText.addEventListener('click', () => {
    body.classList.add("Skills-on");
});

ProjectsText.addEventListener('click', () => {
    body.classList.add("Projects-on");
});

natureText.addEventListener('click', () => {
    body.classList.add("nature-on");
});

aboutClose.addEventListener('click', () => {
    body.classList.remove("about-on");
});

contactClose.addEventListener('click', () => {
    body.classList.remove("contact-on");
});

SkillsClose.addEventListener('click', () => {
    body.classList.remove("Skills-on");
});

ProjectsClose.addEventListener('click', () => {
    body.classList.remove("Projects-on");
});

natureClose.addEventListener('click', () => {
    body.classList.remove("nature-on");
});
