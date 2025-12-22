export default {
    name: "NavbarComponent",

    props: {
        currentView: {
            type: String,
            required: true,
            default: "dashboard",
        },
    },

    emits: ["navigate"],

    data() {
        return {
            isOpen: false,
            navItems: [
                { id: "dashboard", label: "Dashboard" },
                { id: "employees", label: "Master Data Employee" },
            ],
        };
    },

    methods: {
        navigate(viewId) {
            this.$emit("navigate", viewId);
            this.isOpen = false;
        },

        toggleSidebar() {
            this.isOpen = !this.isOpen;
        },

        isActive(viewId) {
            if (viewId === "employees") {
                return ["employees", "list", "create", "edit"].includes(
                    this.currentView,
                );
            }
            return this.currentView === viewId;
        },
    },

    template: `
        <aside class="sidebar" :class="{ open: isOpen }">
            <div class="sidebar-header">
                <a href="#" class="sidebar-logo" @click.prevent="navigate('dashboard')">
                    <span class="logo-icon">H</span>
                    <span class="logo-text">HashMicro</span>
                </a>
            </div>

            <nav class="sidebar-nav">
                <ul class="nav-menu">
                    <li
                        v-for="item in navItems"
                        :key="item.id"
                        class="nav-item"
                    >
                        <a
                            href="#"
                            class="nav-link"
                            :class="{ active: isActive(item.id) }"
                            @click.prevent="navigate(item.id)"
                        >
                            <span class="nav-indicator"></span>
                            <span class="nav-text">{{ item.label }}</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div class="sidebar-footer">
                <div class="user-card">
                    <div class="user-avatar">
                        <span>A</span>
                    </div>
                    <div class="user-details">
                        <span class="user-name">Admin User</span>
                        <span class="user-role">Administrator</span>
                    </div>
                </div>
            </div>
        </aside>

        <div
            v-if="isOpen"
            class="sidebar-overlay"
            @click="toggleSidebar"
        ></div>
    `,
};
