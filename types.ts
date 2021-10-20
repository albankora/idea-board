type IdeaType = {
    id?: number
    description: string
    title: string
    references: Array<string>
    done: boolean
}

export type BasicIdeaType = Pick<IdeaType, "title" | "description">

export type ToDoType = Pick<IdeaType, "title" | "description"> & {
    done: boolean
}

export type ConceptType = Pick<IdeaType, "title" | "description" | "references"> & {
    done?: boolean
}

export type UpdateType = Partial<IdeaType>

export type Props = {
    type: string
    notifyOnUpdate: Array<string>
}
