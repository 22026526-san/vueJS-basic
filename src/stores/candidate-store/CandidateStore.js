import { defineStore } from 'pinia'
import candidateData from '../../data/candidate-data.js' 

export const useCandidateStore = defineStore('candidate', {
    state: () => ({
        candidates: JSON.parse(localStorage.getItem('my-candidates')) || candidateData, 
    }),

    getters: {
        getCandidateById: (state) => {
            return (id) => state.candidates.find(c => c.id === id)
        }
    },

    actions: {
        addCandidate(newCandidate) {
            if (!newCandidate.id) {
                newCandidate.id = this.candidates.length > 0 ? Math.max(...this.candidates.map(c => c.id)) + 1 : 1;
            }
            
            this.candidates.unshift(newCandidate);
            this.saveToLocalStorage();
        },

        updateCandidate(updatedInfo) {
            const index = this.candidates.findIndex(c => c.id === updatedInfo.id);

            if (index !== -1) {
                this.candidates[index] = { ...this.candidates[index], ...updatedInfo };
                this.saveToLocalStorage();
            }
        },
        
        saveToLocalStorage() {
            localStorage.setItem('my-candidates', JSON.stringify(this.candidates));
        },
    }
})