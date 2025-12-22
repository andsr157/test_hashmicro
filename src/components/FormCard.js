export default {
    name: "FormCard",

    props: {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            default: "",
        },
        submitLabel: {
            type: String,
            default: "Save",
        },
        cancelLabel: {
            type: String,
            default: "Cancel",
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },

    emits: ["submit", "cancel"],

    methods: {
        handleSubmit(event) {
            event.preventDefault();
            if (!this.loading) {
                this.$emit("submit");
            }
        },

        handleCancel() {
            if (!this.loading) {
                this.$emit("cancel");
            }
        },
    },

    template: `
        <div class="card form-card">
            <div class="card-header">
                <div class="card-header-content">
                    <h2 class="card-title">{{ title }}</h2>
                    <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
                </div>
            </div>

            <form @submit="handleSubmit" class="form-card-form">
                <div class="card-body">
                    <slot></slot>
                </div>

                <div class="card-actions">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        :disabled="loading"
                        @click="handleCancel"
                    >
                        {{ cancelLabel }}
                    </button>
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="loading"
                    >
                        <span v-if="loading" class="btn-loading">
                            <span class="spinner"></span>
                            Saving...
                        </span>
                        <span v-else>{{ submitLabel }}</span>
                    </button>
                </div>
            </form>
        </div>
    `,
};
