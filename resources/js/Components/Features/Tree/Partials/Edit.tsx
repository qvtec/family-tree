import { Family } from '@/types'

import { ChangeEvent, useEffect, useState } from 'react'
import ButtonSecondary from '@/Components/ButtonSecondary'
import ButtonPrimary from '@/Components/ButtonPrimary'
import { api } from '@/utils/api'

import Quill from 'quill'
// import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import './quill-editor.scss'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import RadioButton from '@/Components/RadioButton'

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],

    ['link', 'image', 'video'],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction
    ['blockquote', 'code-block'],

    ['clean'], // remove formatting button
]

interface Props {
    id: number
    type: string
    data: Family
    onHideEdit: () => void
}

export default function DetailEditPage({ id, type, data, onHideEdit }: Props) {
    const [editorText, setEditorText] = useState('')
    const [editForm, setEditForm] = useState({
        name: data.name,
        yomi: data.yomi,
        birth: data.birth,
        death: data.death,
        gender: data.gender,
        en: data.en,
        memo: data.memo,
    })

    useEffect(() => {
        const quill = new Quill('#editor', {
            modules: {
                toolbar: toolbarOptions,
            },
            placeholder: 'Enter text...',
            theme: 'snow',
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
            const body = {
                ...editForm,
                contents: editorText,
            }
            await api(route('admin.tree.update', id), { method: 'PUT', body })
            onHideEdit()
        }
        postData()
    }

    function uploadImage(formData: FormData, image: HTMLImageElement) {
        fetch(route('admin.upload.image'), {
            method: 'POST',
            body: formData,
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

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setEditForm({ ...editForm, [name]: value })
    }

    if (!data) return null

    return (
        <>
            <dl>
                <dt className="mb-2 font-semibold leading-none text-gray-900">name</dt>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                    <Input
                        type="text"
                        name="name"
                        value={editForm?.name ?? ''}
                        className="mt-1 block w-full"
                        onChange={handleInputChange}
                    />
                </dd>
            </dl>
            <dl>
                <dt className="mb-2 font-semibold leading-none text-gray-900">yomi</dt>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                    <Input
                        type="text"
                        name="yomi"
                        value={editForm?.yomi ?? ''}
                        className="mt-1 block w-full"
                        onChange={handleInputChange}
                    />
                </dd>
            </dl>
            <dl>
                <dt className="mb-2 font-semibold leading-none text-gray-900">en</dt>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                    <Input
                        type="text"
                        name="en"
                        value={editForm?.en ?? ''}
                        className="mt-1 block w-full"
                        onChange={handleInputChange}
                    />
                </dd>
            </dl>
            <dl className="flex items-center space-x-6">
                <div>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                        <Label htmlFor="birth">birth</Label>
                        <Input
                            type="text"
                            name="birth"
                            value={editForm?.birth ?? ''}
                            className="mt-1 block w-full"
                            onChange={handleInputChange}
                        />
                    </dd>
                </div>
                <div>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                        <Label htmlFor="death">death</Label>
                        <Input
                            type="text"
                            name="death"
                            value={editForm?.death ?? ''}
                            className="mt-1 block w-full"
                            onChange={handleInputChange}
                        />
                    </dd>
                </div>
            </dl>
            <dl className="flex items-center space-x-6">
                <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                    <Label htmlFor="role">Gender</Label>
                    <div className="mb-4 flex items-center">
                        <div className="mr-4">
                            <RadioButton
                                id="genderM"
                                value="M"
                                name="gender"
                                checked={editForm?.gender == 'M'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="genderM" className="ms-2 text-sm font-medium text-gray-900">
                                male
                            </label>
                        </div>
                        <div className="mr-4">
                            <RadioButton
                                id="genderF"
                                value="F"
                                name="gender"
                                checked={editForm?.gender == 'F'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="genderF" className="ms-2 text-sm font-medium text-gray-900">
                                female
                            </label>
                        </div>
                        <div className="mr-4">
                            <RadioButton
                                id="genderO"
                                value="O"
                                name="gender"
                                checked={editForm?.gender == 'O'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="genderO" className="ms-2 text-sm font-medium text-gray-900">
                                other
                            </label>
                        </div>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt className="mb-2 font-semibold leading-none text-gray-900">概要</dt>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                    <Input
                        type="text"
                        name="memo"
                        value={editForm?.memo ?? ''}
                        className="mt-1 block w-full"
                        onChange={handleInputChange}
                    />
                </dd>
            </dl>
            <dl>
                <dt className="mb-2 font-semibold leading-none text-gray-900">詳細</dt>
                <dd className="ql-snow mb-4 font-light sm:mb-5">
                    <div id="editor" dangerouslySetInnerHTML={{ __html: data.contents?.contents ?? '' }} />
                </dd>
            </dl>
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
