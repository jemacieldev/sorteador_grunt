document.addEventListener('DOMContentLoaded',function() {
    document.getElementById('form-sorteador').addEventListener('submit', function(){
        let numeroMaximo = document.getElementById('numero-maximo').value;
        numeroMaximo = perseInt(numeroMaximo);

        let numeroAleatorio = Math.random() * numeroMaximo;

        document.getElementById('resultado-valor').innerText = numeroAleatorio;
    })
})