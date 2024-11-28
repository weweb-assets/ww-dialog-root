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
            event: { value: true },
        },
        {
            name: 'open',
            label: {
                en: 'On open',
                fr: "À l'ouverture",
            },
        },
        {
            name: 'close',
            label: {
                en: 'On close',
                fr: 'À la fermeture',
            },
        },
    ],
    actions: [
        {
            label: 'Toggle dialog',
            action: 'toggleDialog',
        },
        {
            label: 'Open dialog',
            action: 'openDialog',
        },
        {
            label: 'Close dialog',
            action: 'closeDialog',
        },
    ],
    properties: {
        type: {
            label: {
                en: 'Type',
                fr: 'Type',
            },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: 'dialog', label: { en: 'Dialog', fr: 'Dialog' } },
                    { value: 'modal', label: { en: 'Modal', fr: 'Modal' } },
                    { value: 'sheet', label: { en: 'Sheet', fr: 'Sheet' } },
                ],
            },
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: "A string matching one of the dialog types: 'dialog', 'modal' or 'sheet'.",
            },
            /* wwEditor:end */
            defaultValue: 'dialog',
        },

        sideModal: {
            label: {
                en: 'Side',
                fr: 'Positionnement',
            },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: 'left', label: { en: 'Left', fr: 'Gauche' } },
                    { value: 'middle', label: { en: 'Middle', fr: 'Milieu' } },
                    { value: 'right', label: { en: 'Right', fr: 'Droite' } },
                ],
            },
            defaultValue: 'middle',
            hidden: content => content.type !== 'modal',
            bindable: true,
        },

        sideSheet: {
            label: {
                en: 'Side',
                fr: 'Positionnement',
            },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: 'left', label: { en: 'Left', fr: 'Gauche' } },
                    { value: 'top', label: { en: 'Top', fr: 'Haut' } },
                    { value: 'right', label: { en: 'Right', fr: 'Droite' } },
                    { value: 'bottom', label: { en: 'Bottom', fr: 'Bas' } },
                ],
            },
            hidden: content => content.type !== 'sheet',
            defaultValue: 'top',
            bindable: true,
        },

        align: {
            label: {
                en: 'Align',
                fr: 'Alignement',
            },
            type: 'TextSelect',
            section: 'style',
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

        animation: {
            label: {
                en: 'Animation',
                fr: 'Animation',
            },
            section: 'style',
            type: 'TextSelect',
            options: {
                options: [
                    { value: null, label: { en: 'None', fr: 'Aucune' } },
                    { value: 'fade', label: { en: 'Fade', fr: 'Fondu' } },
                    { value: 'slide-in', label: { en: 'Slide in', fr: 'Diapositive' } },
                    { value: 'zoom', label: { en: 'Zoom', fr: 'Zoom' } },
                ],
            },
            defaultValue: null,
            bindable: true,
        },

        animationDuration: {
            label: {
                en: 'Animation duration (ms)',
                fr: "Durée de l'animation (ms)",
            },
            section: 'style',
            type: 'Number',
            defaultValue: 300,
            options: {
                min: 0,
                max: 10000,
            },
            bindable: true,
            hidden: content => content.animation === 'none',
        },

        animationEasing: {
            label: {
                en: 'Animation easing',
                fr: 'Animation easing',
            },
            section: 'style',
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'linear', label: { en: 'Linear', fr: 'Linéaire' } },
                    { value: 'ease', label: { en: 'Ease', fr: 'Acceleration' } },
                    { value: 'ease-in', label: { en: 'Ease in', fr: 'Acceleration progressive' } },
                    { value: 'ease-out', label: { en: 'Ease out', fr: 'Deceleration' } },
                    { value: 'ease-in-out', label: { en: 'Ease in out', fr: 'Acceleration et déclinaison' } },
                ],
            },
            defaultValue: 'linear',
            bindable: true,
        },

        toggleDialog: {
            type: 'Button',
            editorOnly: true,
            options: {
                text: { en: 'Toggle dialog' },
                action: 'toggleDialog',
            },
        },

        modal: {
            label: {
                en: 'Modal',
                fr: 'Modal',
            },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'If this is true, all interactions are disabled outside the dialog content.',
            },
            /* wwEditor:end */
            propertyHelp: {
                tooltip: 'If this is true, all interactions are disabled outside the dialog content.',
            },
        },

        preventScroll: {
            label: {
                en: 'Prevent Scrolling',
                fr: 'Désactiver le scroll',
            },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'If this is true, the scroll of the page is prevented',
            },
            /* wwEditor:end */
            propertyHelp: {
                tooltip: 'Whether users can scroll the page when the dialog is open.',
            },
        },

        trigger: {
            label: {
                en: 'Trigger',
                fr: 'Déclencheur',
            },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'If this is true, the trigger component is present.',
            },
            /* wwEditor:end */
            propertyHelp: {
                tooltip: 'Whether the dialog should be closed when the escape key is pressed.',
            },
        },

        overlay: {
            label: {
                en: 'Overlay',
                fr: 'Overlay',
            },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'If this is true, the overlay is shown when the content is opened',
            },
            /* wwEditor:end */
            propertyHelp: {
                tooltip: 'Whether you want to display an overlay behind your dialog.',
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
            propertyHelp: {
                tooltip: 'Whether the dialog should be closed when the escape key is pressed.',
            },
        },

        triggerElement: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: '60830952-a06b-43e7-9876-35bf1dd700b3',
                state: {
                    name: 'Dialog Trigger',
                },
            },
            navigator: {
                hidden: content => !content.trigger,
            },
        },

        contentElement: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'ww-flexbox',
                state: {
                    name: 'Dialog Content',
                },
            },
        },

        overlayElement: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'bbbc6194-64fe-46a8-86e0-101b164e07bb',
                state: {
                    name: 'Dialog Overlay',
                },
            },
            navigator: {
                hidden: content => !content.overlayElement,
            },
        },
    },
};
