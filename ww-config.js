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

        sideModal: {
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
            hidden: content => content.type !== 'modal',
            bindable: true,
        },

        sideSheet: {
            label: {
                en: 'Side',
                fr: 'Positionnement',
            },
            type: 'TextSelect',
            section: 'settings',
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

        animation: {
            label: {
                en: 'Animation',
                fr: 'Animation',
            },
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
            type: 'Number',
            defaultValue: 300,
            bindable: true,
            hidden: content => content.animation === 'none',
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
                tooltip: 'If this is true, all interactions are disabled outside the dialog content',
            },
            /* wwEditor:end */
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

        triggerElement: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: '9dad7260-4e2f-4b19-bdbc-cda74b805b98',
                state: {
                    name: 'Dialog Trigger',
                },
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
            section: 'content',
        },

        overlayElement: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'b3fe1f27-7070-4b83-ac56-624337274de3',
                state: {
                    name: 'Dialog Overlay',
                },
            },
        },
    },
};
