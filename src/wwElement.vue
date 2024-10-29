<template>
    <wwElement v-bind="triggerElement" />
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        wwFrontState: { type: Object, required: true },
        wwElementState: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['trigger-event'],
    setup() {
        /* wwEditor:start */
        const { createElement } = wwLib.useCreateElement();
        /* wwEditor:end */

        const triggerElement = {
            isWwObject: true,
            uid: 'b783dc65-d528-4f74-8c14-e27c934c39b1',
        };

        return {
            /* wwEditor:start */
            createElement,
            /* wwEditor:end */
            triggerElement,
        };
    },
};
</script>

<style lang="scss" scoped></style>
