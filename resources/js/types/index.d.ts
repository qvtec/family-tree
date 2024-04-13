export interface User {
    id: number
    name: string
    email: string
    role: string
    family_id: number
    types: string[]
    created_at: string
    updated_at: string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User
    }
}

export interface FamilyTypes {
    id: number
    name: string
    type: string
    roots: number[]
}

export interface Family {
    id: string
    types: string[]
    fid: string | null
    mid: string | null
    pids: string[]
    name: string
    yomi: string | null
    en: string | null
    gender: string | null
    birth: string | null
    birthFixed: boolean
    death: string | null
    deathFixed: boolean
    relation: string | null
    memo: string | null
    tags: string[]
    contents?: FamilyContents | null
}

export interface FamilyContents {
    id: number
    family_id: number
    contents: string
}

export interface FamilyChart {
    id: string
    rels: FamilyChartRels
    data: FamilyChartData
}

export interface FamilyChartRels {
    spouses?: string[]
    father?: string
    mother?: string
    children?: string[]
}

export interface FamilyChartData {
    first_name: string
    last_name: string
    birthday: string
    avatar: string
    gender: string
    contents_exist: boolean
}
