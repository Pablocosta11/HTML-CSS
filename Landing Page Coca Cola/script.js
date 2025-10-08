const menu = document.querySelector('.meunu');
const menuUL = document.querySelector('.navegation ul');

menu.addEventListener('click', ()=> {
    navUL.classList.toggle('active');
    menu.classList.toggle('active');
})