<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    label: {
        type: String,
        default: null
    },
    options: {
        type: Array,
        default: () => [],
        required: true
    }
});

const emit = defineEmits(['update:modelValue','click-edit']);


const isOpen = ref(false);
const selectRef = ref(null);

const activeOptions = computed(() => {
    return props.options.filter(opt => opt.active === 1);
});

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectItem = (item) => {
    emit('update:modelValue', item.value);
    isOpen.value = false;
};

const onEditClick = () => {
    emit('click-edit');
};

const handleClickOutside = (event) => {
    if (selectRef.value && !selectRef.value.contains(event.target)) {
        isOpen.value = false;
    }
};
onMounted(() => { window.addEventListener('click', handleClickOutside); });
onUnmounted(() => { window.removeEventListener('click', handleClickOutside); });

</script>

<template>
    <div class="form-row-base" ref="selectRef">
        <div class="form-group">
            <label v-if="props.label" class="form-label">{{ label }}</label>
            <div class="option-edit-container display-row-base bordered-input" @click.stop="toggleDropdown">
                <div class="select-option" :class="{ 'is-active': isOpen, 'has-value': modelValue !== '' }">
                    <span class="text">{{ props.modelValue !== '' ? props.modelValue : 'Chọn giá trị'}}</span>
                </div>
                <div class="icon-dropdown-btn"></div>
                <div class="select-dropdown" v-if="isOpen">
                    <ul v-if="activeOptions.length > 0">
                        <li v-for="(option, index) in activeOptions" :key="index" class="select-item"
                            :class="{ 'selected': option.value === modelValue }" @click="selectItem(option)">
                            {{ option.value }}
                        </li>
                    </ul>
                    <div v-else class="select-empty"></div>
                </div>
            </div>
        </div>
        <div class="dictionary-setting" @click.stop="onEditClick">
            <div class="icon-more-option-btn"></div>
        </div>
    </div>
</template>

<style scoped>
.form-row-base {
    display: flex;
    flex: 1;
    align-items: center;
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
    cursor: pointer;
}
.display-row-base {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
}

.option-edit-container {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s;
    position: relative;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
}
.select-opton.is-active {
    border-color: #3b82f6;
}
.text {
    font-size: 14px;
    color: #9ca3af;
}

.select-option.has-value .text {
    color: #374151;
}

.select-dropdown {
    position: absolute;
    left: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 50;
    max-height: 200px;
    overflow-y: auto;
}
.select-dropdown ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.select-item {
    padding: 8px 12px;
    font-size: 14px;
    color: #374151;
    cursor: pointer;
}

.select-item:hover {
    background-color: #f3f4f6;
}

.select-item.selected {
    background-color: #eff6ff;
    color: #3b82f6;
    font-weight: 500;
}
.select-empty {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    font-size: 13px;
    cursor: default;
    user-select: none;
}
</style>