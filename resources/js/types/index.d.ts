export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
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
    contents: string | null
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
