import { Family } from '@/types'
import FamilyTree from '@balkangraph/familytree.js'

export type TreeType = 'vertical' | 'wide' | 'small'

interface MyObject {
    [key: string]: any
}

/**
 * メニューボタンHTML
 *
 * @returns string
 */
export function menuButton() {
    return `<div style="position:absolute;right:{p}px;top:{p}px;" data-ctrl-menu="">
    <Image src="/img/settings.svg" alt="" className="w-5 h-5" width={25} height={25} priority />
    </div>`
}

/**
 * VerticalTree BaseDefs
 *
 * @returns string
 */
export const verticalDefs = `
    <g id="base_up">
        <circle cx="-80" cy="10" r="15" fill="#fff" stroke="#b1b9be" strokeWidth="1"></circle>
        ${FamilyTree.icon.ft(20, 80, '#b1b9be', -90, -30)}
    </g>`

/**
 * SmallVerticalTree BaseDefs
 *
 * @returns string
 */
export const smallVerticalDefs = `
    <g id="base_up">
        <circle cx="-90" cy="0" r="15" fill="#fff" stroke="#b1b9be" strokeWidth="1"></circle>
        ${FamilyTree.icon.ft(20, 80, '#b1b9be', -100, -40)}
    </g>`

/**
 * WideTree BaseDefs
 *
 * @returns string
 */
export const wideDefs = `
    <g style="cursor: pointer;" id="base_tree_menu">
        <rect x="0" y="0" width="25" height="25" fill="transparent"></rect>
        ${FamilyTree.icon.addUser(25, 25, '#b1b9be', 0, 0)}
    </g>`

export function treeOptions(treeType: TreeType) {
    if (treeType == 'wide') {
        return wideOptions
    } else if (treeType == 'small') {
        return smallVerticalOptions
    } else {
        return verticalOptions
    }
}

/**
 * VerticalTree Options
 *
 * @returns string
 */
export const verticalOptions = {
    levelSeparation: 80,
    siblingSeparation: 20,
    subtreeSeparation: 100,
    minPartnerSeparation: 10,
    partnerChildrenSplitSeparation: 20,
    partnerNodeSeparation: 10,
}

/**
 * SmallVerticalTree Options
 *
 * @returns string
 */
export const smallVerticalOptions = {
    ...verticalOptions,
    levelSeparation: 120,
}

/**
 * WideTree Options
 *
 * @returns string
 */
export const wideOptions = {
    levelSeparation: 80,
    siblingSeparation: 20,
    subtreeSeparation: 70,
    nodeTreeMenu: true,
}

export const editFormOptions = {
    generateElementsFromFields: false,
    elements: [
        { type: 'textbox', label: 'Name', binding: 'name' },
        { type: 'textbox', label: 'Yomi', binding: 'yomi' },
        { type: 'textbox', label: 'English', binding: 'en' },
        {
            type: 'select',
            options: [
                { value: 'male', text: 'male' },
                { value: 'female', text: 'female' },
            ],
            label: 'gender',
            binding: 'gender',
        },
        { type: 'date', label: 'Birth Date', binding: 'birth' },
        { type: 'date', label: 'Death Date', binding: 'death' },
        { type: 'myTextArea', label: 'メモ', binding: 'memo' },
    ],
    buttons: {
        detail: {
            icon: FamilyTree.icon.details(24, 24, '#fff'),
            text: 'Detail',
        },
        edit: {
            icon: FamilyTree.icon.edit(24, 24, '#fff'),
            text: 'Edit',
        },
        share: null,
        pdf: null,
        remove: null,
    },
}

export function treeTemplate(treeType: TreeType) {
    switch (treeType) {
        case 'vertical':
            FamilyTree.templates.base.defs = verticalDefs

            FamilyTree.templates.main = Object.assign({}, FamilyTree.templates.base)
            FamilyTree.templates.main.size = [60, 160]
            FamilyTree.templates.main.node =
                '<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" strokeWidth="3" stroke="#ccc" rx="5" ry="5"></rect>'

            // name
            FamilyTree.templates.main.field_0 =
                '<text data-width="130" style="font-size: 14px; writing-mode: vertical-rl; text-orientation: mixed;" fill="black" x="30" y="25" text-anchor="start">{val}</text>'
            // yomi
            FamilyTree.templates.main.field_1 =
                '<text data-width="130" style="font-size: 10px; writing-mode: vertical-rl; text-orientation: mixed;" fill="#b1b9be" x="44" y="25" text-anchor="start">{val}</text>'
            // birthY
            FamilyTree.templates.main.field_5 =
                '<text width="230" style="font-size: 10px;" fill="#8e969c" x="40" y="150" text-anchor="end">{val}</text>'
            break
        case 'small':
            FamilyTree.templates.base.defs = smallVerticalDefs

            FamilyTree.templates.main = Object.assign({}, FamilyTree.templates.base)
            FamilyTree.templates.main.size = [40, 120]
            FamilyTree.templates.main.node =
                '<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" strokeWidth="3" stroke="#ccc" rx="5" ry="5"></rect>'

            // name
            FamilyTree.templates.main.field_0 =
                '<text data-width="130" style="font-size: 14px; writing-mode: vertical-rl; text-orientation: mixed;" fill="black" x="20" y="10" text-anchor="start">{val}</text>'
            break
        default:
            FamilyTree.templates.base.defs = wideDefs

            FamilyTree.templates.main = Object.assign({}, FamilyTree.templates.base)
            FamilyTree.templates.main.node =
                '<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" strokeWidth="3" stroke="#ccc" rx="5" ry="5"></rect>'

            // name
            FamilyTree.templates.main.field_0 =
                '<text width="230" style="font-size: 14px;" fill="black" x="125" y="90" text-anchor="middle">{val}</text>'
            // yomi
            FamilyTree.templates.main.field_1 =
                '<text width="230" style="font-size: 10px;" fill="#8e969c" x="125" y="70" text-anchor="middle">{val}</text>'
            // birth
            FamilyTree.templates.main.field_2 =
                '<text width="230" style="font-size: 10px;" fill="#8e969c" x="230" y="30" text-anchor="end">{val}</text>'
            // age
            FamilyTree.templates.main.field_3 =
                '<text width="230" style="font-size: 10px;" fill="#8e969c" x="230" y="40" text-anchor="end">{val}</text>'
            // id
            FamilyTree.templates.main.field_4 =
                '<text width="230" style="font-size: 10px;" fill="#8e969c" x="230" y="105" text-anchor="end">{val}</text>'
    }

    FamilyTree.templates.main_male = Object.assign({}, FamilyTree.templates.main)
    FamilyTree.templates.main_male.node =
        '<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" strokeWidth="3" stroke="#6bb4df" rx="5" ry="5"></rect>'

    FamilyTree.templates.main_female = Object.assign({}, FamilyTree.templates.main_male)
    FamilyTree.templates.main_female.node =
        '<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" strokeWidth="3" stroke="#cb4aaf" rx="5" ry="5"></rect>'

    FamilyTree.templates.main.menuButton = menuButton()

    return FamilyTree.templates
}

/**
 * 詳細表示のテキストエリア
 *
 * @param id
 * @param data
 * @param editElement
 * @param minWidth
 * @param readOnly
 * @returns
 */
export function myTextArea(data: MyObject, editElement: FamilyTree.editFormElement, w: string, readOnly: boolean) {
    const id = FamilyTree.elements.generateId()
    const key = editElement.binding ?? ''
    if (key in data) {
        const value = data[key]
        // if (readOnly && !value) return { html: '' }
        const rOnlyAttr = readOnly ? 'readonly' : ''
        const rDisabledAttr = readOnly ? 'disabled' : ''

        const html = `<div class="bft-form-field" style="min-width: 280px;">
            <div class="bft-input">
                <label for="${id}" class="hasval">${editElement.label}</label>
                <textarea ${rDisabledAttr} ${rOnlyAttr} id="${id}" name="${id}" data-binding="${editElement.binding}" rows="4" class="block p-2.5 pt-6 w-full text-sm text-gray-700 rounded border border-gray-300">${value}</textarea>
            </div>
        </div>`

        return { html, id, value }
    }
    return { html: '' }
}

/**
 * roots親ID取得
 *
 * @param id
 * @param family
 * @returns
 */
export function getRoots(data: Family[], id: number) {
    let node = getNode(data, id.toString())
    if (!node) return []

    let cnt = 0
    while (node) {
        let targetId = node.fid ?? node.mid ?? ''

        if (!targetId && node.pids.length > 0) {
            // 親情報なしなら夫婦情報を取得し、相手の親情報もなければbreak
            targetId = node.pids[node.pids.length - 1]
            const pNode = getNode(data, targetId)
            if (!pNode?.fid && !pNode?.mid) {
                break
            }
        }

        if (!getNode(data, targetId)) {
            break
        }
        node = getNode(data, targetId)
        ++cnt
        if (cnt > 10) break
    }
    if (!node) return []
    return [Number(node.id)]
}

function getNode(data: Family[], id: string) {
    return data.find((obj) => obj.id == id)
}
