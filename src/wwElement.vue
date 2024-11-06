<template>
    <div
        :style="{
            '--transition-duration': animationDurationValue + 'ms',
        }"
        role="dialog"
        class="ww-dialog"
        @keydown.esc="onEscapeKeyDown()"
    >
        <wwElement v-show="trigger" v-bind="content.triggerElement" role="dialog" />
        <Transition :name="transitionName">
            <wwElement
                v-bind="content.contentElement"
                :style="{
                    ...contentStyle,
                    display: value ? 'flex' : 'none',
                }"
                role="dialog"
            />
        </Transition>
        <wwElement
            v-bind="content.overlayElement"
            :style="{
                display: value && overlay ? 'flex' : 'none',
            }"
            role="dialog"
        />
    </div>
</template>

<script>
import { computed, provide, ref, toRef, watch } from 'vue';

export default {
    props: {
        content: { type: Object, required: true },
        uid: { type: String, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['trigger-event'],
    setup(props, { emit }) {
        const type = toRef(() => props.content.type);
        const sideModal = toRef(() => props.content.sideModal);
        const sideSheet = toRef(() => props.content.sideSheet);
        const align = toRef(() => props.content.align);
        const animation = toRef(() => props.content.animation);
        const animationDuration = toRef(() => props.content.animationDuration);
        const modal = toRef(() => props.content.modal);
        const preventScroll = toRef(() => props.content.preventScroll);
        const trigger = toRef(() => props.content.trigger);
        const overlay = toRef(() => props.content.overlay);
        const escClose = toRef(() => props.content.escClose);

        const { value: componentValue, setValue: setComponentValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            type: 'boolean',
            defaultValue: false,
            componentType: 'element',
        });

        const value = computed({
            get() {
                return componentValue.value;
            },
            set(newValue) {
                setComponentValue(newValue);

                if (newValue) {
                    emit('trigger-event', {
                        name: 'open',
                        event: {
                            value: newValue,
                        },
                    });
                } else {
                    emit('trigger-event', {
                        name: 'close',
                        event: {
                            value: newValue,
                        },
                    });
                }
                emit('trigger-event', {
                    name: 'change',
                    event: {
                        value: newValue,
                    },
                });
            },
        });

        watch(
            () => props.content.value,
            v => {
                value.value = v;
            }
        );

        wwLib.wwElement.useRegisterElementLocalContext('dialog', ref({ value }), {
            toggleDialog: {
                method: toggleDialog,
                editor: {
                    label: 'Dialog - Toggle dialog state',
                    description: 'Toggle the dialog state.',
                },
            },
            openDialog: {
                method: openDialog,
                editor: {
                    label: 'Dialog - Open dialog',
                    description: 'Open the dialog.',
                },
            },
            closeDialog: {
                method: closeDialog,
                editor: {
                    label: 'Dialog - Close dialog',
                    description: 'Close the dialog.',
                },
            },
        });

        const isEditing = computed(() => {
            /* wwEditor:start */
            return props.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        });

        function toggleDialog() {
            value.value = !value.value;
        }
        function openDialog() {
            value.value = true;
        }
        function closeDialog() {
            value.value = false;
        }

        const contentStyle = computed(() => {
            let style = {};
            switch (type.value) {
                case 'modal':
                    style = getModalStyle(sideModal.value, align.value);
                    break;
                case 'sheet':
                    style = getSheetStyle(sideSheet.value);
                    break;
            }
            if (preventScroll.value) {
                style.overflow = 'hidden';
            }
            return style;
        });

        function getModalStyle(side, align) {
            const style = {
                position: 'fixed',
            };

            if (side === 'left') {
                style.left = 0;
            } else if (side === 'right') {
                style.right = 0;
            } else {
                // Center horizontally
                style.left = '50%';
                style.transform = 'translateX(-50%)';
            }

            if (align === 'top') {
                style.top = 0;
            } else if (align === 'bottom') {
                style.bottom = 0;
            } else {
                style.top = '50%';
                if (style.transform) {
                    style.transform += ' translateY(-50%)';
                } else {
                    style.transform = 'translateY(-50%)';
                }
            }

            return style;
        }

        function getSheetStyle(side) {
            const style = {
                position: 'fixed',
            };

            switch (side) {
                case 'left':
                    Object.assign(style, {
                        height: '100dvh',
                        top: 0,
                        bottom: 0,
                        left: 0,
                    });
                    break;
                case 'right':
                    Object.assign(style, {
                        height: '100dvh',
                        top: 0,
                        bottom: 0,
                        right: 0,
                    });
                    break;
                case 'top':
                    Object.assign(style, {
                        width: '100dvw',
                        top: 0,
                        left: 0,
                        right: 0,
                    });
                    break;
                case 'bottom':
                    Object.assign(style, {
                        width: '100dvw',
                        bottom: 0,
                        left: 0,
                        right: 0,
                    });
                    break;
            }

            return style;
        }

        const transitionName = computed(() => {
            switch (animation.value) {
                case 'fade':
                    return 'fade-transition';
                case 'slide-in':
                    return 'slide-in-transition';
                case 'zoom':
                    return 'zoom-transition';
                default:
                    return '';
            }
        });

        const animationDurationValue = computed(() => {
            return Number(animationDuration.value) || 300;
        });

        function onEscapeKeyDown() {
            if (isEditing.value || !escClose.value) {
                return;
            }

            closeDialog();
        }

        provide('weweb-assets/ww-dialog-root', {
            openDialog,
            closeDialog,
            toggleDialog,
            value,
            animation,
            animationDuration,
            isEditing,
        });

        return {
            toggleDialog,
            openDialog,
            closeDialog,
            contentStyle,
            escClose,
            trigger,
            value,
            transitionName,
            animationDurationValue,
            overlay,
            isEditing,
            onEscapeKeyDown,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-dialog {
    pointer-events: auto;
}

/* Fade Animation */
.fade-transition-enter-active,
.fade-transition-leave-active {
    transition: opacity var(--transition-duration);
}
.fade-transition-enter-from,
.fade-transition-leave-to {
    opacity: 0;
}
.fade-transition-enter-to,
.fade-transition-leave-from {
    opacity: 1;
}

/* Slide-in Animation */
.slide-in-transition-enter-active,
.slide-in-transition-leave-active {
    transition: transform var(--transition-duration);
}
.slide-in-transition-enter-from {
    transform: translateX(100%);
}
.slide-in-transition-enter-to {
    transform: translateX(0);
}
.slide-in-transition-leave-from {
    transform: translateX(0);
}
.slide-in-transition-leave-to {
    transform: translateX(100%);
}

/* Zoom Animation */
.zoom-transition-enter-active,
.zoom-transition-leave-active {
    transition: transform var(--transition-duration);
}
.zoom-transition-enter-from,
.zoom-transition-leave-to {
    transform: scale(0);
}
.zoom-transition-enter-to,
.zoom-transition-leave-from {
    transform: scale(1);
}
</style>
