import { watch, onUnmounted } from 'vue';

export function useScrollLock(props, isOpen, isEditing) {
    function enableScrollLock() {
        wwLib.getFrontDocument().body.style.overflow = 'hidden';
        wwLib.getFrontDocument().documentElement.style.overflow = 'hidden';
    }

    function disableScrollLock() {
        wwLib.getFrontDocument().body.style.removeProperty('overflow');
        wwLib.getFrontDocument().documentElement.style.removeProperty('overflow');
    }

    watch(
        () => isOpen.value,
        newValue => {
            if (props.content.preventScroll && !isEditing.value) {
                if (newValue) {
                    enableScrollLock();
                } else {
                    disableScrollLock();
                }
            }
        }
    );

    onUnmounted(() => {
        disableScrollLock();
    });

    return {
        enableScrollLock,
        disableScrollLock,
    };
}
