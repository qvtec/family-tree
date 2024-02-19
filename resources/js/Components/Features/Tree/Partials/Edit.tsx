import { Family } from '@/types'

import { useEffect, useState } from 'react'
import ButtonSecondary from '@/Components/ButtonSecondary'
import ButtonPrimary from '@/Components/ButtonPrimary'
import { api } from '@/utils/api'

import Quill from 'quill'
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],

    ['link', 'image', 'video'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    ['blockquote', 'code-block'],

    ['clean'],                                         // remove formatting button
]

interface Props {
    id: number
    type: string
    data: Family
    onHideEdit: () => void
}

export default function DetailEditPage({ id, type, data, onHideEdit }: Props) {
    const [editorText, setEditorText] = useState('')

    useEffect(() => {
        const quill = new Quill('#editor', {
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: 'Enter text...',
            theme: 'snow'
        })

        quill.on('text-change', () => {
            const html = quill.getSemanticHTML()
            setEditorText(html)

            const images = quill.root.querySelectorAll('img')
            images.forEach((image) => {
                if (!image.src.startsWith(route('image.get', ''))) {
                    const formData = new FormData()
                    formData.append('image', image.src)
                    uploadImage(formData, image)
                    return
                }
            })
        })
    }, [])

    function onClickBack() {
        onHideEdit()
    }

    function handleSubmit() {
        async function postData() {
            await api(route('admin.tree.update', id), { method: 'PUT', body: { contents: editorText } })
            onHideEdit()
        }
        postData()
    }

    function uploadImage(formData: FormData, image: HTMLImageElement) {
        fetch(route('admin.upload.image'), {
            method: 'POST',
            body: formData
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.success) {
                const uploadedImageUrl = data.image_url
                image.setAttribute('src', uploadedImageUrl)
            } else {
                alert('画像のアップロードに失敗しました...')
            }
        })
        .catch(() => {
            alert('通信エラーが発生しました')
        })
    }

    if (!data) return null

    return (
        <>
            <div className="mb-4 w-full bg-white">
                <div id="editor" dangerouslySetInnerHTML={{ __html: data.contents ?? '' }} />
            </div>
            <ButtonPrimary type="button" onClick={handleSubmit}>
                保存
            </ButtonPrimary>
            <div className="mt-6 flex items-center space-x-4">
                <ButtonSecondary type="button" onClick={onClickBack}>
                    戻る
                </ButtonSecondary>
            </div>
        </>
    )
}
