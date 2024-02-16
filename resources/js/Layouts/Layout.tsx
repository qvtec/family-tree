import { PropsWithChildren, ReactNode } from 'react';
import { User } from '@/types';
import Navbar from '@/Components/Navbar';

export default function Layouts({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar user={user} />

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
