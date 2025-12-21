<script setup>
import { Teleport } from 'vue';
import { ref, reactive, watch } from 'vue';
import { useCandidateStore } from '../../stores/candidate-store/CandidateStore.js';
import { storeToRefs } from 'pinia';
import BaseInput from '../base/BaseInput.vue';
import BaseSelect from '../base/BaseSelect.vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    idSelected: {
        type: Number,
        default: null
    },
});

const emit = defineEmits(['update:modelValue']);

const defaultForm = {
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    area: '',
    address: '',
    educationLevel: '',
    recentWorkplace: '',
    jobPost: '',
    recruitmentRound: '',
    evaluation: 0,
    recruitmentDate: new Date().toISOString().split('T')[0],
    recruitmentCampaign: null,
    candidateSource: "Misa tuyển dụng",
};

const formData = reactive({ ...defaultForm });

const updateFormData = () => {
    if (props.idSelected) {
        const candidateFound = candidates.value.find(item => item.id === props.idSelected);
        
        if (candidateFound) {
            Object.assign(formData, candidateFound);
        }
    } else {
        Object.assign(formData, defaultForm);
        formData.recruitmentDate = new Date().toISOString().split('T')[0];
    }
};

watch(() => props.modelValue, (isOpen) => {
    if (isOpen) {
        updateFormData();
    }
});

const genderOptions = [
    { value: 'Nam' },
    { value: 'Nữ' },
    { value: 'Khác' },
];
const defaultNVKT = ref('Đinh Nga QTHT');

const store = useCandidateStore();
const { candidates } = storeToRefs(store);

const handleSave = () => {
    const data = { ...formData };
    if (props.idSelected) {
        store.updateCandidate(data);
        closePopup();
    } else {
        store.addCandidate(data);
        closePopup();
    }
}

const closePopup = () => {
    emit('update:modelValue', false);
}
</script>

<template>
    <Teleport to="body">
        <div class="popup-container" v-if="modelValue">
            <div class="popup">
                <div class="popup-header">
                    <h2>{{ idSelected ? 'Chỉnh sửa thông tin ứng viên' : 'Thêm ứng viên' }}</h2>
                    <div class="icon-close-btn" @click="closePopup"></div>
                </div>

                <div class="popup-body">
                    <div class="upload-area">
                        <p>Kéo thả hoặc bấm vào đây để tải CV lên</p>
                        <small>Chấp nhận file .doc, .docx, .pdf, .jpg, .jpeg, .png (Dung lượng < hơn 15 Mb)</small>
                                <input type="file" id="fileInput" accept=".doc,.docx,.pdf,.jpg,.jpeg,.png" />
                    </div>
                    <div class="form-content">
                        <div class="avatar-candidate">
                            <span>Ảnh</span>
                        </div>
                        <div class="form-candidate">
                            <div class="form-section active" id="section1">

                                <BaseInput
                                    v-model="formData.fullName"
                                    label="Họ và tên"
                                    placeholder="Nhập họ và tên"
                                    type="text"
                                />

                                <div class="form-row">
                                    <BaseInput
                                        v-model="formData.dateOfBirth"
                                        label="Ngày sinh"
                                        placeholder="Chọn ngày sinh"
                                        type="date"
                                    />
                                    <BaseSelect 
                                        v-model="formData.gender" 
                                        :options="genderOptions" 
                                        label="Giới tính"
                                        placeholder="Chọn giới tính"
                                    />
                                </div>

                                <div class="form-row-3">
                                    <div class="form-group">
                                        <label class="form-label">Khu vực</label>
                                        <div class="form-input display-row bordered-input">
                                            <input type="text" class="input-reset" placeholder="Chọn khu vực" required
                                                id="area" v-model="formData.area"/>
                                            <div class="icon-dropdown-btn"></div>
                                        </div>
                                    </div>
                                    <div class="dictionary-setting ">
                                        <div class="icon-more-option-btn"></div>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <BaseInput
                                        v-model="formData.phone"
                                        label="Số điện thoại"
                                        placeholder="Nhập số điện thoại"
                                        type="text"
                                    />
                                    <BaseInput
                                        v-model="formData.email"
                                        label="Email"
                                        placeholder="Nhập email"
                                        type="email"
                                    />
                                </div>

                                <BaseInput
                                    v-model="formData.address"
                                    label="Địa chỉ"
                                    placeholder="Nhập địa chỉ"
                                    type="text"
                                />

                                <div class="section-title">HỌC VẤN</div>

                                <div class="form-group display-row">
                                    <div class="display-flex">
                                        <div class="icon-dot-import"></div>
                                        <label class="form-label">Trình độ đào tạo</label>
                                    </div>

                                    <div class="form-dx-texteditor">
                                        <div class="dx-texteditor-container display-row bordered-input">
                                            <input type="text" class="input-reset" placeholder="Nhập trình độ đào tạo"
                                                id="educationLevel" v-model="formData.educationLevel"/>
                                            <div class="icon-plus-blue"></div>
                                        </div>
                                        <div class="dx-texteditor-dropdown">
                                            <div class="icon-dropdown-btn"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group display-row">
                                    <div class="display-flex">
                                        <div class="icon-dot-import"></div>
                                        <label class="form-label">Nơi đào tạo</label>
                                    </div>
                                    <div class="form-dx-texteditor">
                                        <div class="dx-texteditor-container display-row bordered-input">
                                            <input type="text" class="input-reset" placeholder="Nhập nơi đào tạo" />
                                            <div class="icon-plus-blue"></div>
                                        </div>
                                        <div class="dx-texteditor-dropdown">
                                            <div class="icon-dropdown-btn"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group display-row">
                                    <div class="display-flex">
                                        <div class="icon-dot-import"></div>
                                        <label class="form-label">Chuyên ngành</label>
                                    </div>
                                    <div class="form-dx-texteditor">
                                        <div class="dx-texteditor-container display-row bordered-input">
                                            <input type="text" class="input-reset" placeholder="Nhập chuyên ngành" />
                                            <div class="icon-plus-blue"></div>
                                        </div>
                                        <div class="dx-texteditor-dropdown">
                                            <div class="icon-dropdown-btn"></div>
                                        </div>
                                    </div>
                                </div>

                                <a href="#" class="add-link">+ Thêm học vấn</a>
                            </div>

                            <div class="form-section active" id="section2">

                                <div class="form-row" style="margin-top: 20px">
                                    <BaseInput
                                        v-model="formData.recruitmentDate"
                                        label="Ngày tuyển dụng"
                                        placeholder="Chọn ngày tuyển dụng"
                                        type="date"
                                    />
                                    <BaseSelect 
                                        :options="[]" 
                                        label="Nguồn ứng viên"
                                        placeholder="Chọn nguồn ứng viên"
                                    />
                                </div>

                                <div class="form-row">
                                    <BaseSelect 
                                        v-model="defaultNVKT" 
                                        :options="[{value: 'Đinh Nga QTHT'}]" 
                                        label="Nhân sự khai thác"
                                        placeholder="Chọn nhân sự khai thác"
                                    />
                                    <BaseSelect 
                                        :options="[]" 
                                        label="Cộng tác viên"
                                        placeholder="Chọn cộng tác viên"
                                    />
                                </div>

                                <div class="checkbox-group">
                                    <input type="checkbox" id="rapidInterview" />
                                    <label for="rapidInterview">Thêm nhanh người tham chiếu vào kho ứng viên</label>
                                </div>

                                <a href="#" class="add-link">+ Thêm người giới thiệu</a>


                                <BaseInput
                                    v-model="formData.recentWorkplace"
                                    label="Nơi làm việc gần đây"
                                    placeholder="Nhập nơi làm việc gần đây"
                                    type="text"
                                />

                                <a href="#" class="add-link">+ Thêm kinh nghiệm làm việc</a>

                                <BaseInput
                                    label="Nơi làm việc"
                                    placeholder="Nhập nơi làm việc"
                                    type="text"
                                />

                                <div class="form-group">
                                    <label class="form-label">Thời gian</label>
                                    <div class="date-range">
                                        <input type="date" class="form-input" placeholder="MM/yyyy" />
                                        <span class="date-separator">-</span>
                                        <input type="date" class="form-input" placeholder="MM/yyyy" />
                                    </div>
                                </div>

                                <BaseInput
                                    v-model="formData.jobPost"
                                    label="Vị trí công việc"
                                    placeholder="Nhập vị trí công việc"
                                    type="text"
                                />

                                <div class="form-group">
                                    <label class="form-label">Mô tả công việc</label>
                                    <textarea class="form-textarea" placeholder="Nhập mô tả công việc"
                                        id="recruitmentRound" v-model="formData.recruitmentRound"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="popup-footer">
                    <button class="btn btn-cancel" @click="closePopup">Hủy</button>
                    <button class="btn btn-primary" @click="handleSave">Lưu</button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.popup-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex; 
    align-items: center;
    justify-content: center;
    opacity: 1;
}
.popup {
    background: white;
    border-radius: 4px;
    width: 560px;
    max-height: 96vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    font-family: 'Inter', Helvetica, Arial, sans-serif;
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
}

.form-content{
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 8px;
}

.avatar-candidate{
    min-width: 68px;
    height: 68px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px dashed #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.popup-header h2 {
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
}

.popup-body {
    padding: 16px 24px;
    overflow-y: auto;
    flex: 1;
}

.form-section {
    display: block;
}

.upload-area {
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    padding: 32px;
    text-align: center;
    margin-bottom: 24px;
    cursor: pointer;
    transition: all 0.3s;
}

.upload-area:hover {
    border-color: #3b82f6;
    background: #f9fafb;
}

.upload-area p {
    color: #3b82f6;
    font-size: 14px;
    margin-bottom: 4px;
}

.upload-area small {
    color: #6b7280;
    font-size: 12px;
}

.form-group {
    flex: 1;
    margin-bottom: 16px;
}

.form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
}

.form-input,
.form-select,
.form-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s;
}

.input-reset {
    border: none;
    background: transparent;
    outline: none;
    padding: 0;
    margin: 0;
    font-size: 14px;
    box-shadow: none;
    -webkit-appearance: none; 
    appearance: none;
    border-radius: 0;
    width: 80%;
}

.display-row {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
}
.display-flex {
    display: flex;
    align-items: center;
}

.dx-texteditor-container{
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s;
}

.form-input:focus,
.form-textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.form-input:hover,
.form-textarea:hover {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); 
    outline: none;
}
/* dx */
.dx-texteditor-container:hover {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    cursor: text;
}

.form-input:focus-within,
.dx-texteditor-container:focus-within {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.form-dx-texteditor{
    display: flex;
    align-items: stretch;
}
/* dx */
.form-textarea {
    resize: vertical;
    min-height: 80px;
}

.form-row {
    display: flex;
    flex: 1;
    gap: 16px;
}
.form-section {
    display: none;
}

.form-section.active {
    display: block;
}
/*  */
.form-row-3 {
    display: flex;
    flex: 1;
    align-items: center;
}

.bordered-input {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
}

.dictionary-setting {
    height: 38px;
    width: 38px;
    border: 1px solid #e0e0e0;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 9px;
    transform: rotate(90deg);
}
.dx-texteditor-dropdown {
    height: 39px;
    width: 39px;
    border: 1px solid #e0e0e0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
}
/*  */

.add-link {
    color: #3b82f6;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 12px;
    text-decoration: none;
}

.add-link:hover {
    text-decoration: underline;
}

.section-title {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 16px;
}

.checkbox-group {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
}

.checkbox-group input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
}

.checkbox-group label {
    font-size: 14px;
    color: #374151;
    cursor: pointer;
}

.date-range {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 12px;
    align-items: center;
}

.date-separator {
    color: #6b7280;
    font-size: 14px;
}

.popup-footer {
    padding: 8px 24px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    background-color: #f1f2f5;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}

.btn {
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
}

.btn-cancel {
    color: #374151;
}

.btn-cancel:hover {
    background: #f9fafb;
}

.btn-primary {
    background: #3b82f6;
    color: white;
}

.btn-primary:hover {
    background: #2563eb;
}

.btn-primary:disabled {
    background: #93c5fd;
    cursor: not-allowed;
}

.hidden {
    display: none;
}

input[type="file"] {
    display: none;
}
:deep(.select-dropdown) {
  top: 76%; 
  margin-top: 4px;
}
</style>