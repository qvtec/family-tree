import ButtonPrimary from '@/Components/ButtonPrimary'
import Input from '@/Components/Input'
import Layout from '@/Layouts/Layout'
import { PageProps } from '@/types'
import { post } from '@/utils/api'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function ContactPage({ auth }: PageProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const res = await post('/api/contact', formData)
        if (res) {
            setFormData({
                name: '',
                email: '',
                message: '',
            })
        }
    }

    return (
        <Layout user={auth.user} title="Home">
            <div className="px-4">
                <div className="my-8 p-4">
                    <div>
                        <h1 className="mb-3">お問い合わせ</h1>
                        <form onSubmit={handleSubmit}>
                            <dl>
                                <dt className="mb-2 font-semibold leading-none text-gray-900">name</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                                    <Input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        className="mt-1 block w-full"
                                        onChange={handleChange}
                                    />
                                </dd>
                            </dl>
                            <dl>
                                <dt className="mb-2 font-semibold leading-none text-gray-900">email</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                                    <Input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        className="mt-1 block w-full"
                                        onChange={handleChange}
                                    />
                                </dd>
                            </dl>
                            <dl>
                                <dt className="mb-2 font-semibold leading-none text-gray-900">message</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                                        onChange={handleChange}
                                    />
                                </dd>
                            </dl>
                            <ButtonPrimary>送信</ButtonPrimary>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
