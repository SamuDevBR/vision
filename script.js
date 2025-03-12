const carrosselContainer = document.querySelector('.carrossel-container');
const carrossel = document.querySelector('.carrossel');
const textoSobreVideo = document.querySelector('.texto-sobre-video');
const letreiro = document.querySelector('.letreiro-container');
const header = document.querySelector('header');
const formOrcamento = document.querySelector('#formOrcamento');
const mensagemSucessoOrcamento = document.querySelector('#mensagemSucessoOrcamento');
const mapaContainer = document.querySelector('#mapa-container');

let isDragging = false;
let startX, scrollLeft;

// Evento para iniciar o arrasto (mouse)
carrosselContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - carrosselContainer.offsetLeft;
    scrollLeft = carrosselContainer.scrollLeft;
    carrosselContainer.style.cursor = 'grabbing';
});

// Evento para iniciar o toque (mobile)
carrosselContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - carrosselContainer.offsetLeft;
    scrollLeft = carrosselContainer.scrollLeft;
});

// Movimentação com o mouse
carrosselContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carrosselContainer.offsetLeft;
    const walk = (x - startX) * 2; // Ajuste de velocidade
    carrosselContainer.scrollLeft = scrollLeft - walk;
});

// Movimentação com o toque
carrosselContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - carrosselContainer.offsetLeft;
    const walk = (x - startX) * 2; // Ajuste de velocidade
    carrosselContainer.scrollLeft = scrollLeft - walk;
});

// Parar o arrasto
const stopDragging = () => {
    isDragging = false;
    carrosselContainer.style.cursor = 'grab';
};

carrosselContainer.addEventListener('mouseup', stopDragging);
carrosselContainer.addEventListener('mouseleave', stopDragging);
carrosselContainer.addEventListener('touchend', stopDragging);

// Continua o movimento com o scroll e aplica os efeitos de desaparecimento
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const moveDistance = scrollPosition * 0.2; // Ajuste a velocidade do carrossel
    carrosselContainer.scrollLeft = moveDistance;

    // Faz o texto sobre o vídeo desaparecer conforme o header se aproxima
    let headerHeight = header.offsetHeight;
    let opacityTexto = 1 - (scrollPosition / (headerHeight * 1.5));
    if (opacityTexto < 0) opacityTexto = 0;

    textoSobreVideo.style.opacity = opacityTexto;

    // Faz o letreiro desaparecer conforme o header se aproxima
    let opacityLetreiro = 1 - (scrollPosition / (headerHeight * 2)); // Ajuste para sumir mais lentamente
    if (opacityLetreiro < 0) opacityLetreiro = 0;

    letreiro.style.opacity = opacityLetreiro;
});

// Enviar Orçamento Online
formOrcamento.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados do formulário
    const nome = document.querySelector('#nomeOrcamento').value;
    const email = document.querySelector('#emailOrcamento').value;
    const descricaoServico = document.querySelector('#descricaoServico').value;

    // Simula o envio para o servidor e exibe mensagem de sucesso
    setTimeout(() => {
        mensagemSucessoOrcamento.textContent = `Orçamento solicitado com sucesso, ${nome}! Entraremos em contato em breve.`;
        mensagemSucessoOrcamento.style.color = 'green';
    }, 1000);
});

// Função para inicializar o mapa (Google Maps)
function initMap() {
    const mapaOptions = {
        center: { lat: -23.550520, lng: -46.633308 }, // Coordenadas do mapa (São Paulo, por exemplo)
        zoom: 14,
        mapTypeId: 'roadmap'
    };

    const mapa = new google.maps.Map(mapaContainer, mapaOptions);

    // Adiciona marcador no mapa
    const marcador = new google.maps.Marker({
        position: { lat: -23.550520, lng: -46.633308 },
        map: mapa,
        title: 'Auto Mecânica ABC'
    });
}

// Inicializa o mapa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    if (mapaContainer) {
        initMap(); // Chama a função para inicializar o mapa
    }
});
