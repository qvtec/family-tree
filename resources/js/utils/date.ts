import { format } from 'date-fns'

/**
 * now
 */
export function now(pattern = 'yyyy-MM-dd HH:mm:ss') {
    const date = new Date()
    return format(date, pattern)
}

/**
 * formatDate
 */
export function formatDate(value: string, pattern = 'yyyy-MM-dd') {
    const date = new Date(value)
    return format(date, pattern)
}

/**
 * formatDateTime
 */
export function formatDateTime(value: string, pattern = 'yyyy-MM-dd HH:mm:ss') {
    return formatDate(value, pattern)
}

/**
 * 年齢
 *
 * @param birthday
 * @returns
 */
export function calculateAge(birthday: string) {
    const birthDate = new Date(birthday.replace(/\?/g, ''))
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }

    return age
}
