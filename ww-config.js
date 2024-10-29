export default {
    inherit: 'ww-text',
    options: {
        autoByContent: true,
        displayAllowedValues: ['flex', 'inline-flex'],
        linkable: true,
    },
    editor: {
        label: {
            en: 'Dialog',
            fr: 'Dialog',
        },
        icon: 'cursor-click',
        infoTags: () => {
            return [];
        },
        workflowHint: () => {
            return false;
        },
    },
    states: ['focus', 'disabled'],
    triggerEvents: [
        {
            name: 'change',
            label: {
                en: 'On value change',
                fr: 'Changement de valeur',
            },
            event: null,
        },
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
                    { value: 'dialog', label: { en: 'Dialog', fr: 'Dialog' } },
                    { value: 'modal', label: { en: 'Modal', fr: 'Modal' } },
                    { value: 'sheet', label: { en: 'Sheet', fr: 'Sheet' } },
                ],
            },
            defaultValue: 'dialog',
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
                    { value: 'left', label: { en: 'Left', fr: 'Gauche' } },
                    { value: 'middle', label: { en: 'Middle', fr: 'Milieu' } },
                    { value: 'right', label: { en: 'Right', fr: 'Droite' } },
                ],
            },
            defaultValue: 'middle',
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
                    { value: 'top', label: { en: 'Top', fr: 'Haut' } },
                    { value: 'center', label: { en: 'Center', fr: 'Centre' } },
                    { value: 'bottom', label: { en: 'Bottom', fr: 'Bas' } },
                ],
            },
            defaultValue: 'center',
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
