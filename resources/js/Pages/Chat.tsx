import Layout from '@/Layouts/Layout'
import { PageProps } from '@/types'

export default function ChatPage({ auth }: PageProps) {
    return (
        <Layout user={auth.user} title="Home">
            <div className="px-4">
                <div className="my-8 p-4">チャット</div>
            </div>
        </Layout>
    )
}
