import { Head, Link } from '@inertiajs/react'

export default function Login({ status }: { status: string }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-8 shadow-md sm:max-w-md sm:rounded-lg">
                <Head title="Login" />

                <Link href="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto my-2 h-20 w-20 fill-current text-gray-500"
                        height="48"
                        viewBox="0 -960 960 960"
                        width="48"
                        fill="#0e7490"
                    >
                        <path d="M40-160v-160q0-29 20.5-49.5T110-390h141q17 0 32.5 8.5T310-358q29 42 74 65t96 23q51 0 96-23t75-65q11-15 26-23.5t32-8.5h141q29 0 49.5 20.5T920-320v160H660v-119q-36 33-82.5 51T480-210q-51 0-97-18t-83-51v119H40Zm440-170q-35 0-67.5-16.5T360-392q-16-23-38.5-37T273-448q29-30 91-46t116-16q54 0 116.5 16t91.5 46q-26 5-48.5 19T601-392q-20 29-52.5 45.5T480-330ZM160-460q-45 0-77.5-32.5T50-570q0-46 32.5-78t77.5-32q46 0 78 32t32 78q0 45-32 77.5T160-460Zm640 0q-45 0-77.5-32.5T690-570q0-46 32.5-78t77.5-32q46 0 78 32t32 78q0 45-32 77.5T800-460ZM480-580q-45 0-77.5-32.5T370-690q0-46 32.5-78t77.5-32q46 0 78 32t32 78q0 45-32 77.5T480-580Z" />
                    </svg>
                </Link>

                <div className="flex items-center justify-center">
                    <a href={route('google.login')} className="inline-flex items-center">
                        <img
                            src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
                            className="ml-2"
                        />
                    </a>
                </div>
                {status == 'pending' && (
                    <div className="mt-4 text-center text-gray-500">管理者の承認をお待ちください</div>
                )}
            </div>
        </div>
    )
}
