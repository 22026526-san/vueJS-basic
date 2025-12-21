<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    
    modelValue: {
        type: [String, Number],
        default: null
    },
    
    options: {
        type: Array,
        required: true,
        default: () => []
    },

    placeholder: {
        type: String,
        default: 'Chọn giá trị'
    },
    label: {
        type: String,
        default: null
    }
});

//Định nghĩa Emits (Sự kiện)
const emit = defineEmits(['update:modelValue']);


const isOpen = ref(false);
const selectRef = ref(null); 

const displayLabel = computed(() => {

    const selectedOption = props.options.find(opt => opt.value === props.modelValue);

    return selectedOption ? selectedOption.value : props.placeholder;
});


const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
    emit('update:modelValue', option.value);
    isOpen.value = false;
};

// Đóng dropdown khi click ra ngoài
const handleClickOutside = (event) => {
    if (selectRef.value && !selectRef.value.contains(event.target)) {
        isOpen.value = false;
    }
};

onMounted(() => { window.addEventListener('click', handleClickOutside); });
onUnmounted(() => { window.removeEventListener('click', handleClickOutside); });
</script>

<template>
    <div class="base-select" ref="selectRef">
        <div class="select-dropdown" v-if="isOpen">
            <ul v-if="options.length > 0">
                <li 
                    v-for="(option, index) in options" 
                    :key="index"
                    class="select-item"
                    :class="{ 'selected': option.value === modelValue }"
                    @click="selectOption(option)"
                >
                    {{ option.value }}
                </li>
            </ul>
            <div v-else class="select-empty"></div>
        </div>
        <div class="form-group">
            <label v-if="label" class="form-label">{{ label }}</label>

            <div 
                class="select-trigger" 
                :class="{ 'is-active': isOpen, 'has-value': modelValue !== null }"
                @click="toggleDropdown"
            >
            <span class="text">{{ displayLabel }}</span>
            
            <div class="icon-16 icon-dropdown-btn"></div>
        </div>
        </div>
    </div>
</template>

<style scoped>
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
.base-select {
    position: relative;
    width: 100%; 
    min-width: 120px;
    font-family: 'Inter', sans-serif;
    user-select: none;
    flex: 1;
}

.select-trigger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: #fff;
    border: 1px solid #d1d5db; 
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    height: 36px; 
}


.select-trigger:hover, 
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

.select-trigger.is-active .arrow-icon {
    transform: rotate(180deg);
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