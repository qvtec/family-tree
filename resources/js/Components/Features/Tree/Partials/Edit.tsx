import { Family } from '@/types'

import { FormEvent } from 'react'
import ButtonSecondary from '@/Components/ButtonSecondary'
import ButtonPrimary from '@/Components/ButtonPrimary'
import useAdmin from '@/hooks/useAdmin'
import { post } from '@/utils/api'

interface Props {
    id: number
    type: string
    data: Family
    onHideEdit: () => void
}

export default function DetailEditPage({ id, type, data, onHideEdit }: Props) {
    // const isAdmin = useAdmin()
    const isAdmin = true

    function onClickBack() {
        onHideEdit()
    }

    function onSubmit(html: string) {
        async function postData() {
            await post(`/api/tree/${type}/${id}`, { contents: html })
            onHideEdit()
        }
        postData()
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const html = 'edit text'
        onSubmit(html)
    }

    if (!data || !isAdmin) return null

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 w-full rounded-lg border border-gray-200 bg-white">
                    <div className="flex items-center justify-between border-b px-3 py-2">
                        <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse">
                            <textarea>{data.contents}</textarea>
                        </div>
                    </div>
                </div>

                <ButtonPrimary type="submit">保存</ButtonPrimary>
            </form>
            <div className="mt-6 flex items-center space-x-4">
                <ButtonSecondary type="button" onClick={onClickBack}>
                    戻る
                </ButtonSecondary>
            </div>
        </>
    )
}
