export interface ToDoTask {
    id?: number,
    title: string,
    description: string,
    completed: boolean,
    categoryId?: number,
    selected?: boolean
}