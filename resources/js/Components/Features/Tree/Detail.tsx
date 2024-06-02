import { Family } from '@/types'
import { useEffect, useState } from 'react'

import Loading from '@/Components/Loading'
import { get, post } from '@/utils/api'

import DetailEditPage from './Partials/Edit'
import DetailShowPage from './Partials/Show'
import { CardEditProps } from '../FamilyChart/FamilyChart'
import { FamilyChart } from '@/types'

interface Props {
    cardEditProps: CardEditProps
    type: string
}

export default function TreeDetailComponents({ cardEditProps, type }: Props) {
    const [data, setData] = useState<Family | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    const [showEdit, setShowEdit] = useState(false)
    const [id, setId] = useState(Number(cardEditProps.datum.id) || 0)

    useEffect(() => {
        async function fetchData() {
            if (id > 0) {
                console.log('Detail')
                const res = await get<Family>(`/api/tree/${type}/${id}`)
                if (res) {
                    setData(res)
                    setLoading(false)
                }
            } else {
                console.log('Add')
                const { mid, fid, pids, children } = cardEditProps.rel_datum
                    ? getRels(cardEditProps.rel_datum)
                    : { mid: null, fid: null, pids: [], children: null }

                const res = await post<Family>(
                    `/api/tree/${type}`,
                    {
                        name: '未設定',
                        types: [type],
                        gender: cardEditProps.datum.data.gender,
                        fid: fid,
                        mid: mid,
                        pids: pids,
                        children: children,
                    },
                    { isShow: false },
                )
                if (res) {
                    setData(res)
                    setId(Number(res.id))
                    setShowEdit(true)
                    setLoading(false)
                }
            }
        }

        function getRels(data: FamilyChart) {
            const rels = data.rels
            let mid = null
            let fid = null
            let pids: number[] = []
            let children = null
            switch (cardEditProps.rel_type) {
                case 'son':
                    mid = data.id
                    fid = rels.spouses && rels.spouses.length > 0 ? rels.spouses[0] : []
                    return { mid, fid }
                case 'daughter':
                    mid = rels.spouses && rels.spouses.length > 0 ? rels.spouses[0] : []
                    fid = data.id
                    break
                case 'spouses':
                    pids = [Number(data.id)]
                    break
                case 'mother':
                case 'father':
                    children = data.id
                    break
                default:
                    break
            }
            return { mid, fid, pids, children }
        }

        fetchData()
    }, [cardEditProps, id, type])

    if (loading || !data) return <Loading />

    return (
        <section className="bg-white">
            {!showEdit ? (
                <DetailShowPage id={id} type={type} data={data} onShowEdit={() => setShowEdit(true)} />
            ) : (
                <DetailEditPage id={id} data={data} onHideEdit={() => setShowEdit(false)} />
            )}
        </section>
    )
}
