<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 1. Định nghĩa Props
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    label: {
        type: String,
        default: null
    },
    placeholder: {
        type: String,
        default: ''
    },
    options: {
        type: Array,
        default: () => [],
        required: true
    }
});


const emit = defineEmits(['update:modelValue', 'click-add']);


const isOpen = ref(false);
const selectRef = ref(null);

const labelText = computed(() => {

    const selectedOption = props.options.find(opt => opt.value === props.modelValue);

    return selectedOption ? selectedOption.value : props.placeholder;
});

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectItem = (item) => {
    emit('update:modelValue', item.value);
    isOpen.value = false;
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
    <div class="form-group-base display-row" ref="selectRef">
        <div class="display-flex" v-if="label">
            <div class="icon-dot-import"></div>
            <label class="form-label">{{ label }}</label>
        </div>

        <div class="form-dx-texteditor">

            <div class="dx-texteditor-container display-row bordered-input">
                <div class="select-trigger" :class="{ 'is-active': isOpen, 'has-value': modelValue !== '' }">
                    <span class="text">{{ labelText }}</span>
                </div>

                <div class="icon-plus-blue" @click.stop="emit('click-add')"></div>
            </div>

            <div class="dx-texteditor-dropdown" @click.stop="toggleDropdown">
                <div class="icon-dropdown-btn"></div>
            </div>

            <div class="select-dropdown" v-if="isOpen">
                <ul v-if="props.options.length > 0">
                    <li v-for="(option, index) in props.options" :key="index" class="select-item"
                        :class="{ 'selected': option.value === modelValue }" @click="selectItem(option)">
                        {{ option.value }}
                    </li>
                </ul>
                <div v-else class="select-empty"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.form-group-base {
    flex: 1;
    margin-bottom: 16px;
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
    flex:1
}

.form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
}

.form-dx-texteditor:hover .dx-texteditor-container{
    border-color: #3b82f6;
    border-right-color: #e0e0e0 !important;
}
.form-dx-texteditor:hover .dx-texteditor-dropdown {
    border-color: #3b82f6;
    border-left-color: #e0e0e0 !important;
}

.form-input:focus-within,
.dx-texteditor-container:focus-within {
    border-color: #3b82f6;
    border-left-color: #e0e0e0 !important;
}

.form-dx-texteditor {
    display: flex;
    align-items: stretch;
    flex: 2;
    position: relative;
    cursor: pointer;
}

.dx-texteditor-container {
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s;
    width: 86%;
}

.bordered-input {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
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

.select-trigger.is-active {
    border-color: #3b82f6;
}

.text {
    font-size: 14px;
    color: #9ca3af;
}

.select-trigger.has-value .text {
    color: #374151;
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
</style>