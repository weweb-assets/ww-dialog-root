import { ref } from 'vue';

export function useDialogState(props, emit) {
    const { value: isOpen, setValue: setIsOpen } = wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: 'open',
        type: 'boolean',
        defaultValue: false,
        componentType: 'element',
    });

    emit('trigger-event', {
        name: 'change',
        event: { value: false },
    });

    const setDialogState = newValue => {
        if (!props.content.manualMode) {
            setIsOpen(newValue);
        } else {
            setIsOpen(props.content.value);
        }

        const eventName = newValue ? 'open' : 'close';
        emit('trigger-event', {
            name: eventName,
            event: {
                open: newValue,
            },
        });

        emit('trigger-event', {
            name: 'change',
            event: {
                open: newValue,
            },
        });
    };

    function toggleDialog() {
        setDialogState(!isOpen.value);
    }

    function openDialog() {
        setDialogState(true);
    }

    function closeDialog() {
        setDialogState(false);
    }

    function registerDialogContext() {
        wwLib.wwElement.useRegisterElementLocalContext('dialog', ref({ isOpen }), {
            toggleDialog: {
                method: toggleDialog,
                editor: {
                    label: 'Toggle',
                    description: 'Toggle the dialog state.',
                },
            },
            openDialog: {
                method: openDialog,
                editor: {
                    label: 'Open',
                    description: 'Open the dialog.',
                },
            },
            closeDialog: {
                method: closeDialog,
                editor: {
                    label: 'Close',
                    description: 'Close the dialog.',
                },
            },
        });
    }

    return {
        isOpen,
        toggleDialog,
        openDialog,
        closeDialog,
        registerDialogContext,
    };
}
