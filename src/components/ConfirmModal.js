export default {
    name: "ConfirmModal",

    props: {
        show: {
            type: Boolean,
            required: true,
            default: false,
        },
        title: {
            type: String,
            default: "Confirm Action",
        },
        message: {
            type: String,
            default: "Are you sure you want to proceed?",
        },
        confirmText: {
            type: String,
            default: "Confirm",
        },
        cancelText: {
            type: String,
            default: "Cancel",
        },
        variant: {
            type: String,
            default: "danger",
            validator: (value) => ["danger", "warning", "info"].includes(value),
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },

    emits: ["confirm", "cancel"],

    computed: {
        confirmButtonClass() {
            const variantClasses = {
                danger: "btn-danger",
                warning: "btn-warning",
                info: "btn-primary",
            };
            return variantClasses[this.variant] || "btn-danger";
        },

        iconClass() {
            const icons = {
                danger: "modal-icon-danger",
                warning: "modal-icon-warning",
                info: "modal-icon-info",
            };
            return icons[this.variant] || "modal-icon-danger";
        },

        iconSymbol() {
            const symbols = {
                danger: "!",
                warning: "!",
                info: "?",
            };
            return symbols[this.variant] || "!";
        },
    },

    watch: {
        show(newVal) {
            if (newVal) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        },
    },

    methods: {
        handleConfirm() {
            if (!this.loading) {
                this.$emit("confirm");
            }
        },

        handleCancel() {
            if (!this.loading) {
                this.$emit("cancel");
            }
        },

        handleOverlayClick(event) {
            if (event.target === event.currentTarget && !this.loading) {
                this.handleCancel();
            }
        },

        handleKeydown(event) {
            if (event.key === "Escape" && this.show && !this.loading) {
                this.handleCancel();
            }
        },
    },

    mounted() {
        document.addEventListener("keydown", this.handleKeydown);
    },

    beforeUnmount() {
        document.removeEventListener("keydown", this.handleKeydown);
        document.body.style.overflow = "";
    },

    template: `
        <Teleport to="body">
            <Transition name="modal">
                <div
                    v-if="show"
                    class="modal-overlay"
                    @click="handleOverlayClick"
                    role="dialog"
                    aria-modal="true"
                    :aria-labelledby="'modal-title'"
                >
                    <div class="modal-container">
                        <div class="modal-content">
                            <div class="modal-icon" :class="iconClass">
                                <span>{{ iconSymbol }}</span>
                            </div>

                            <div class="modal-header">
                                <h3 id="modal-title" class="modal-title">{{ title }}</h3>
                            </div>

                            <div class="modal-body">
                                <p class="modal-message">{{ message }}</p>
                            </div>

                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    :disabled="loading"
                                    @click="handleCancel"
                                >
                                    {{ cancelText }}
                                </button>
                                <button
                                    type="button"
                                    class="btn"
                                    :class="confirmButtonClass"
                                    :disabled="loading"
                                    @click="handleConfirm"
                                >
                                    <span v-if="loading" class="btn-loading">
                                        <span class="spinner"></span>
                                        Loading...
                                    </span>
                                    <span v-else>{{ confirmText }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    `,
};
