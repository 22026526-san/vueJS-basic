<script setup>
import TheHeader from './Header.vue';
import TheSidebar from './SideBar.vue';
</script>

<template>
    <div class="layout-container">

        <div class="header-container">
            <TheHeader />
        </div>

        <div class="main-layout">
            <div class="sidebar-container">
                <TheSidebar />
            </div>

            <div class="layout-content">
                <slot></slot>
            </div>
        </div>

    </div>
</template>

<style scoped>

.layout-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.header-container {
    height: 48px;
    width: 100%;
}

.main-layout {
    display: flex;
    height: calc(100% - 48px);
    width: 100%;
    overflow: hidden;
}

.sidebar-container {
    min-width: 236px;
    height: 100%;
    background:
        url(../../assets/icons/sidebar-bg.svg);
    background-color: #051529;
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    flex-shrink: 0;
}

.layout-content {
    flex: 1;
    height: 100%;
    max-width: calc(100% - 62px);
    min-width: calc(100% - 236px);
    display: flex;
    background-color: #f2f2f2;
    flex-direction: column;
    overflow: hidden;
}
</style>