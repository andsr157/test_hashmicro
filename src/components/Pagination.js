export default {
    name: "Pagination",

    props: {
        currentPage: {
            type: Number,
            required: true,
            default: 1,
            validator: (value) => value >= 1,
        },
        totalItems: {
            type: Number,
            required: true,
            default: 0,
            validator: (value) => value >= 0,
        },
        itemsPerPage: {
            type: Number,
            required: true,
            default: 10,
            validator: (value) => value >= 1,
        },
        pageSizeOptions: {
            type: Array,
            default: () => [5, 10, 25, 50, 100],
        },
        maxVisiblePages: {
            type: Number,
            default: 5,
            validator: (value) => value >= 3,
        },
        showPageSizeSelector: {
            type: Boolean,
            default: true,
        },
        showInfo: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    emits: ["page-change", "page-size-change"],

    computed: {
        totalPages() {
            return Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
        },
        canGoPrevious() {
            return this.currentPage > 1 && !this.disabled;
        },
        canGoNext() {
            return this.currentPage < this.totalPages && !this.disabled;
        },
        displayRange() {
            if (this.totalItems === 0) {
                return { start: 0, end: 0 };
            }
            const start = (this.currentPage - 1) * this.itemsPerPage + 1;
            const end = Math.min(
                this.currentPage * this.itemsPerPage,
                this.totalItems,
            );
            return { start, end };
        },
        visiblePages() {
            const pages = [];
            const total = this.totalPages;
            const current = this.currentPage;
            const maxVisible = this.maxVisiblePages;

            if (total <= maxVisible) {
                for (let i = 1; i <= total; i++) {
                    pages.push({ type: "page", value: i });
                }
            } else {
                pages.push({ type: "page", value: 1 });

                let startPage = Math.max(
                    2,
                    current - Math.floor((maxVisible - 2) / 2),
                );
                let endPage = Math.min(total - 1, startPage + maxVisible - 3);

                if (endPage === total - 1) {
                    startPage = Math.max(2, endPage - (maxVisible - 3));
                }

                if (startPage > 2) {
                    pages.push({ type: "ellipsis", value: "start" });
                }

                for (let i = startPage; i <= endPage; i++) {
                    pages.push({ type: "page", value: i });
                }

                if (endPage < total - 1) {
                    pages.push({ type: "ellipsis", value: "end" });
                }

                pages.push({ type: "page", value: total });
            }

            return pages;
        },
    },

    methods: {
        goToPage(page) {
            if (this.disabled) return;
            if (page < 1 || page > this.totalPages) return;
            if (page === this.currentPage) return;

            this.$emit("page-change", { page });
        },
        goToPrevious() {
            if (this.canGoPrevious) {
                this.goToPage(this.currentPage - 1);
            }
        },
        goToNext() {
            if (this.canGoNext) {
                this.goToPage(this.currentPage + 1);
            }
        },
        goToFirst() {
            this.goToPage(1);
        },
        goToLast() {
            this.goToPage(this.totalPages);
        },
        onPageSizeChange(event) {
            if (this.disabled) return;

            const newPageSize = parseInt(event.target.value, 10);
            this.$emit("page-size-change", { pageSize: newPageSize });
        },
        isCurrentPage(page) {
            return page === this.currentPage;
        },
    },

    template: `
        <div class="pagination-container" :class="{ 'pagination-disabled': disabled }">
            <div class="pagination-info" v-if="showInfo">
                <span v-if="totalItems > 0">
                    Showing {{ displayRange.start }}-{{ displayRange.end }} of {{ totalItems }}
                </span>
                <span v-else>
                    No data
                </span>
            </div>

            <nav class="pagination-nav" aria-label="Pagination">
                <button
                    type="button"
                    class="pagination-btn pagination-btn-nav"
                    :disabled="!canGoPrevious"
                    @click="goToFirst"
                    aria-label="Go to first page"
                    title="First page"
                >
                    ««
                </button>

                <button
                    type="button"
                    class="pagination-btn pagination-btn-nav"
                    :disabled="!canGoPrevious"
                    @click="goToPrevious"
                    aria-label="Go to previous page"
                    title="Previous page"
                >
                    «
                </button>

                <template v-for="item in visiblePages" :key="item.value">
                    <span
                        v-if="item.type === 'ellipsis'"
                        class="pagination-ellipsis"
                    >
                        ...
                    </span>
                    <button
                        v-else
                        type="button"
                        class="pagination-btn pagination-btn-page"
                        :class="{ 'pagination-btn-active': isCurrentPage(item.value) }"
                        :disabled="disabled"
                        :aria-current="isCurrentPage(item.value) ? 'page' : null"
                        @click="goToPage(item.value)"
                    >
                        {{ item.value }}
                    </button>
                </template>

                <button
                    type="button"
                    class="pagination-btn pagination-btn-nav"
                    :disabled="!canGoNext"
                    @click="goToNext"
                    aria-label="Go to next page"
                    title="Next page"
                >
                    »
                </button>

                <button
                    type="button"
                    class="pagination-btn pagination-btn-nav"
                    :disabled="!canGoNext"
                    @click="goToLast"
                    aria-label="Go to last page"
                    title="Last page"
                >
                    »»
                </button>
            </nav>

            <div class="pagination-size" v-if="showPageSizeSelector">
                <label class="pagination-size-label">
                    <span>Rows per page:</span>
                    <select
                        class="pagination-size-select"
                        :value="itemsPerPage"
                        :disabled="disabled"
                        @change="onPageSizeChange"
                    >
                        <option
                            v-for="size in pageSizeOptions"
                            :key="size"
                            :value="size"
                        >
                            {{ size }}
                        </option>
                    </select>
                </label>
            </div>
        </div>
    `,
};
