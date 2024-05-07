import { Family } from '@/types'
import { useEffect, useState } from 'react'

import Loading from '@/Components/Loading'
import { get } from '@/utils/api'

import DetailEditPage from './Partials/Edit'
import DetailShowPage from './Partials/Show'

interface Props {
    id: number
    type: string
}

export default function TreeDetailComponents({ id, type }: Props) {
    const [data, setData] = useState<Family | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    const [showEdit, setShowEdit] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const res = await get<Family>(`/api/tree/${type}/${id}`)
            if (res) {
                setData(res)
                setLoading(false)
            }
        }

        fetchData()
    }, [id, showEdit, type])

    if (loading || !data) return <Loading />

    return (
        <section className="bg-white">
            {!showEdit ? (
                <DetailShowPage id={id} type={type} data={data} onShowEdit={() => setShowEdit(true)} />
            ) : (
                <DetailEditPage id={id} type={type} data={data} onHideEdit={() => setShowEdit(false)} />
            )}
        </section>
    )
}
