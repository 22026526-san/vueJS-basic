<script setup>
// Logic Javascript sẽ viết ở đây
</script>

<template>
  <div class="body-title">
    <div class="body-title-left">Ứng viên</div>
    <div class="body-title-right">
      <div class="body-title-btn">
        <div class="icon-20 btn-icon-add"></div>
        <span>Thêm ứng viên</span>
      </div>
      <div class="more-option">
        <div class="icon-16 btn-icon-down"></div>
      </div>
    </div>
  </div>

  <div class="body-table">
    <div class="toolbar">
      <div class="search-box">
        <div class="search-icon-table"></div>
        <input type="text" placeholder="Tìm kiếm nhanh trong danh sách" />
      </div>
      <div class="toolbar-right">
        <button class="icon-btn-table">
          <div class="icon-20 icon-filter"></div>
        </button>
        <button class="icon-btn-table">
          <div class="icon-20 icon-export-history"></div>
        </button>
        <button class="icon-btn-table">
          <div class="icon-24 icon-interactive-history"></div>
        </button>
        <button class="icon-btn-table">
          <div class="icon-24 icon-setting-columns"></div>
        </button>
      </div>
    </div>
    <div class="table-wrapper">
      <table class="candidate-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Chiến dịch tuyển dụng</th>
            <th>Trạng thái</th>
            <th>Tin tuyển dụng</th>
            <th>Vòng tuyển dụng</th>
            <th>Đánh giá</th>
            <th>Ngày ứng tuyển</th>
            <th>Nguồn ứng viên</th>
            <th>Trình độ</th>
            <th>Nơi làm việc gần đây</th>
            <th>Khu vực</th>
            <th>Ngày sinh</th>
            <th>Địa chỉ</th>
            <th>Giới tính</th>
            <th></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <div class="table-footer">
      <div class="footer-left">Tổng: <strong></strong> bản ghi</div>
      <div class="footer-right">
        <div class="page-size">
          <span>Số bản ghi/trang</span>
          <div class="page-size-select">
            <select id="pageSizeSelect" class="form-select-size">
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25" selected>25</option>
            </select>
          </div>
        </div>
        <div class="pagination">
          <span></span>
          <div class="pagination-icon">
            <div class="icon-20 icon-prev"></div>
            <div class="icon-20 icon-next"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body-title-btn {
  display: flex;
  align-items: center;
  background-color: #2680eb;
  width: auto;
  font-weight: 500;
  font-size: 14px;
  height: 36px;
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.body-title-btn span {
  font-size: 14px;
  padding: 0 0 0 8px;
  color: #fff;
}

.more-option {
  width: 40px;
  height: 36px;
  margin-left: -4px;
  border-left: 1px solid #176cd1;
  background: #2680eb;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  cursor: pointer;
}

/* Search Box Component */
.search-box {
  flex: 1;
  max-width: 300px;
  position: relative;
}

.search-box input {
  width: 100%;
  padding: 8px 12px 8px 36px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.search-box input:focus {
  border-color: #2680eb;
}

.search-icon-table {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  mask-image: url(../assets/icons/ICON.svg);
  mask-repeat: no-repeat;
  mask-position: -283px -945px;
  background-color: rgba(128, 128, 128, 0.832);
  width: 18px;
  height: 18px;
  margin-top: 2px;
  cursor: pointer;
}

.body-title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 12px 0 24px;
}

.body-title-left {
  font-size: 20px;
  padding: 8px 0 4px;
  color: #1e2633;
  font-weight: bold;
}

.body-title-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

/* Toolbar */
.toolbar {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  gap: 12px;
  justify-content: end;
}

.toolbar-right {
  display: flex;
  gap: 8px;
}

/* Table Section */
.body-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 12px 16px 24px;
  width: 100%;
  height: calc(100% - 50px);
}

.table-wrapper {
  flex: 1;
  overflow-x: auto;
  overflow-y: auto;
  position: relative;
}

/* Table Styles */
.candidate-table {
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  position: relative;
}

.candidate-table thead {
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 15;
}

.candidate-table th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
  background-color: #f9fafb;
}

.candidate-table td {
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
  background: white;
}

/* Sticky columns */
.candidate-table tbody th:first-child,
.candidate-table tbody td:first-child {
  position: sticky;
  left: 0;
  z-index: 10;
  background: white;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
}

.candidate-table tbody th:last-child,
.candidate-table tbody td:last-child {
  position: sticky;
  right: 0;
  z-index: 10;
  background: white;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.05);
}

.candidate-table thead th:first-child {
  position: sticky;
  left: 0;
  z-index: 25;
  background: #f9fafb;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
}

.candidate-table thead th:last-child {
  position: sticky;
  right: 0;
  z-index: 25;
  background: #f9fafb;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.05);
}

/* Hover effects */
.candidate-table tbody tr:hover td {
  background: #e1eeff !important;
}

.candidate-table tbody tr:hover td:first-child,
.candidate-table tbody tr:hover td:last-child {
  background: #e1eeff !important;
}

.candidate-table tbody tr:hover .icon-update-user {
  opacity: 1;
}

/* Name cell */
.name-cell {
  display: flex;
  align-items: center;
}

.name-info {
  display: flex;
  flex-direction: column;
}

.name-main {
  font-weight: 500;
  color: #1e2633;
}

.stars {
  display: flex;
  gap: 3px;
}

.star {
  color: #d1d5db;
  font-size: 16px;
}

/* Footer */
.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: white;
}

.footer-left {
  color: #1e2633;
  font-size: 14px;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Pagination Component */
.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-icon {
  display: flex;
  align-items: center;
  gap: 3px;
}

.pagination span,
.page-size span {
  color: #374151;
  font-size: 14px;
}

.pagination button {
  width: 32px;
  height: 32px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

.pagination button:hover:not(:disabled) {
  background: #f9fafb;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Page Size Select */
.page-size {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-size-select {
  padding: 6px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background: white;
  display: flex;
  align-items: center;
  gap: 5px;
}

.page-size:hover {
  color: #2680eb;
}

.page-size:hover .page-size-select {
  border-color: #2680eb;
}

.page-size:hover .icon-dropdown {
  background-color: #2680eb;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
  color: white;
  margin-right: 8px;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.form-select-size {
  padding: 0px 5px;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  outline: none;
  -webkit-appearance: auto;
  appearance: auto;
  border: none;
}

.form-select-size:hover {
  color: #3b82f6;
}
</style>
