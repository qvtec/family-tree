import { PropsWithChildren } from 'react'
import { Head } from '@inertiajs/react'
import { User } from '@/types'
import Navbar from '@/Components/Navbar'
import { ToastContainer, Slide } from 'react-toastify'
import { MenuProvider } from '@/providers/MenuProvider'

import 'react-toastify/dist/ReactToastify.css'
import '../../css/main.scss'

export default function Layouts({ user, title, children }: PropsWithChildren<{ user: User; title?: string }>) {
    return (
        <div className="min-h-screen">
            <MenuProvider>
                <Navbar user={user} />
                <Head title={title} />
                <main className="pt-14 md:pt-12">{children}</main>
                <ToastContainer transition={Slide} />
            </MenuProvider>
        </div>
    )
}
