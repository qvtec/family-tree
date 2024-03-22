import TreeLayout from '@/Layouts/TreeLayout'
import { Family, FamilyTypes, PageProps } from '@/types'
import { useEffect, useState } from 'react'
import Loading from '@/Components/Loading'
import useAdmin from '@/hooks/useAdmin'
import { toast } from 'react-toastify'
import { post, get } from '@/utils/api'
import TreeComponents from '@/Components/Features/Tree/Tree'
import TreeDetail from '@/Components/Features/Tree/Detail'
import { getRoots } from '@/utils/tree'

export default function Tree({ auth, type, id }: PageProps<{ type: string; id?: number }>) {
    const isAdmin = useAdmin(auth.user)

    const [data, setData] = useState<Family[]>([])
    const [roots, setRoots] = useState<number[]>([])
    const [loading, setLoading] = useState(true)
    const [showDetailId, setShowDetailId] = useState<number | null>(null)

    const clinks: any[] = [
        // { from: 146, to: 14, label: 'mother', template: 'myTemplate' },
        { from: 145, to: 146, label: 'marriage', template: 'myTemplate' },
    ]

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const url = type == 'all' ? '/api/admin/tree-all' : `/api/tree/${type}`
        const res = await get<Family[]>(url)
        if (res) setData(res)
        await fetchFamilyType(res)
        setLoading(false)
    }

    async function fetchFamilyType(families: Family[] | undefined) {
        if (families && id) {
            setRoots(getRoots(families, id))
        } else {
            const res = await get<FamilyTypes>(`/api/family-type/${type}`)
            if (res && res.roots) {
                setRoots(res.roots)
            } else if (families) {
                setRoots(getRoots(families, auth.user.family_id))
            }
        }
    }

    function onClickDetail(id: number) {
        setShowDetailId(id)
    }

    async function updateNode(args: any) {
        if (!isAdmin) {
            toast.warn('データは保存されません。')
            return
        }

        if (type == 'all') {
            toast.warn('全データ表示では更新できません')
            return
        }

        await post(route('tree.node.update', type), args)
        if (args.addNodesData.length > 0) {
            const newUrl = new URL(window.location.href)
            newUrl.searchParams.set('id', args.updateNodesData[0].id)
            // window.location.href = newUrl.toString()
            console.log(newUrl)
            fetchData()
        }
    }

    return (
        <TreeLayout user={auth.user} title="Family Tree">
            {loading && <Loading />}
            {showDetailId && <TreeDetail id={showDetailId} type={type} />}
            {!showDetailId && !loading && (
                <TreeComponents
                    id={id}
                    type={type}
                    roots={roots}
                    data={data}
                    clinks={clinks}
                    onClickDetail={onClickDetail}
                    updateNode={updateNode}
                />
            )}
        </TreeLayout>
    )
}
