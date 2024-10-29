// Thư viện form đăng kí 
function validator(formSelector) {
    // Lấy thẻ cha của input
    function getParent(element, selector) {
        while(element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement
            }   
            element = element.parentElement;
        }
    }

    var _this = this;

    var validatorRules = {
        required: function(value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email: function(value) {
            var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            return regex.test(value) ? undefined : 'Vui lòng nhập lại email';
        },
        min: function(min) {
            return function(value) {
                return value.length >= min ? undefined : `Vui lòng nhập tối thiếu ${min} kí tự`;
            }
        },
    }

    var formRules = {};
    var formELement = document.querySelector(formSelector);

    if(formELement) {

        var inputs = document.querySelectorAll('[name][rules]');
        for(var input of inputs) {
            
            var rules = input.getAttribute('rules').split('|');

            for(var rule of rules) {

                var ruleInfo;
                var ruleHasValue = rule.includes(':')
                if(ruleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }


                var ruleFunc = validatorRules[rule];
                if(ruleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }
                if(Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                }

                else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            // Xử lí event
            input.onblur = handleValidate;
            input.oninput = handleClear;
            
        }

        // Xử lí event blur
        function handleValidate(event) {
            var rules = formRules[event.target.name]
            var errorMessage;
            rules.some(function(rule) {
                errorMessage = rule(event.target.value)
                return errorMessage;
            })
           

            if(errorMessage) {
            var formGroup = getParent(event.target, '.auth-form__group');
                if(formGroup) {
                    var formMessage = formGroup.querySelector('.form-message');
                    if(errorMessage) {
                        formGroup.classList.add('invalid');
                        formMessage.innerText = errorMessage;
                    }
                }
                return !errorMessage;

            }

        }

        // Xử lí event input
        function handleClear(event) {
            var formGroup = getParent(event.target, '.auth-form__group');
            if(formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid');
                
                var formMessage = formGroup.querySelector('.form-message');
                if(formMessage) {
                    formMessage.innerText = '';
                }
            }
        }

        // Xử lí sumbit form
        formELement.onsubmit = function(event) {
            event.preventDefault();
            

            var inputs = document.querySelectorAll('[name][rules]');
            var isValid = true;

            for(var input of inputs) {
                if(!handleValidate({ target: input })) {
                    isValid = false;
                }
            }

            // Xử lí submit form khi không có lỗi
            if(isValid) {
                if(typeof _this.onSubmit === 'function') {
                    var enableElement = formElement.querySelectorAll('[name]:not([disable])');

                    var formValues = Array.from(enableElement).reduce((values, input) => {
                        values[input.name] = input.value;    


                        return values;
                    }, {});
                    
                    _this.onSubmit(formValues);

                }
                else {
                    formELement.submit();
                }

            }
        }
        // console.log(formRules)
    }
}

function start() {
    var registerForm = new validator('#form-register');
    registerForm.onSubmit = function(data) {
        console.log(data);
    };

    var loginForm = new validator('#form-login');
    loginForm.onSubmit = function(data) {
        console.log(data);
    };

};

start();