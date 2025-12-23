<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    isOpenEdit: { type: Boolean, required: true },
    title: { type: String, default: 'Chỉnh sửa tùy chọn' },
    initialOptions: { type: Array, default: () => [] }
});

const emit = defineEmits(['close-edit', 'save-edit']);

const localOptions = ref([]);
const errorMessages = ref([]);

watch(
    () => props.isOpenEdit,
    (newVal) => {
        if (newVal) {
            localOptions.value = JSON.parse(JSON.stringify(props.initialOptions));
        }
    }
);


const toggleActive = (index) => {
    localOptions.value[index].active = localOptions.value[index].active === 1 ? 0 : 1;
};

const deleteOption = (index) => {
    localOptions.value.splice(index, 1);
};

const addOption = () => {
    localOptions.value.push({ active: 1, value: '' });
};

const handleSave = () => {
    let hasError = false
    localOptions.value.forEach((option, index) => {
        if (option.active === 1 && (!option.value || option.value.trim() === '')) {
            errorMessages.value[index] = 'Tên không được để trống';
            hasError = true; 
        } 
        else {
            errorMessages.value[index] = ''; 
        }
    });
    if (hasError) return;

    emit('save-edit', localOptions.value);
    emit('close-edit');
};

const handleClose = () => {
    errorMessages.value = []
    emit('close-edit');
};
</script>

<template>
    <Teleport to="body">
        <div v-if="isOpenEdit" class="popup-overlay">
            <div class="popup-edit-item-container">
                <div class="popup-header">
                    <h3>{{ title }}</h3>
                    <div class="icon-close-btn" @click="handleClose"></div>
                </div>

                <div class="popup-body">
                    <div class="search-bar">
                        <div class="search-bar-content">
                            <div class="icon-16 icon-search-bar"></div>
                        </div>
                        <input type="text" placeholder="Tìm kiếm" v-model.lazy="searchQuery"/>
                    </div>
                    <div class="options-list">
                        <div v-for="(option, index) in localOptions" :key="index" class="option-row-container">
                            <div class="option-row-content">
                                <input type="checkbox" :checked="option.active === 1" @change="toggleActive(index)"
                                    class="option-checkbox" />

                                <input type="text" v-model="option.value" class="option-input" :class="{ 'input-error': errorMessages[index] }"/>

                                <div class="icon-16 icon-delete" @click="deleteOption(index)"></div>
                            </div>
                            <span v-if="errorMessages[index]" class="error-text">{{ errorMessages[index] }}</span>
                        </div>
                    </div>

                    <div class="add-row-btn" @click="addOption">
                        <div class="icon-plus-blue"></div> Thêm dòng
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
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.popup-edit-item-container {
    background: #fff;
    border-radius: 4px;
    width: 500px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid #e0e0e0;
}

.popup-header h3 {
    margin: 0;
    font-size: 22px;
    font-weight: 500;
}

.popup-body {
    padding: 12px 0;
    display: flex;          
    flex-direction: column; 
    overflow: hidden;       
    flex: 1;                
    min-height: 0
}

.options-list {
    min-height: 336px;
    flex: 1;                
    overflow-y: auto;  
    padding: 0 24px;     
}
.options-list .icon-delete{
    margin-top: 15px;
    cursor: pointer;
}
.option-row-content {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}
.option-row-container {
    display: flex;
    flex-direction: column;
}
.error-text {
    color: red;
    font-size: 12px;
    margin-top: 4px;
    display: block;
    margin-left: 28px;
    margin-bottom: 8px;
    margin-top: -4px;
}
.input-error {
    border-color: red !important;
}
.option-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.option-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    outline: none;
}

.option-input:focus {
    border-color: #3b82f6;
}

.search-bar {
  flex: 1;
  position: relative;
  padding:8px 24px 16px 24px;
}

.search-bar input {
  width: 100%;
  padding: 8px 12px 8px 36px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.search-bar input:focus {
  border-color: #2680eb;
}

.search-bar-content {
  position: absolute;
  top: 12px;
  left: 30px;
  padding: 4px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-row-btn {
    color: #3b82f6;
    cursor: pointer;
    font-weight: bold;
    display: inline-block;
    margin-top: 8px;
    background-color: rgba(225, 238, 255, 0.8);
    padding: 8px 16px;
    font-size: 14px;
    display: flex;
    gap: 8px;
    align-items: center;
    width: 136px;
    margin-left: 24px;
}

.popup-footer {
    padding: 16px 24px;
    background: #f5f5f5;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    border-top: 1px solid #e0e0e0;
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