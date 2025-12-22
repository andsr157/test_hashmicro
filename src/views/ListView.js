import DataTable from "../components/DataTable.js";
import Pagination from "../components/Pagination.js";
import ConfirmModal from "../components/ConfirmModal.js";

export default {
    name: "ListView",

    components: {
        DataTable,
        Pagination,
        ConfirmModal,
    },

    props: {
        items: {
            type: Array,
            required: true,
            default: () => [],
        },
    },

    emits: ["go-to-create", "go-to-edit", "delete-item"],

    data() {
        return {
            searchQuery: "",
            currentPage: 1,
            itemsPerPage: 10,
            columns: [
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "department", label: "Department" },
                { key: "position", label: "Position" },
                { key: "status", label: "Status" },
            ],
            // Modal state
            showDeleteModal: false,
            itemToDelete: null,
        };
    },

    computed: {
        filteredItems() {
            if (!this.searchQuery.trim()) {
                return this.items;
            }
            const query = this.searchQuery.toLowerCase();
            return this.items.filter(
                (item) =>
                    item.name?.toLowerCase().includes(query) ||
                    item.email?.toLowerCase().includes(query) ||
                    item.department?.toLowerCase().includes(query) ||
                    item.position?.toLowerCase().includes(query),
            );
        },

        totalPages() {
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        },

        paginatedItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredItems.slice(start, end);
        },

        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },

        deleteModalMessage() {
            if (!this.itemToDelete) return "";
            return `Are you sure you want to delete "${this.itemToDelete.name}"? This action cannot be undone.`;
        },
    },

    watch: {
        searchQuery() {
            this.currentPage = 1;
        },

        items() {
            if (this.currentPage > this.totalPages && this.totalPages > 0) {
                this.currentPage = this.totalPages;
            }
        },
    },

    methods: {
        handleCreate() {
            this.$emit("go-to-create");
        },

        handleEdit(item) {
            this.$emit("go-to-edit", item);
        },

        handleDeleteClick(item) {
            this.itemToDelete = item;
            this.showDeleteModal = true;
        },

        confirmDelete() {
            // CRUD disabled - just close modal and refresh page
            this.closeDeleteModal();
            window.location.reload();
        },

        closeDeleteModal() {
            this.showDeleteModal = false;
            this.itemToDelete = null;
        },

        clearSearch() {
            this.searchQuery = "";
        },

        onPageChange({ page }) {
            this.currentPage = page;
        },

        onPageSizeChange({ pageSize }) {
            this.itemsPerPage = pageSize;
            this.currentPage = 1;
        },
    },

    template: `
        <div class="list-view">
            <div class="page-header">
                <div class="page-header-content">
                    <h1>Master Data Employee</h1>
                    <p>Manage your employee records</p>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Employee List</h2>
                    <div class="search-box">
                        <input
                            type="text"
                            v-model="searchQuery"
                            class="search-input"
                            placeholder="Search..."
                        />
                        <button
                            v-if="searchQuery"
                            class="search-clear"
                            @click="clearSearch"
                        >
                            x
                        </button>
                    </div>
                </div>

                <div v-if="searchQuery" class="results-info">
                    Showing {{ filteredItems.length }} of {{ items.length }} results
                </div>

                <div class="card-body">
                    <data-table
                        :items="paginatedItems"
                        :columns="columns"
                        :show-row-number="true"
                        :start-index="startIndex"
                        @edit="handleEdit"
                        @delete="handleDeleteClick"
                    ></data-table>

                    <pagination
                        v-if="filteredItems.length > 0"
                        :current-page="currentPage"
                        :total-items="filteredItems.length"
                        :items-per-page="itemsPerPage"
                        :page-size-options="[5, 10, 25, 50]"
                        :show-info="true"
                        :show-page-size-selector="true"
                        @page-change="onPageChange"
                        @page-size-change="onPageSizeChange"
                    ></pagination>
                </div>
            </div>

            <confirm-modal
                :show="showDeleteModal"
                title="Delete Employee"
                :message="deleteModalMessage"
                confirm-text="Delete"
                cancel-text="Cancel"
                variant="danger"
                @confirm="confirmDelete"
                @cancel="closeDeleteModal"
            ></confirm-modal>
        </div>
    `,
};
