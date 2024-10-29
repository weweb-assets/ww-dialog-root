<template>
    <component
        :is="tag"
        class="ww-button"
        :class="{ button: tag, '-link': hasLink && !isEditing }"
        :type="buttonType"
        :style="buttonStyle"
        :data-ww-flag="'btn-' + content.buttonType"
        :disabled="content.disabled"
        v-bind="properties"
        @focus="isReallyFocused = true"
        @blur="onBlur($event)"
    >
        <wwElement v-if="content.hasLeftIcon && content.leftIcon" v-bind="content.leftIcon"></wwElement>
        <wwText tag="span" :text="text"></wwText>
        <wwElement v-if="content.hasRightIcon && content.rightIcon" v-bind="content.rightIcon"></wwElement>
    </component>
</template>

<script>
import { computed } from 'vue';

const TEXT_ALIGN_TO_JUSTIFY = {
    center: 'center',
    right: 'flex-end',
    left: 'flex-start',
    justify: 'center',
};
export default {
    props: {
        content: { type: Object, required: true },
        wwFrontState: { type: Object, required: true },
        wwElementState: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: [
        'update:content',
        'update:content:effect',
        'change-menu-visibility',
        'change-borders-style',
        'add-state',
        'remove-state',
        'trigger-event',
    ],
    setup(props) {
        /* wwEditor:start */
        const { createElement } = wwLib.useCreateElement();
        /* wwEditor:end */
        const {
            hasLink,
            tag: linkTag,
            properties,
        } = wwLib.wwElement.useLink({
            isDisabled: computed(() => props.content.disabled),
        });
        return {
            /* wwEditor:start */
            createElement,
            /* wwEditor:end */
            hasLink,
            linkTag,
            properties,
        };
    },

    data() {
        return {
            isReallyFocused: false,
        };
    },
    computed: {
        buttonStyle() {
            return {
                justifyContent: TEXT_ALIGN_TO_JUSTIFY[this.content['_ww-text_textAlign']] || 'center',
            };
        },
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        tag() {
            if (this.isEditing) return 'div';
            if (this.hasLink) {
                return this.linkTag;
            }
            if (
                this.content.buttonType === 'submit' ||
                this.content.buttonType === 'reset' ||
                this.content.buttonType === 'button'
            )
                return 'button';
            return 'div';
        },
        buttonType() {
            if (this.isEditing || this.hasLink) return '';
            if (
                this.content.buttonType === 'submit' ||
                this.content.buttonType === 'reset' ||
                this.content.buttonType === 'button'
            )
                return this.content.buttonType;
            return '';
        },
        text() {
            return this.wwElementState.props.text;
        },
        isFocused() {
            /* wwEditor:start */
            if (this.wwEditorState.isSelected) {
                return this.wwElementState.states.includes('focus');
            }
            /* wwEditor:end */
            return this.isReallyFocused;
        },
    },
    watch: {
        /* wwEditor:start */
        'content.hasRightIcon': {
            async handler(hasRightIcon) {
                if (this.wwEditorState.isACopy) {
                    return;
                }
                if (hasRightIcon && !this.content.rightIcon) {
                    const content = await this.createElement('ww-icon');
                    this.$emit('update:content:effect', { rightIcon: content });
                }
            },
        },
        'content.hasLeftIcon': {
            async handler(hasLeftIcon) {
                if (this.wwEditorState.isACopy) {
                    return;
                }
                if (hasLeftIcon && !this.content.leftIcon) {
                    const content = await this.createElement('ww-icon');
                    this.$emit('update:content:effect', { leftIcon: content });
                }
            },
        },
        /* wwEditor:end */
        'content.disabled': {
            immediate: true,
            handler(value) {
                if (value) {
                    this.$emit('add-state', 'disabled');
                } else {
                    this.$emit('remove-state', 'disabled');
                }
            },
        },
        isReallyFocused(isFocused, wasFocused) {
            if (isFocused && !wasFocused) {
                this.$emit('trigger-event', { name: 'focus' });
            } else if (!isFocused && wasFocused) {
                this.$emit('trigger-event', { name: 'blur' });
            }
        },
        isFocused: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.$emit('add-state', 'focus');
                } else {
                    this.$emit('remove-state', 'focus');
                }
            },
        },
    },
    methods: {
        /* wwEditor:start */
        selectParentFormContainer() {
            const parentUid = wwLib.selectParentByFlag(this.$el, 'form-container');
            if (!parentUid) {
                wwLib.wwNotification.open({
                    text: {
                        en: 'No parent form container found. Please, add this submit button into a form container.',
                        fr: 'Aucun formulaire parent trouvé. Veuillez intégrer ce bouton submit dans un form container.',
                    },
                    color: 'yellow',
                    duration: 6000,
                });
            }
        },
        /* wwEditor:end */
        onBlur() {
            this.isReallyFocused = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-button {
    justify-content: center;
    align-items: center;
    &.button {
        outline: none;
        border: none;
        background: none;
        font-family: inherit;
        font-size: inherit;
    }
    &.-link {
        cursor: pointer;
    }
}
</style>
