// ===============================
// CONFIGURACIÓN DEEP SEARCH
// ===============================

const emailJsConfig = {

    service_id: 'service_wkag145',

    template_id: 'template_a6qb2tb',

    public_key: 'WHqOPUlHcTTxGIlHt'

};


// ===============================
// INICIALIZAR EMAILJS
// ===============================

(function(){

    emailjs.init(emailJsConfig.public_key);

})();


// ===============================
// SUSCRIPCIÓN
// ===============================

function suscribirse(event){

    event.preventDefault();

    const email = document.getElementById("email").value;

    const parametros = {

        email: email

    };

    emailjs.send(

        emailJsConfig.service_id,

        emailJsConfig.template_id,

        parametros

    )

    .then(function(){

        window.location.href = "gracias.html";

    })

    .catch(function(error){

        alert("Error al enviar. Intenta otra vez.");

        console.log(error);

    });

}
