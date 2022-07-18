import { defineStore } from 'pinia'

interface State {
    list: any[]
}

export const useList = defineStore({
    id: 'test',
    state: (): State => {
        return {
            list: []
        }
    },
    actions: {
        setList(list: any[]) {
            this.list = list
        }
    }
})
