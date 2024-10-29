const INFO = {
    submit: 'sub',
    reset: 'rst',
    button: 'btn',
};

export default {
    inherit: 'ww-text',
    options: {
        autoByContent: true,
        displayAllowedValues: ['flex', 'inline-flex'],
        linkable: true,
    },
    editor: {
        label: {
            en: 'Button',
            fr: 'Bouton',
        },
        icon: 'cursor-click',
        infoTags: content => {
            if (content.buttonType && INFO[content.buttonType]) {
                return {
                    color: 'var(--ww-color-blue-500)',
                    backgroundColor: 'var(--ww-color-blue-100)',
                    text: INFO[content.buttonType].toUpperCase(),
                    action: () => {
                        wwLib.wwSearchBar.executeAction({
                            actions: wwLib.wwSearchBar.getEditSidebarActions('settings', 'custom-0'),
                        });
                    },
                };
            } else {
                return [];
            }
        },
        workflowHint: content => {
            if (content.buttonType !== 'submit') {
                return false;
            }

            return {
                type: 'warning',
                header: {
                    en: 'You probably shouldn’t trigger workflows on submit buttons.',
                    fr: 'Vous ne devriez pas déclencher un workflow depuis un bouton submit',
                },
                text: {
                    en: 'For your users to benefit from automatic form field validation, you should trigger submit workflows on the form container. Unless you are 100% sure of what you’re doing and want to bypass this behavior.',
                    fr: 'Pour que vos utilisateurs bénéficient de la validation automatique des champs de formulaire, vous devez déclencher des workflows de soumission sur le conteneur de formulaire. À moins que vous ne soyez sûr à 100 % de ce que vous faites et que vous souhaitiez contourner ce comportement.',
                },
                button: {
                    text: { en: 'Select form container', fr: 'Selectionnez le form container' },
                    action: 'selectParentFormContainer',
                },
            };
        },
    },
    states: ['focus', 'disabled'],
    triggerEvents: [
        { name: 'focus', label: { en: 'On focus' }, event: null },
        { name: 'blur', label: { en: 'On blur' }, event: null },
    ],
    properties: {
        type: {
            label: {
                en: 'Type',
                fr: 'Type',
            },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'dialog', label: 'Dialog' },
                    { value: 'modal', label: 'Modal' },
                    { value: 'sheet', label: 'Sheet' },
                ],
            },
        },

        side: {
            label: {
                en: 'Side',
                fr: 'Positionnement',
            },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'left', label: 'Left' },
                    { value: 'middle', label: 'Middle' },
                    { value: 'right', label: 'Right' },
                ],
            },
            bindable: true,
        },

        align: {
            label: {
                en: 'Align',
                fr: 'Alignement',
            },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'top', label: 'Top' },
                    { value: 'center', label: 'Center' },
                    { value: 'bottom', label: 'Bottom' },
                ],
            },
            bindable: true,
        },

        manualControl: {
            label: {
                en: 'Manual control',
                fr: 'Contrôle manuel',
            },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip:
                    'If this is true, dialog will be open based on the `Value` and also will add a trigger `On value change` triggered when the trigger is clicked or content is closed',
            },
            /* wwEditor:end */
        },

        value: {
            label: {
                en: 'Value',
                fr: 'Valeur',
            },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Whether the dialog is open or not',
            },
            /* wwEditor:end */
        },

        modal: {
            label: {
                en: 'Modal',
                fr: 'Modal',
            },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'If this is true, all interactions are disabled outside the dialog content',
            },
            /* wwEditor:end */
        },

        teleport: {
            label: {
                en: 'Teleport',
                fr: 'Téléportation',
            },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'When this is true, the dialog content will be teleported to the app body',
            },
        },

        trigger: {
            label: {
                en: 'Trigger',
                fr: 'Déclencheur',
            },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: "If this is false, the trigger won't show. Used for cases of global modals.",
            },
        },

        escClose: {
            label: {
                en: 'Escape key to close',
                fr: 'La touche échap pour fermer',
            },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'If true, ESC closes the dialog on that keypress.',
            },
            /* wwEditor:end */
        },
    },
};
