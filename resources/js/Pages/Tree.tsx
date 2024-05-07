import FamilyChartComponent from '@/Components/Features/FamilyChart/FamilyChart'
import Loading from '@/Components/Loading'
import TreeLayout from '@/Layouts/TreeLayout'
import { FamilyChart, PageProps } from '@/types'
import { get } from '@/utils/api'
import { useEffect, useState } from 'react'

export default function FamilyTreePage({ auth, type, id }: PageProps<{ type: string; id?: number }>) {
    const [data, setData] = useState<FamilyChart[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const url = type == 'all' ? '/api/admin/tree-all' : `/api/tree/${type}`
            const res = await get<FamilyChart[]>(url)
            if (res) setData(res)
            setLoading(false)
        }
        fetchData()
    }, [])

    if (loading || !data) return <Loading />

    return (
        <TreeLayout user={auth.user} title="Family Tree">
            <FamilyChartComponent id={id} type={type} data={data} />
        </TreeLayout>
    )
}
