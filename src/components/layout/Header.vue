<template>
    <div class="header-content">
        <div class="header-content-left">
            <div class="header-content-navbar">
                <div class="icon-switch-app"></div>
                <div class="navbar-container">
                    <div class="navbar-logo">
                        <div class="logo"></div>
                    </div>
                    <div class="navbar-bg"></div>
                </div>
                <div class="header-content-title"> Tuyển dụng </div>
            </div>
            <div class="header-content-search">
                <div class="search-bar">
                    <div class="search-icon"></div>
                    <input type="text" placeholder="Tìm kiếm tin tuyển dụng, ứng viên, nhân tài..." />
                </div>
            </div>
        </div>
        <div class="header-content-right">
            <div class="recruitment-page">
                <div class="recruitment-page-icon icon-header"></div>
                <div class="recruitment-page-title"> Website tuyển dụng </div>
            </div>
            <div class="icon-container">
                <div class="icon-notification-version"></div>
            </div>
            <div class="icon-container">
                <div class="icon-store"></div>
            </div>
            <div class="icon-user-controlpanel"></div>
            <div class="icon-messgae"></div>
            <div class="icon-noti"></div>
            <div class="icon-helpmenu"></div>
            <div class="icon-other"></div>
            <div class="icon-knowladge"></div>
            <div class="avatar-container">
                <img src="../../assets/avatar/Image.png" alt="avatar">
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    width: 100%;
    background: #ffffff;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    z-index: 10;
}

.header-content-left {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 10px;
}

.header-content-navbar {
    height: 100%;
    width: 262px;
    background: url(../../assets/icons/navbar-bg-noel.svg);
    background-repeat: no-repeat;
    background-position: left;
    background-size: cover;
    padding-left: 6px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.navbar-container {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
}

.navbar-bg {
    background-image: url(../../assets/icons/event-header.svg);
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: contain;
    height: 48px;
    width: 103px;
    position: absolute;
    bottom: 0px;
    z-index: 2;
    margin-left: -9px;
}

.navbar-logo {
    max-height: 52px;
    height: 52px;
    width: 40px;
    overflow: hidden;
    margin-left: 24px;
    margin-right: 10px;
}

.logo {
    background-image: url(../../assets/icons/logo-recruitment.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 32px;
    height: 32px;
    margin-top: 8px;
}

.header-content-title {
    font-size: 18px;
    color: #000000;
    font-weight: bold;
}

.header-content-right {
    height: 100%;
    display: flex;
    gap: 14px;
    align-items: center;
}

.recruitment-page {
    display: flex;
    gap: 3px;
    align-items: center;
    cursor: pointer;
}

.recruitment-page-title {
    font-size: 14px;
    color: #1e2633;
    padding: 4px 0;
}

.recruitment-page:hover .recruitment-page-icon {
    background-color: #2680eb;
}

.recruitment-page:hover .recruitment-page-title {
    color: #2680eb;
}

.header-content-search {
    display: flex;
    align-items: center;
}

.avatar-container {
    margin-right: 24px;
}

.icon-header {
    width: 24px;
    height: 24px;
    min-width: 24px;
    mask-image: url("../../assets/icons/ICON.svg");
    mask-repeat: no-repeat;
}

.icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: all 0.3s ease;
    cursor: pointer;
    background: transparent;
}

.icon-container:hover {
    background-color: #1e26331d;
}


.avatar-container {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
}

.avatar-container img {
    max-height: 32px;
    max-width: 32px;
    vertical-align: middle;
    border-style: none;
    cursor: pointer;
}

.search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 365px;
    height: 32px;
    background-color: #f2f2f2;
    border: none;
    padding: 1px 32px 1px 12px;
    border-radius: 5px;
    box-sizing: border-box;
}

.search-icon {
    mask-image: url(../../assets/icons/ICON.svg);
    mask-repeat: no-repeat;
    mask-position: -283px -945px;
    background-color: rgba(128, 128, 128, 0.832);
    width: 18px;
    height: 18px;
    margin-top: 4px;
}

.search-bar input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    color: #1e2633;
}

.search-bar input::placeholder {
    color: #9aa1a9;
}
</style>