export default {
    name: "Breadcrumb",

    props: {
        items: {
            type: Array,
            required: true,
            default: () => [],
            validator: (value) => {
                return value.every(
                    (item) =>
                        typeof item === "object" &&
                        typeof item.label === "string",
                );
            },
        },
    },

    emits: ["navigate"],

    methods: {
        handleClick(item, index) {
            if (index === this.items.length - 1 || !item.view) {
                return;
            }
            this.$emit("navigate", item.view);
        },

        isCurrent(index) {
            return index === this.items.length - 1;
        },

        isClickable(item, index) {
            return !this.isCurrent(index) && item.view;
        },
    },

    template: `
        <nav class="breadcrumb" aria-label="Breadcrumb">
            <ol class="breadcrumb-list">
                <li
                    v-for="(item, index) in items"
                    :key="index"
                    class="breadcrumb-item"
                    :class="{ 'breadcrumb-item-current': isCurrent(index) }"
                >
                    <span
                        v-if="index > 0"
                        class="breadcrumb-separator"
                        aria-hidden="true"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </span>

                    <a
                        v-if="isClickable(item, index)"
                        href="#"
                        class="breadcrumb-link"
                        @click.prevent="handleClick(item, index)"
                    >
                        {{ item.label }}
                    </a>

                    <span
                        v-else
                        class="breadcrumb-text"
                        :aria-current="isCurrent(index) ? 'page' : null"
                    >
                        {{ item.label }}
                    </span>
                </li>
            </ol>
        </nav>
    `,
};
