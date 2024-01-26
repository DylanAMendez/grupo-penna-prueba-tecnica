const carruselContainer = document.querySelector('.carruselContainer');
const slides = document.querySelectorAll('.carruselSlide');

let current = -1;
let intervaloId;

function moverCarrusel()
{
    current = (current + 1) % slides.length;
    updateCarrusel();
}

function updateCarrusel()
{
    slides.forEach((slide, index) => 
    {
        const size = index === current ? 500 : 150;
        slide.style.flex = `0 0 ${size}px`
    })

    const targetPosition = -current * slides[0].clientWidth * .7;
    carruselContainer.style.transform = `translateX(${targetPosition}px)`;
}

function startCarrusel()
{
    intervaloId = setInterval(moverCarrusel, 2000);
}

function stopCarrusel()
{
    clearInterval(intervaloId);
}

carruselContainer.addEventListener('mouseover', stopCarrusel);
carruselContainer.addEventListener('mouseout', startCarrusel);

startCarrusel();
