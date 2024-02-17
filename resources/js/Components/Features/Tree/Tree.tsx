import FamilyTree from '@balkangraph/familytree.js'
import { mytextarea, menuButton, getRoots } from '@/utils/tree'
import { Family } from '@/types'
import { useEffect } from 'react'

interface Props {
    id?: number
    type: string
    roots: number[]
    data: Family[]
    onClickDetail: (id: number) => void
    updateNode: (args: any) => void
}

export default function TreeComponents(props: Props) {
    function onClickDetail(id: number) {
        props.onClickDetail(id)
    }

    function updateNode(args: any) {
        props.updateNode(args)
    }

    useEffect(() => {
        const family = new FamilyTree(document.getElementById('tree')!, {
            template: 'main',
            // scaleInitial: FamilyTree.match.boundary,
            scaleInitial:FamilyTree.match.height,
            // orientation: FamilyTree.orientation.bottom_left,
            levelSeparation: 80,
            siblingSeparation: 20,
            subtreeSeparation: 100,
            minPartnerSeparation: 10,
            partnerChildrenSplitSeparation: 20,
            partnerNodeSeparation: 10,
            enableSearch: false,
            nodeBinding: {
                field_0: 'name',
                field_1: 'yomi',
                field_2: 'id',
                field_3: 'birthY',
            },
            editForm: {
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
            },
            menu: {
                pdf: { text: 'Export PDF' },
                png: { text: 'Export PNG' },
                svg: { text: 'Export SVG' },
                csv: { text: 'Export CSV' },
            },
        })

        family.editUI.on('button-click', function (sender, args) {
            if (args.name == 'detail') {
                const node = family.get(args.nodeId)
                onClickDetail(Number(node?.id))
            }
        })

        family.onUpdateNode((args) => {
            updateNode(args)
        })

        family.on('field', function (sender, args) {
            if (args.name == 'birthY') {
                if ('birth' in args.data && args.data['birth']) {
                    args.value = args.data['birth'].substring(0, 4)
                }
            }
        })

        family.onInit(() => {
            const {id, data, roots} = props
            family.config.roots = id ? [getRoots(data, id)] : roots
            family.load(data)
        })
    }, [])

    FamilyTree.templates.base.defs = `
        <g id="base_up">
            <circle cx="-80" cy="10" r="15" fill="#fff" stroke="#b1b9be" strokeWidth="1"></circle>
            ${FamilyTree.icon.ft(20, 80, '#b1b9be', -90, -30)}
        </g>`

    FamilyTree.templates.main = Object.assign({}, FamilyTree.templates.base)
    FamilyTree.templates.main.size = [60, 160]
    FamilyTree.templates.main.node = '<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" strokeWidth="3" stroke="#ccc" rx="5" ry="5"></rect>'

    FamilyTree.templates.main.field_0 =
        '<text data-width="130" style="font-size: 14px; writing-mode: vertical-rl; text-orientation: mixed;" fill="black" x="30" y="25" text-anchor="start">{val}</text>'
    FamilyTree.templates.main.field_1 =
        '<text data-width="130" style="font-size: 10px; writing-mode: vertical-rl; text-orientation: mixed;" fill="#b1b9be" x="44" y="25" text-anchor="start">{val}</text>'
    FamilyTree.templates.main.field_2 = '<text width="230" style="font-size: 10px;" fill="#8e969c" x="40" y="130" text-anchor="end">{val}</text>'
    FamilyTree.templates.main.field_3 = '<text width="230" style="font-size: 10px;" fill="#8e969c" x="40" y="150" text-anchor="end">{val}</text>'

    FamilyTree.templates.main_male = Object.assign({}, FamilyTree.templates.main)
    FamilyTree.templates.main_male.node =
        '<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" strokeWidth="3" stroke="#6bb4df" rx="5" ry="5"></rect>'

    FamilyTree.templates.main_female = Object.assign({}, FamilyTree.templates.main_male)
    FamilyTree.templates.main_female.node =
        '<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" strokeWidth="3" stroke="#cb4aaf" rx="5" ry="5"></rect>'

    FamilyTree.templates.main.menuButton = menuButton()

    FamilyTree.elements.myTextArea = function (data: any, editElement: any, minWidth: any, readOnly: any) {
        const id = FamilyTree.elements.generateId()
        return mytextarea(id, data, editElement, minWidth, readOnly)
    }

    return <div className="w-full" id="tree"></div>
}
