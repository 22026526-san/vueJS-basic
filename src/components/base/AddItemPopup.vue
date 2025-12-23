<script setup>
import { ref } from 'vue';

const props = defineProps({
    isOpenAdd: { type: Boolean, default: false },
    title: { type: String, default: 'Thêm mới' },
    label: { type: String, default: 'Tên' }
});

const emit = defineEmits(['close-add', 'save-add']);

const newValue = ref('');
const errorMessage = ref('');

const handleClose = () => {
    newValue.value = '';
    errorMessage.value = '';
    emit('close-add');
};

const handleSave = () => {
    if (!newValue.value.trim()) {
        errorMessage.value = `Không được để trống.`;
        return;
    }

    emit('save-add', newValue.value.trim());
    handleClose();
};
</script>

<template>
    <Teleport to="body">
        <div v-if="isOpenAdd" class="popup-overlay">
            <div class="popup-add-item-container">
                <div class="popup-header">
                    <p>{{ title }}</p>
                    <div class="icon-close-btn" @click="handleClose"></div>
                </div>

                <div class="popup-body">
                    <div class="form-group">
                        <label class="form-label">
                            {{ label }} <span class="required">*</span>
                        </label>
                        <input type="text" class="form-input" v-model="newValue"
                            :class="{ 'input-error': errorMessage }" @input="errorMessage = ''"
                            placeholder="Nhập tên..." />
                        <span v-if="errorMessage" class="error-text">{{ errorMessage }}</span>
                    </div>
                </div>

                <div class="popup-footer">
                    <button class="btn btn-cancel" @click="handleClose">Hủy</button>
                    <button class="btn btn-primary" @click="handleSave">Lưu</button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.149);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;
}

.popup-add-item-container {
    background: #fff;
    border-radius: 4px;
    min-width: 480px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid #e0e0e0;
}

.popup-header p {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
}

.popup-body {
    padding: 24px;
}

.form-group {
    margin-bottom: 16px;
}

.form-label {
    display: block;
    margin-bottom: 8px;
    color: #333;
}

.required {
    color: red;
}

.form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    box-sizing: border-box;
}

.form-input:hover,
.form-input:focus{
    border-color:#3b82f6;
    outline: none;
}

.input-error {
    border-color: red;
}

.error-text {
    color: red;
    font-size: 12px;
    margin-top: 4px;
    display: block;
}

.popup-footer {
    padding: 12px 24px;
    background: #f5f5f5;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}

.btn {
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    font-weight: 500;
}

.btn-cancel {
    background: #e0e0e0;
    color: #333;
}

.btn-primary {
    background: #3b82f6;
    color: #fff;
}
</style>