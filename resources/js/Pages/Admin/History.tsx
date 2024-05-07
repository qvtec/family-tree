import Layout from '@/Layouts/Layout'
import { PageProps, History } from '@/types'

import Loading from '@/Components/Loading'
import { get } from '@/utils/api'
import { formatDateTime } from '@/utils/date'
import { useEffect, useState } from 'react'

export default function HitoryPage({ auth }: PageProps) {
    const [data, setData] = useState<History[] | undefined>()
    const [loading, setLoading] = useState(true)
    const [expand, setExpand] = useState<number | undefined>()

    useEffect(() => {
        async function fetchData() {
            const res = await get<History[]>(`/api/admin/history`)
            if (res) {
                setData(res)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    function truncateText(text: string, i: number) {
        if (expand == i) return text
        const maxLength = 100
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...'
        }
        return text
    }

    function toggleExpand(i: number) {
        if (expand == i) {
            setExpand(undefined)
        } else {
            setExpand(i)
        }
    }

    if (loading || !data) return <Loading />

    return (
        <Layout user={auth.user} title="User">
            <div className="mx-auto max-w-7xl px-4 py-8 lg:py-16">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
                        <thead className="bg-gray-50 text-xs font-medium text-gray-900">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    family
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    changes
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    user
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user, i) => (
                                <tr key={i}>
                                    <td className="text-nowrap px-6 py-4">
                                        {formatDateTime(user.created_at.toLocaleString(), 'yyyy-MM-dd HH:mm')}
                                    </td>
                                    <td className="px-6 py-4">{user.family_id}</td>
                                    <td className="px-6 py-4" onClick={() => toggleExpand(i)}>
                                        {truncateText(user.changes, i)}
                                    </td>
                                    <td className="px-6 py-4">{user.user_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="float-right mt-4 text-sm text-gray-500">{data.length}件</div>
            </div>
        </Layout>
    )
}
