import { watch, onUnmounted } from 'vue';

export function useDialogInteractions(props, emit, isOpen, closeDialog, toggleDialog, isEditing) {
    // Escape key handling
    function addEscapeListener() {
        wwLib.getFrontDocument().addEventListener('keydown', handleEscapeKey);
    }

    function removeEscapeListener() {
        wwLib.getFrontDocument().removeEventListener('keydown', handleEscapeKey);
    }

    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
            onEscapeKeyDown();
        }
    }

    function onEscapeKeyDown() {
        if (isEditing.value || !props.content.escClose) {
            return;
        }
        closeDialog();
    }

    // Click handlers
    function handleOverlayClick() {
        if (props.content.overlayClickCloses && !isEditing.value) {
            closeDialog();
        }
    }

    function handleOutsideClick() {
        if (props.content.clickOutsideCloses && !isEditing.value) {
            closeDialog();
        }
    }

    function onTriggerClick() {
        if (!props.content.triggerClickOpens || isEditing.value) {
            return;
        }

        toggleDialog();
    }

    // Setup watchers and cleanup
    watch(
        () => isOpen.value,
        newValue => {
            if (newValue) {
                addEscapeListener();
            } else {
                removeEscapeListener();
            }
        }
    );

    onUnmounted(() => {
        removeEscapeListener();
    });

    return {
        onEscapeKeyDown,
        handleOverlayClick,
        handleOutsideClick,
        onTriggerClick,
    };
}
