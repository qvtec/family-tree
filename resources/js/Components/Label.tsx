import { LabelHTMLAttributes } from 'react'

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
    className?: string
    children: React.ReactNode
}

export default function Label({ className = '', children, ...props }: Props) {
    return (
        <label className={`${className} block text-sm font-medium text-gray-700`} {...props}>
            {children}
        </label>
    )
}
