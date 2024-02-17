import Layout from '@/Layouts/Layout'
import { Family, PageProps } from '@/types'
import { useEffect, useState } from 'react'
import Loading from '@/Components/Loading'
import useAdmin from '@/hooks/useAdmin'
import { toast } from 'react-toastify'
import { post, get } from '@/utils/api'
import TreeComponents from '@/Components/Features/Tree/Tree'
import TreeDetailComponents from '@/Components/Features/Tree/Detail'

export default function Tree({ auth, roots, type, tid }: PageProps<{ roots: number[], type: string, tid?: number }>) {
    const isAdmin = useAdmin(auth.user)

    const [data, setData] = useState<Family[]>([])
    const [loading, setLoading] = useState(true)
    const [showDetailId, setShowDetailId] = useState<number | null>(null)

    useEffect(() => {
      async function fetchData() {
        const res = await get<Family[]>(`/api/tree/${type}`)
        if (res) setData(res)
      }
      fetchData()
      setLoading(false)
    }, [])

    function onClickDetail(id: number) {
        // router.push(`/tree/${type}/${tid}`)
        console.log('detail push')
        console.log(route('tree.show', {type: type, id: id}))
        setShowDetailId(id)
    }

    async function updateNode(args: any) {
        console.log('update Node')
        if (!isAdmin) {
            toast.warn('データは保存されません。')
            return
        }

        if (type == 'all') {
            toast.warn('全データ表示では更新できません')
            return
        }

        // await post(`/api/tree/${type}`, args)
    }

    return (
        <Layout user={auth.user} title="Family Tree">
            {loading && <Loading />}
            { showDetailId && <TreeDetailComponents id={showDetailId} type={type} />}
            { !showDetailId && data.length > 0 && <TreeComponents id={tid} type={type} roots={roots} data={data} onClickDetail={onClickDetail} updateNode={updateNode} /> }
        </Layout>
    );
}
