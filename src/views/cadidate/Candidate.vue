<script setup>
import { useCandidateStore } from '../../stores/candidate-store/CandidateStore.js';
import { storeToRefs } from 'pinia';
import { ref , computed, watch} from 'vue';
import BaseSelect from '../../components/base/BaseSelect.vue';
import CandidateFormPopup from '../cadidate/CandidateFormPopup.vue';

const store = useCandidateStore();

const { candidates } = storeToRefs(store);

const isOpenPopup = ref(false);
const pageSize = ref(25);
let currentPage = ref(1);
let searchQuery = ref('');
let idSelected = ref(null);

const filteredCandidates = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return candidates.value;

    return candidates.value.filter(c => 
        (c.fullName || '').toLowerCase().includes(query) ||
        (c.email || '').toLowerCase().includes(query) ||
        (c.phone || '').toString().includes(query)
    );
});

const totalPages = computed(() => filteredCandidates.value.length);

const startRecord = computed(() => {
    if (totalPages.value === 0) return 0;
    return (currentPage.value - 1) * pageSize.value + 1;
});

const endRecord = computed(() => {
    const end = (currentPage.value - 1) * pageSize.value + pageSize.value;
    return end > totalPages.value ? totalPages.value : end;
});

watch(pageSize, () => {
    currentPage.value = 1;
});

const dataTable = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredCandidates.value.slice(start, end);
});
const pageSizeOptions = [
    { value: 10 },
    { value: 15 },
    { value: 20 },
    { value: 25 },
];

function checkNull(value) {
  return value === null || value === undefined || value === '' ? '--' : value;
}

function onClickPrevBtn() {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
}
function onClickNextBtn() {
  if (currentPage.value < Math.ceil(totalPages.value / pageSize.value)) {
    currentPage.value += 1;
  }
}

const isPrevBtnDisabled = computed(() => {
  return currentPage.value === 1;
});
const isNextBtnDisabled = computed(() => {
  return Math.ceil(totalPages.value / pageSize.value) <= currentPage.value;
});
</script>

<template>
  <div class="body-title">
    <div class="body-title-left">Ứng viên</div>
    <div class="body-title-right">
      <div class="body-title-btn" @click="isOpenPopup = true">
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
        <div class="dx-button-content">
          <div class="icon-ai-button-table"></div>
        </div>
        <input type="text" placeholder="Tìm kiếm nhanh trong danh sách" v-model.lazy="searchQuery"/>
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
        <tbody>
          <tr v-for="candidate in dataTable" :key="candidate.id">
            <td><input type="checkbox" value="${candidate.id}"></td>
            <td>
                <div class="name-cell">
                    <div class="avatar">ms</div>
                    <div class="name-info">
                        <span class="name-main">{{checkNull(candidate.fullName)}}</span>
                    </div>
                </div>
            </td>
            <td>{{checkNull(candidate.email)}}</td>
            <td>{{checkNull(candidate.phone)}}</td>
            <td>{{checkNull(candidate.recruitmentCampaign)}}</td>
            <td><span>{{checkNull(candidate.recruitmentStatus)}}</span></td>
            <td>{{checkNull(candidate.jobPost)}}</td>
            <td>{{checkNull(candidate.recruitmentRound)}}</td>
            <td>
                <div class="stars">
                    <span 
                        v-for="i in 5" 
                        :key="i"
                        :style="{ 
                            color: i <= (candidate.evaluation || 0) ? '#ffc107' : '#e5e7eb',
                            fontSize: '18px',
                            marginRight: '2px'
                        }"
                    >
                        ★
                    </span>
                </div>
            </td>
            <td>{{checkNull(candidate.recruitmentDate)}}</td>
            <td>{{checkNull(candidate.candidateSource)}}</td>
            <td>{{checkNull(candidate.educationLevel)}}</td>
            <td>{{checkNull(candidate.recentWorkplace)}}</td>
            <td>{{checkNull(candidate.area)}}</td>
            <td>{{checkNull(candidate.dateOfBirth)}}</td>
            <td>{{checkNull(candidate.address)}}</td>
            <td>{{checkNull(candidate.gender)}}</td>
            <td>
                <div class="icon-update-user" @click="isOpenPopup = true; idSelected = candidate.id"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-footer">
      <div class="footer-left">Tổng: <strong>{{ totalPages }}</strong> bản ghi</div>
      <div class="footer-right">
        <div class="page-size">
          <span>Số bản ghi/trang</span>
          <BaseSelect 
              v-model="pageSize" 
              :options="pageSizeOptions" 
          />
        </div>
        <div class="pagination">
          <span>{{ startRecord }} - {{ endRecord }} bản ghi</span>
          <div class="pagination-icon">
            <div class="icon-20 icon-prev" :class="{ disabled: isPrevBtnDisabled }" v-on:click="onClickPrevBtn"></div>
            <div class="icon-20 icon-next" :class="{ disabled: isNextBtnDisabled }" v-on:click="onClickNextBtn"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CandidateFormPopup v-model:idSelected="idSelected" v-model="isOpenPopup"/>
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

@keyframes spin-ai {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin-ai-reverse {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); } 
}

.icon-ai-button-table {
  width: 23px;
  height: 23px;
  background: url('../../assets/icons/ai-search-candidate.svg') center / cover no-repeat;
  border-radius: 50%;
  animation: spin-ai-reverse 3s linear infinite;
}

.dx-button-content {
  position: absolute;
  top: 5px;
  left: 2px;
  padding: 4px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../../assets/icons/ai-search-candidate-bg.svg") no-repeat center;
  background-size: contain;
  animation: spin-ai 3s linear infinite;
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
  padding: 12px 24px 12px 12px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  gap: 12px;
  justify-content: space-between;
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
  width: 30px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
  color: white;
  margin-right: 8px;
  background: #8a5cf680
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.page-size :deep(.base-select) {
  min-width: 68px;
  width: auto;
}
.page-size :deep(.form-group) {
  margin-bottom: 0;
}

.page-size :deep(.select-dropdown) {
  bottom: 100%; 
  margin-bottom: 4px;
}

.page-size :deep(.select-trigger:hover .text) {
  color: #2680eb;
}

.page-size :deep(.select-trigger:hover .icon-dropdown-btn) {
  background-color: #2680eb;
}

.icon-prev.disabled, 
.icon-next.disabled {
    opacity: 0.5 !important;      
    pointer-events: none !important; 
    cursor: default !important;   
}
</style>
