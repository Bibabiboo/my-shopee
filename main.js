// Xử lí event dom
function handleEvent() {
    // MODAL REGISTRER
    function register() {
        const register = document.querySelector('.js-register');
        const modalRegister = document.querySelector('.js-modal__register');
        const overlayRegister = document.querySelector('.js-modal__overlay--register');
        const btnBackRegister = document.querySelector('.js-btn--back_register');
        // add and remove class modal-open trong modal-register 
        register.addEventListener('click', function() {
            modalRegister.classList.add('modal-open');
        });
    
        overlayRegister.addEventListener('click', function() {
            modalRegister.classList.remove('modal-open');
        });
    
        btnBackRegister.addEventListener('click', function() {
            modalRegister.classList.remove('modal-open');
        });
    };
    register();

    // SWITCH MODAL
    function switchModal() {
        const switchLogin = document.querySelector('.js-switch-login');
        const switchRegister = document.querySelector('.js-switch-register');
        const modalRegister = document.querySelector('.js-modal__register');
        const modalLogin = document.querySelector('.js-modal__login');
        // From register to login
        switchLogin.addEventListener('click', function() {
            modalRegister.classList.remove('modal-open');
            modalLogin.classList.add('modal-open');
        });
        // From login to register
        switchRegister.addEventListener('click', function() {
            modalLogin.classList.remove('modal-open');
            modalRegister.classList.add('modal-open');
        });
    };
    switchModal();

    // MODAL LOGIN
    function login() {
        const login = document.querySelector('.js-login');
        const modalLogin = document.querySelector('.js-modal__login');
        const overlayLogin = document.querySelector('.js-modal__overlay--login');
        const btnBackLogin = document.querySelector('.js-btn--back_login');
        
        // add and remove class modal-open trong modal-login 
        login.addEventListener('click', function() {
            modalLogin.classList.add('modal-open');
        });

        overlayLogin.addEventListener('click', function() {
            modalLogin.classList.remove('modal-open');
        });

        btnBackLogin.addEventListener('click', function() {
            modalLogin.classList.remove('modal-open');
        });
    };
    login();
};

function Eventstart() {
    handleEvent();
};

Eventstart();

