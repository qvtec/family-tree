import { Family } from '@/types'

import ButtonDanger from '@/Components/ButtonDanger'
import ButtonPrimary from '@/Components/ButtonPrimary'
import { remove } from '@/utils/api'

import './quill-editor.scss'

interface Props {
    id: number
    type: string
    data: Family
    onShowEdit: () => void
}

export default function DetailShowPage({ id, type, data, onShowEdit }: Props) {
    function onClickShowEdit() {
        onShowEdit()
    }

    function onClickDelete() {
        async function removeData() {
            await remove(route('admin.tree.destroy', id))
        }
        const isConfirmed = window.confirm('本当に削除しますか？')
        if (isConfirmed) {
            removeData()
        }
    }

    if (!data) return

    return (
        <>
            <p className="mb-4 text-sm font-extrabold leading-none text-gray-900 md:text-lg">
                {data.birth}
                {data.death && ` ~ ${data.death}`}
            </p>
            <dl className="flex items-center space-x-6">
                <div>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5">{data.gender ?? '不明'}</dd>
                </div>
                <div>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5">{data.en}</dd>
                </div>
            </dl>
            <dl>
                <dt className="mb-2 font-semibold leading-none text-gray-900">概要</dt>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5">{data.memo}</dd>
            </dl>
            <dl>
                <dt className="mb-2 font-semibold leading-none text-gray-900">詳細</dt>
                <dd className="ql-snow mb-4 font-light sm:mb-5">
                    <div
                        className="editor-contents ql-editor"
                        dangerouslySetInnerHTML={{ __html: data.contents?.contents ?? '' }}
                    />
                </dd>
            </dl>
            <div className="flex items-center space-x-4">
                <ButtonPrimary onClick={onClickShowEdit}>
                    <svg
                        aria-hidden="true"
                        className="-ml-1 mr-1 h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                        <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    Edit
                </ButtonPrimary>
                <ButtonDanger onClick={onClickDelete}>
                    <svg
                        aria-hidden="true"
                        className="-ml-1 mr-1.5 h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    Delete
                </ButtonDanger>
            </div>
        </>
    )
}
