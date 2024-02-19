import { FamilyTypes } from '@/types'
import { get } from '@/utils/api'
import { createContext, useContext, ReactNode, useEffect, useState } from 'react'

const MenuContext = createContext<FamilyTypes[]>([])

export function useMenuContext() {
    return useContext(MenuContext)
}

export function MenuProvider(props: { children: ReactNode }) {
    const [menu, setMenu] = useState<FamilyTypes[]>([])

    useEffect(() => {
        async function fetchData() {
            const res = await get<FamilyTypes[]>(`/api/user-family-type`)
            if (res) setMenu(res)
        }

        fetchData()
    }, [])

    if (menu.length == 0) return

    return <MenuContext.Provider value={menu}>{props.children}</MenuContext.Provider>
}
