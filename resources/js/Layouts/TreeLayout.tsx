import { PropsWithChildren } from 'react'
import { Head } from '@inertiajs/react'
import { User } from '@/types'
import Navbar from '@/Components/Navbar'
import { ToastContainer, Slide } from 'react-toastify'
import { MenuProvider } from '@/providers/MenuProvider'

import 'react-toastify/dist/ReactToastify.css'
import '../../css/main.scss'

export default function TreeLayout({ user, title, children }: PropsWithChildren<{ user: User; title?: string }>) {
    return (
        <div className="min-h-screen">
            <MenuProvider>
                <Navbar user={user} className="hidden sm:block" />
                <Head title={title} />
                <main className="sm:pt-12">{children}</main>
                <ToastContainer transition={Slide} />
            </MenuProvider>
        </div>
    )
}
