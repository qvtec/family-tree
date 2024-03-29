import { InputHTMLAttributes } from 'react'

export default function RadioButton({
    id,
    name,
    value,
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <>
            <input
                {...props}
                id={id}
                type="radio"
                value={value}
                name={name}
                className={'h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 ' + className}
            />
        </>
    )
}
