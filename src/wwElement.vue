<template>
    <div
        :style="{
            '--transition-duration': animationDurationValue + 'ms',
            '--transition-easing': animationEasing,
        }"
        role="dialog"
        class="ww-dialog"
        @keydown.esc="onEscapeKeyDown()"
    >
        <wwElement v-if="trigger" v-bind="content.triggerElement" role="dialog" />
        <Transition mode="out-in" :name="transitionName">
            <div
                v-if="value"
                :style="{
                    'z-index': 1000,
                }"
            >
                <wwElement
                    v-bind="content.contentElement"
                    role="dialog"
                    class="ww-dialog-transition-root"
                    :style="contentStyle"
                />
            </div>
        </Transition>

        <div v-if="value && modal && !isEditing" class="pointer-capture" @click.stop="null"></div>

        <Transition mode="out-in" :name="transitionName">
            <div v-if="value && overlay">
                <wwElement
                    ref="overlayElement"
                    v-bind="content.overlayElement"
                    class="ww-dialog-transition-root"
                    :class="{ 'pointer-events-none': !modal }"
                    role="dialog"
                />
            </div>
        </Transition>
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
        const animationEasing = toRef(() => props.content.animationEasing);
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
                    if (preventScroll.value && !isEditing.value) {
                        wwLib.getFrontDocument().body.style.overflow = 'hidden';
                        wwLib.getFrontDocument().documentElement.style.overflow = 'hidden';
                    }
                } else {
                    emit('trigger-event', {
                        name: 'close',
                        event: {
                            value: newValue,
                        },
                    });
                    wwLib.getFrontDocument().body.style.overflow = 'auto';
                    wwLib.getFrontDocument().documentElement.style.overflow = 'auto';
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
            () => value.value,
            v => {
                if (preventScroll.value && !isEditing.value) {
                    if (v) {
                        console.log('debug2');
                        wwLib.getFrontDocument().body.style.overflow = 'hidden';
                        wwLib.getFrontDocument().documentElement.style.overflow = 'hidden';
                    } else {
                        wwLib.getFrontDocument().body.style.overflow = 'auto';
                        wwLib.getFrontDocument().documentElement.style.overflow = 'auto';
                    }
                }
            }
        );

        const isEditing = computed(() => {
            /* wwEditor:start */
            return props.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
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
                    label: 'Toggle dialog state',
                    description: 'Toggle the dialog state.',
                },
            },
            openDialog: {
                method: openDialog,
                editor: {
                    label: 'Open dialog',
                    description: 'Open the dialog.',
                },
            },
            closeDialog: {
                method: closeDialog,
                editor: {
                    label: 'Close dialog',
                    description: 'Close the dialog.',
                },
            },
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
                style['--translate-x'] = '-50%';
            }

            if (align === 'top') {
                style.top = 0;
            } else if (align === 'bottom') {
                style.bottom = 0;
            } else {
                style.top = '50%';
                if (style.transform) {
                    style['--translate-y'] = '-50%';
                } else {
                    style['--translate-y'] = '-50%';
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
            modal,
            isEditing,
            onEscapeKeyDown,
            animationEasing,
        };
    },
};
</script>

<style lang="scss" scoped>
:deep(.pointer-events-none) {
    pointer-events: none;
}

:deep(.ww-dialog-transition-root) {
    --translate-x: 0px;
    --translate-y: 0px;
    --translate-x-offset: 0px;
    --translate-y-offset: 0px;
    --scale: 1;
    --calc-translate-x: calc(var(--translate-x) + var(--translate-x-offset));
    --calc-translate-y: calc(var(--translate-y) + var(--translate-y-offset));
    transition: transform var(--transition-duration) var(--transition-easing),
        opacity var(--transition-duration) var(--transition-easing) !important;
    transform: translateX(var(--calc-translate-x)) translateY(var(--calc-translate-y)) scaleX(var(--scale))
        scaleY(var(--scale)) !important;
}

/* Fade Animation */
.fade-transition-enter-from > :deep(.ww-dialog-transition-root),
.fade-transition-leave-to > :deep(.ww-dialog-transition-root) {
    opacity: 0;
}
/* Slide-in Animation */
.slide-in-transition-enter-from > :deep(.ww-dialog-transition-root) {
    --translate-x-offset: -20px;
    opacity: 0;
}
.slide-in-transition-enter-to > :deep(.ww-dialog-transition-root) {
    --translate-x-offset: 0;
    opacity: 1;
}
.slide-in-transition-leave-from > :deep(.ww-dialog-transition-root) {
    --translate-x-offset: 0;
    opacity: 1;
}
.slide-in-transition-leave-to > :deep(.ww-dialog-transition-root) {
    --translate-x-offset: -20px;
    opacity: 0;
}
/* Zoom Animation */
.zoom-transition-enter-from > :deep(.ww-dialog-transition-root),
.zoom-transition-leave-to > :deep(.ww-dialog-transition-root) {
    --scale: 0;
}
.zoom-transition-enter-to > :deep(.ww-dialog-transition-root),
.zoom-transition-leave-from > :deep(.ww-dialog-transition-root) {
    --scale: 1;
}

.pointer-capture {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: auto;
}
</style>
