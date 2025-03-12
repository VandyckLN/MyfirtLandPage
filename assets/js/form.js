(function () {
    emailjs.init("qG4rtiymyeIJ82WJD"); // Sua public key
})();

function enviarEmail(event) {
    event.preventDefault();

    // Desabilita o botão durante o envio
    const btnSubmit = document.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Enviando...';

    const templateParams = {
        to_name: "Vandyck",
        from_name: document.getElementById('nome').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('assunto').value,
        message: document.getElementById('mensagem').value
    };

    // Adiciona logs mais detalhados
    console.group('Envio de Email');
    console.log('Parâmetros:', templateParams);

    emailjs.send("service_r3hdg0f", "template_z5lw208", templateParams)
        .then(function (response) {
            console.log('Status:', response.status);
            console.log('Texto:', response.text);

            // Mostra mensagem de sucesso na página
            const mensagem = document.createElement('div');
            mensagem.className = 'alert-success';
            mensagem.textContent = 'Email enviado com sucesso!';
            document.getElementById('formulario').appendChild(mensagem);

            // Limpa o formulário
            document.getElementById('formulario').reset();
        })
        .catch(function (error) {
            console.error('Erro:', error);

            // Mostra mensagem de erro na página
            const mensagem = document.createElement('div');
            mensagem.className = 'alert-error';
            mensagem.textContent = `Erro ao enviar: ${error.text || 'Verifique sua conexão'}`;
            document.getElementById('formulario').appendChild(mensagem);
        })
        .finally(function () {
            console.groupEnd();
            // Reabilita o botão
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Enviar';
        });
}
