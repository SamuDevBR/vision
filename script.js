// Função para rolar o carrossel conforme o scroll
window.addEventListener('scroll', function() {
    const carrossel = document.querySelector('.carrossel');
    const scrollPosition = window.scrollY;

    // A cada rolagem, movemos o carrossel
    const moveDistance = scrollPosition * 0.2; // Ajuste o valor para controlar a velocidade
    carrossel.style.transform = `translateX(-${moveDistance}px)`;
});
