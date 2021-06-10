chrome.runtime.onMessage.addListener(function (message) {
    const
        fieldset = [...document.querySelectorAll('[data-domain=expect] .form-group')],
        buttonConfirmForm = document.querySelector('.i-panel-footer .btn.btn-primary.btn-sm');

    /**
     * errors
     * 
     * Field 'COLOR' contains invalid color.
     * Field 'DATE' contains invalid date.
     * Field 'EMAIL' contains invalid email.
     * Field 'INTEGER' contains invalid number.
     * Field 'NUMBER' contains invalid number.
     * Field 'UINTEGER' contains invalid number. 
     * Field 'TIME' contains invalid time.
     * Field 'URL' contains invalid URL.
     * 
     * field types which don't support error message:
     * 'timestamp', 'uuid'
     * 
     * other types of error messages:
     * Field 'Client ID' is not filled.
     * 
     */

    /**
     * TO DO:
     * 
     * handle error cases
     * create recursia for error checking
     * required / advanced
     * somehow handle (catch) new requests (RPC)
     * improve random data (add prefix: `module name` + random field value)?
     * 
     */

    switch (message.command) {
        case 'to-fill':
            let fieldValue;

            fieldset.forEach(field => {
                if (field.querySelector('.i-mode-switch')) {
                    // type select, maybe boolean too? map?
                } else {
                    fieldValue = 'Some ' + field.querySelector('.form-control-label').textContent;

                    field.querySelector('textarea').value = fieldValue;
                    field.querySelector('.i-coder-root').textContent = fieldValue;
                }
            });

            function infiniteFillingOfFields() {
                let errorMessage;
                fieldset.forEach(field => {
                    if (field.classList.contains('i-has-error')) {
                        errorMessage = field.querySelector('.invalid-feedback').textContent;

                        if (errorMessage.includes('contains invalid color.')) {
                            fieldValue = '#000000';
                        } else if (errorMessage.includes('contains invalid date.')) {
                            fieldValue = '2021-05-04T18:38:52.412Z';
                        } else if (errorMessage.includes('contains invalid email.')) {
                            fieldValue = 'user@mail.box';
                        } else if (errorMessage.includes('contains invalid number.')) {
                            // uinteger / integer / number
                            fieldValue = 42;
                        } else if (errorMessage.includes('contains invalid time.')) {
                            const date = new Date();
                            fieldValue = `${date.getHours()}:${date.getMinutes()}`;
                        } else if (errorMessage.includes('contains invalid URL.')) {
                            fieldValue = 'https://www.integromat.com';
                        }

                        field.querySelector('textarea').value = fieldValue;
                        field.querySelector('.i-coder-root').textContent = fieldValue;
                    }
                });

                buttonConfirmForm.click();
                setTimeout(() => {
                    if (document.querySelector('.i-panel-footer .btn.btn-primary.btn-sm') && step++ !== 5) {
                        infiniteFillingOfFields();
                    }
                }, 500);
            }

            buttonConfirmForm.click();

            let step = 0;
            if (document.querySelector('.i-panel-footer .btn.btn-primary.btn-sm')) {
                infiniteFillingOfFields();
            }
            break;

        case 'to-clean':
            fieldset.forEach(field => {
                if (field.querySelector('.i-mode-switch')) {
                    // type select, maybe boolean too? map?
                } else {
                    field.querySelector('textarea').value = null;
                    field.querySelector('.i-coder-root').textContent = null;
                }
            });
            break;
    }

});
