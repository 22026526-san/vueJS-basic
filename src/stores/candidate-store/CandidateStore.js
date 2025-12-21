import { defineStore } from 'pinia'
import candidateData from '../../data/candidate-data.js' 

export const useCandidateStore = defineStore('candidate', {
    state: () => ({
        candidates: JSON.parse(localStorage.getItem('my-candidates')) || candidateData, 
    }),

    getters: {
        saveToLocalStorage() {
            localStorage.setItem('my-candidates', JSON.stringify(this.candidates));
        },
        
        getCandidateById: (state) => {
            return (id) => state.candidates.find(c => c.id === id)
        }
    },

    actions: {
        addCandidate(newCandidate) {
            if (!newCandidate.id) {
                newCandidate.id = Math.floor(Math.random() * 100000);
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
        
        deleteCandidate(id) {
            this.candidates = this.candidates.filter(c => c.id !== id);
            this.saveToLocalStorage();
        }
    }
})