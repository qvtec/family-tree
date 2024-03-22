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
    }, [showEdit])

    if (loading || !data) return <Loading />

    return (
        <section className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
                <p className="text-sm leading-none text-gray-500 md:text-sm">{data.yomi}</p>
                <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl">{data.name}</h2>
                <p className="mb-4 text-sm font-extrabold leading-none text-gray-900 md:text-lg">
                    {data.birth}
                    {data.death && ` ~ ${data.death}`}
                </p>

                {!showEdit ? (
                    <DetailShowPage id={id} type={type} data={data} onShowEdit={() => setShowEdit(true)} />
                ) : (
                    <DetailEditPage id={id} type={type} data={data} onHideEdit={() => setShowEdit(false)} />
                )}
            </div>
        </section>
    )
}
