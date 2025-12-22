export default {
    name: "DashboardView",

    props: {
        items: {
            type: Array,
            required: true,
            default: () => [],
        },
    },

    emits: ["go-to-employees", "go-to-create"],

    computed: {
        totalEmployees() {
            return this.items.length;
        },

        activeEmployees() {
            return this.items.filter((item) => item.status === true).length;
        },

        inactiveEmployees() {
            return this.items.filter((item) => item.status === false).length;
        },

        totalDepartments() {
            const departments = new Set(
                this.items.map((item) => item.department).filter(Boolean),
            );
            return departments.size;
        },

        departmentStats() {
            const stats = {};
            this.items.forEach((item) => {
                const dept = item.department || "Unassigned";
                stats[dept] = (stats[dept] || 0) + 1;
            });
            return Object.entries(stats)
                .map(([name, count]) => ({
                    name,
                    count,
                    percentage: Math.round((count / this.items.length) * 100),
                }))
                .sort((a, b) => b.count - a.count);
        },

        quickActions() {
            return [
                {
                    id: 1,
                    label: "Add New Employee",
                    description: "Create a new employee record",
                    action: "create",
                },
                {
                    id: 2,
                    label: "View All Employees",
                    description: "Browse and manage employee list",
                    action: "list",
                },
            ];
        },
    },

    methods: {
        goToEmployees() {
            this.$emit("go-to-employees");
        },
    },

    template: `
        <div class="dashboard-view">
            <div class="page-header">
                <div class="page-header-content">
                    <h1>Dashboard</h1>
                    <p>Overview of your employee data</p>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-card primary">
                    <div class="stat-value">{{ totalEmployees }}</div>
                    <div class="stat-label">Total Employees</div>
                </div>

                <div class="stat-card success">
                    <div class="stat-value">{{ activeEmployees }}</div>
                    <div class="stat-label">Active</div>
                </div>

                <div class="stat-card warning">
                    <div class="stat-value">{{ inactiveEmployees }}</div>
                    <div class="stat-label">Inactive</div>
                </div>

                <div class="stat-card info">
                    <div class="stat-value">{{ totalDepartments }}</div>
                    <div class="stat-label">Departments</div>
                </div>
            </div>

            <div class="charts-grid">
                <div class="chart-card">
                    <div class="chart-header">
                        <h3 class="chart-title">Department Distribution</h3>
                    </div>
                    <div class="department-list">
                        <div
                            v-for="dept in departmentStats"
                            :key="dept.name"
                            class="department-item"
                        >
                            <div class="department-name">{{ dept.name }}</div>
                            <div class="department-bar">
                                <div
                                    class="department-bar-fill"
                                    :style="{ width: dept.percentage + '%' }"
                                ></div>
                            </div>
                            <div class="department-percentage">{{ dept.percentage }}%</div>
                        </div>
                    </div>
                </div>

                <div class="chart-card">
                    <div class="chart-header">
                        <h3 class="chart-title">Quick Actions</h3>
                    </div>
                    <div class="quick-actions-list">
                        <button
                            v-for="action in quickActions"
                            :key="action.id"
                            class="quick-action-btn"
                            @click="action.action === 'create' ? $emit('go-to-create') : goToEmployees()"
                        >
                            <div class="quick-action-label">{{ action.label }}</div>
                            <div class="quick-action-desc">{{ action.description }}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
};
