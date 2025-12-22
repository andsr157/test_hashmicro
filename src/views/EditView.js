import FormCard from "../components/FormCard.js";

export default {
    name: "EditView",

    components: {
        FormCard,
    },

    props: {
        item: {
            type: Object,
            required: true,
            default: () => ({}),
        },
    },

    emits: ["save", "cancel"],

    data() {
        return {
            formData: {
                id: null,
                name: "",
                email: "",
                department: "",
                position: "",
                status: "active",
                notes: "",
            },
        };
    },

    created() {
        if (this.item) {
            this.formData = {
                ...this.item,
                status: this.item.status === true ? "active" : "inactive",
            };
        }
    },

    watch: {
        item: {
            handler(newItem) {
                if (newItem) {
                    this.formData = {
                        ...newItem,
                        status: newItem.status === true ? "active" : "inactive",
                    };
                }
            },
            deep: true,
            immediate: true,
        },
    },

    methods: {
        handleSave() {
            this.$emit("save", this.formData);
        },

        handleCancel() {
            this.$emit("cancel");
        },
    },

    template: `
        <div class="form-view">
            <div class="page-header">
                <div class="page-header-content">
                    <h1>Edit Employee</h1>
                    <p>Update the employee information below</p>
                </div>
            </div>

            <form-card
                title="Employee Information"
                submit-label="Update"
                @submit="handleSave"
                @cancel="handleCancel"
            >
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">
                            Full Name <span class="required">*</span>
                        </label>
                        <input
                            v-model="formData.name"
                            type="text"
                            class="form-input"
                            placeholder="Enter full name"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            Email <span class="required">*</span>
                        </label>
                        <input
                            v-model="formData.email"
                            type="email"
                            class="form-input"
                            placeholder="Enter email address"
                            required
                        />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Department</label>
                        <select v-model="formData.department" class="form-input">
                            <option value="">Select Department</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="Finance">Finance</option>
                            <option value="Operations">Operations</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Position</label>
                        <input
                            v-model="formData.position"
                            type="text"
                            class="form-input"
                            placeholder="Enter position"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Status</label>
                    <select v-model="formData.status" class="form-input">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Notes</label>
                    <textarea
                        v-model="formData.notes"
                        class="form-input form-textarea"
                        placeholder="Additional notes (optional)"
                        rows="3"
                    ></textarea>
                </div>
            </form-card>
        </div>
    `,
};

const styles = `
    .required {
        color: var(--color-cta);
    }
`;

const styleElement = document.createElement("style");
styleElement.textContent = styles;
document.head.appendChild(styleElement);
