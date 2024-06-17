document.addEventListener('DOMContentLoaded', function() {
    const selectImage = document.getElementById('imagem');
    const image = document.getElementById('bandido-imagem');

    selectImage.addEventListener('change', function() {
        const selectedValue = selectImage.value;

        switch (selectedValue) {
            case 'bambu.png':
                image.src = '/public/img/bandits/bambu.png';
                image.alt = 'Bambu';
                break;

            case 'doca.png':
                image.src = '/public/img/bandits/doca.png';
                image.alt = 'Doca';
                break;
        
            case 'jiló.png':
                image.src = '/public/img/bandits/jiló.png';
                image.alt = 'Jiló';
                break;
            
            case 'johnbravo.png':
                image.src = '/public/img/bandits/johnbravo.png';
                image.alt = 'John Bravo';
                break;
            
            case 'léoempada.png':
                image.src = '/public/img/bandits/léoempada.png';
                image.alt = 'Léo Empada';
                break;
            
            case 'limão.png':
                image.src = '/public/img/bandits/limão.png';
                image.alt = 'Limão';
                break;

            case 'macumba.png':
                image.src = '/public/img/bandits/macumba.png';
                image.alt = 'Macumba';
                break;

            case 'menorcheru.png':
                image.src = '/public/img/bandits/menorcheru.png';
                image.alt = 'Menor Cheru';
                break;

            case 'paulinho.png':
                image.src = '/public/img/bandits/paulinho.png';
                image.alt = 'Paulinho';
                break;

            case 'pitbull.png':
                image.src = '/public/img/bandits/pitbul.png';
                image.alt = 'Pitbul';
                break;

            default:
                image.src = '/public/img/bandits/bambu.png';
                image.alt = 'Bambu';
                break;
        }
    });
});