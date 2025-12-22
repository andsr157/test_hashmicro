import NavbarComponent from "./components/Navbar.js";
import Breadcrumb from "./components/Breadcrumb.js";
import DataTable from "./components/DataTable.js";
import FormCard from "./components/FormCard.js";
import DashboardView from "./views/DashboardView.js";
import ListView from "./views/ListView.js";
import CreateView from "./views/CreateView.js";
import EditView from "./views/EditView.js";
import { DUMMY_DATA } from "./constants/dummy.js";

const { createApp } = Vue;

const app = createApp({
    name: "HashMicroApp",

    components: {
        "navbar-component": NavbarComponent,
        breadcrumb: Breadcrumb,
        "data-table": DataTable,
        "form-card": FormCard,
        "dashboard-view": DashboardView,
        "list-view": ListView,
        "create-view": CreateView,
        "edit-view": EditView,
    },

    data() {
        return {
            currentView: "dashboard",
            items: [...DUMMY_DATA],
            selectedItem: null,
        };
    },

    computed: {
        currentPageTitle() {
            const titles = {
                dashboard: "Dashboard",
                employees: "Master Data Employee",
                list: "Master Data Employee",
                create: "Add Employee",
                edit: "Edit Employee",
            };
            return titles[this.currentView] || "Dashboard";
        },

        breadcrumbItems() {
            const home = { label: "Home", view: "dashboard" };

            switch (this.currentView) {
                case "dashboard":
                    return [{ label: "Home", view: null }];

                case "employees":
                case "list":
                    return [
                        home,
                        { label: "Master Data Employee", view: null },
                    ];

                case "create":
                    return [
                        home,
                        { label: "Master Data Employee", view: "employees" },
                        { label: "Add Employee", view: null },
                    ];

                case "edit":
                    return [
                        home,
                        { label: "Master Data Employee", view: "employees" },
                        { label: "Edit Employee", view: null },
                    ];

                default:
                    return [home];
            }
        },
    },

    methods: {
        toggleSidebar() {
            if (this.$refs.navbar) {
                this.$refs.navbar.toggleSidebar();
            }
        },

        handleNavigation(viewId) {
            this.currentView = viewId;
            this.selectedItem = null;
        },

        goToDashboard() {
            this.currentView = "dashboard";
            this.selectedItem = null;
        },

        goToEmployees() {
            this.currentView = "employees";
            this.selectedItem = null;
        },

        goToList() {
            this.goToEmployees();
        },

        goToCreate() {
            this.currentView = "create";
            this.selectedItem = null;
        },

        goToEdit(item) {
            this.selectedItem = { ...item };
            this.currentView = "edit";
        },

        handleCreate(newItem) {
            this.goToEmployees();
        },

        handleUpdate(updatedItem) {
            this.goToEmployees();
        },

        handleDelete(item) {
            return;
        },
    },

    mounted() {
        console.log("Application Loaded");
    },
});

app.mount("#app");

export default app;
