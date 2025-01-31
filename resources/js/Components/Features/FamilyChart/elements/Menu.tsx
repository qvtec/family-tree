import { Menu, Transition } from '@headlessui/react'
import { Link } from '@inertiajs/react'
import { Fragment, useEffect, useState } from 'react'
import { TreeType } from '../FamilyChart'
import { useMenuContext } from '@/providers/MenuProvider'
import { User } from '@/types'

interface MenuProps {
    user: User
    type: string
    changeTreeType: (treeType: TreeType) => void
}

export default function MenuComponent({ user, type, changeTreeType }: MenuProps) {
    const [roots, setRoots] = useState<number[]>([])
    const menu = useMenuContext()

    useEffect(() => {
        const roots = menu.find((item) => item.type == type)?.roots ?? []
        setRoots(roots)
    }, [menu, type])

    function showLoaction(id: number | null) {
        if (id && Number(id) > 0) {
            const currentUrl = new URL(window.location.href)
            currentUrl.searchParams.set('id', id.toString())
            window.location.href = currentUrl.toString()
        }
    }

    return (
        <div className="fixed right-4 top-16 w-56 text-right md:right-10 md:top-16">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        Options
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link href="/">
                                        <button
                                            className={`${
                                                active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            HOME
                                        </button>
                                    </Link>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => changeTreeType('wide')}
                                    >
                                        Wide Tree
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => changeTreeType('vertical')}
                                    >
                                        Vertical Tree
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => showLoaction(roots[0])}
                                    >
                                        Show roots
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => showLoaction(user.family_id)}
                                    >
                                        Show me
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
