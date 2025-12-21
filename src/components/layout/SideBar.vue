<template>
    <div class="sidebar-content" :class="{ collapsed: isCollapsed }">
        <div class="sidebar-content-list">
            <div class="sidebar-content-list-item">
                <div class="icon-24 icon-sb-recruiment"></div>
                <div class="label">Tin tuyển dụng</div>
            </div>

            <div class="sidebar-content-list-item active">
                <div class="icon-24 icon-sb-candidate-active"></div>
                <div class="label">Ứng viên</div>
            </div>

            <div class="sidebar-content-list-item">
                <div class="icon-24 icon-sb-calendar"></div>
                <div class="label">Lịch</div>
            </div>

            <div class="sidebar-content-list-item">
                <div class="icon-24 icon-sb-talent-pools"></div>
                <div class="label">Kho tiềm năng</div>
            </div>

            <div class="sidebar-content-list-item">
                <div class="icon-24 icon-sb-recruitment-campaign-active"></div>
                <div class="label">Chiến dịch tuyển dụng</div>
            </div>

            <div class="sidebar-content-list-item">
                <div class="icon-24 icon-sb-task"></div>
                <div class="label">Công việc</div>
            </div>

            <div class="sidebar-content-list-item">
                <div class="icon-24 icon-email-ai-marketing"></div>
                <div class="label">aiMarketing</div>
            </div>

            <div class="sidebar-content-list-item">
                <div class="icon-24 icon-chat-box"></div>
                <div class="label">Trao đổi với ứng viên</div>
            </div>

            <div class="sidebar-content-list-item">
                <div class="icon-24 icon-sb-report"></div>
                <div class="label">Báo cáo</div>
            </div>

            <div class="sidebar-content-list-item">
                <div class="icon-24 icon-sb-setting"></div>
                <div class="label">Thiết lập</div>
            </div>

            <div class="sidebar-content-list-item">
                <div class="icon-knowladge"></div>
                <div class="label">Kiến thức hữu ích</div>
            </div>
        </div>

        <div class="sidebar-btn">
            <div class="collapse-btn" @click="toggleSidebar">
                <div class="icon-24 icon-left"> </div>
                <div class="label">Thu gọn</div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'; 

const isCollapsed = ref(false);
const emit = defineEmits(['toggle-sidebar']);

const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
    emit('toggle-sidebar', isCollapsed.value);
}
</script>

<style scoped>
.sidebar-content {
    width: 100%;
    height: 100%;
    padding: 32px 0px 16px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.3);
}

.sidebar-container.collapsed .label {
    display: none;
}

.sidebar-container.collapsed .collapse-btn .icon-24 {
    transform: rotate(180deg);
}

.sidebar-container.collapsed .sidebar-content-list-item {
    justify-content: center;
}

.sidebar-container.collapsed .sidebar-content-list-item .icon-24 {
    margin-right: 0;
}

.sidebar-content-list {
    display: flex;
    flex-direction: column;
}

.sidebar-content-list-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;
    margin: 12px;
    margin-top: unset;
    border-radius: 4px;
    gap: 12px;
}

.sidebar-content-list-item:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.sidebar-content-list-item.active {
    background-color: #2680eb;
}

.sidebar-content-list-item.active .label {
    font-weight: 500;
    color: #ffffff;
}

.sidebar-content-list-item.active .icon-24 {
    font-weight: 500;
    background-color: #ffffff;
}

.sidebar-btn {
    padding: 0 12px;
}

.collapse-btn {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border: 1px solid #ffffff;
    cursor: pointer;
    border-radius: 4px;
}

.collapse-btn .label {
    color: #ffffff;
}

.collapse-btn .icon-24 {
    background-color: #ffffff;
}

.collapse-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.label {
    font-size: 14px;
    color: #C5CCD5;
}
</style>