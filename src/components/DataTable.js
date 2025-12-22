export default {
    name: "DataTable",

    props: {
        items: {
            type: Array,
            required: true,
            default: () => [],
        },
        columns: {
            type: Array,
            required: true,
            default: () => [],
        },
        showRowNumber: {
            type: Boolean,
            default: true,
        },
        startIndex: {
            type: Number,
            default: 0,
        },
    },

    emits: ["edit", "delete"],

    methods: {
        getRowNumber(index) {
            return this.startIndex + index + 1;
        },
        onEdit(item) {
            this.$emit("edit", item);
        },
        onDelete(item) {
            this.$emit("delete", item);
        },
        getCellValue(item, column) {
            const value = item[column.key];
            return value ?? "-";
        },
        isStatusColumn(column) {
            return column.key === "status";
        },
        getStatusClass(status) {
            return status === true || status === "active"
                ? "active"
                : "inactive";
        },
        getStatusText(status) {
            return status === true || status === "active"
                ? "Active"
                : "Inactive";
        },
    },

    template: `
        <div class="data-table-wrapper">
            <table class="data-table" v-if="items.length > 0">
                <thead>
                    <tr>
                        <th v-if="showRowNumber" class="col-row-number">No</th>
                        <th
                            v-for="column in columns"
                            :key="column.key"
                            :class="column.class"
                        >
                            {{ column.label }}
                        </th>
                        <th class="text-right col-actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items" :key="item.id">
                        <td v-if="showRowNumber" class="col-row-number">
                            {{ getRowNumber(index) }}
                        </td>
                        <td
                            v-for="column in columns"
                            :key="column.key"
                            :class="column.class"
                        >
                            <span
                                v-if="isStatusColumn(column)"
                                class="status-badge"
                                :class="getStatusClass(item[column.key])"
                            >
                                <span class="status-dot"></span>
                                {{ getStatusText(item[column.key]) }}
                            </span>
                            <span v-else>{{ getCellValue(item, column) }}</span>
                        </td>
                        <td class="actions">
                            <button
                                class="btn btn-ghost btn-sm"
                                @click="onEdit(item)"
                                title="Edit"
                            >
                                Edit
                            </button>
                            <button
                                class="btn btn-ghost btn-sm text-error"
                                @click="onDelete(item)"
                                title="Delete"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-else class="empty-state">
                <h3>No Data</h3>
                <p>No records found. Add a new employee to get started.</p>
            </div>
        </div>
    `,
};
