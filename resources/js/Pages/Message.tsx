import ButtonPrimary from '@/Components/ButtonPrimary'
import Loading from '@/Components/Loading'
import Layout from '@/Layouts/Layout'
import { Message, PageProps } from '@/types'
import { get, post } from '@/utils/api'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

export default function MessagePage({ auth }: PageProps) {
    const [data, setData] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        message: '',
    })

    useEffect(() => {
        async function fetchData() {
            const res = await get<Message[]>('/api/message')
            if (res) setData(res)
            setLoading(false)
        }
        fetchData()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const res = await post<Message>('/api/message', formData, { isShow: false })
        if (res) {
            setData([res, ...data])
            setFormData({ message: '' })
        }
    }

    function reload() {
        window.location.reload()
    }

    if (loading || !data) return <Loading />

    return (
        <Layout user={auth.user} title="Home">
            <div className="-mt-8 border-r border-gray-300 md:max-w-xl md:px-4">
                <div className="my-8 p-4">
                    <div className="mb-3 w-full text-center text-sm text-gray-300 underline" onClick={reload}>
                        読み込み
                    </div>
                    {data.map((msg) => (
                        <div className="mb-4 flex items-start gap-2.5" key={msg.id}>
                            {msg.user == 1 ? (
                                <>
                                    <div className="leading-1.5 flex w-full flex-col rounded-s-xl rounded-ee-xl border-gray-200 bg-blue-100 p-4">
                                        <div
                                            className="py-2 text-sm font-normal text-gray-900"
                                            dangerouslySetInnerHTML={{ __html: msg.message.replace(/\n/g, '<br />') }}
                                        />
                                    </div>
                                    <img className="h-8 w-8 rounded-full bg-blue-300" src="/img/user.svg" alt="user" />
                                </>
                            ) : (
                                <>
                                    <img className="h-8 w-8 rounded-full bg-gray-300" src="/img/user.svg" alt="user" />
                                    <div className="leading-1.5 flex w-full flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4">
                                        <div
                                            className="py-2 text-sm font-normal text-gray-900"
                                            dangerouslySetInnerHTML={{ __html: msg.message.replace(/\n/g, '<br />') }}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <form
                className="fixed bottom-0 flex w-full border-r border-t border-gray-300 bg-white px-3 py-6 md:max-w-xl"
                onSubmit={handleSubmit}
            >
                <div className="relative w-full">
                    <textarea
                        name="message"
                        value={formData.message}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="message ..."
                        required
                        onChange={handleChange}
                    />
                </div>
                <ButtonPrimary className="ms-2 text-nowrap p-2.5">送信</ButtonPrimary>
            </form>
        </Layout>
    )
}
