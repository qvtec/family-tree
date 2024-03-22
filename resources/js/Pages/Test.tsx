import FamilyTree from '@balkangraph/familytree.js'
import { TreeType, myTextArea, treeOptions, treeTemplate } from '@/utils/tree'
import { useEffect, useState } from 'react'

import 'react-toastify/dist/ReactToastify.css'
import '../../css/main.scss'

export default function Test() {
    const [treeType, setTreeType] = useState<TreeType>(window.innerWidth > 640 ? 'vertical' : 'small')

    const data = [
        { id: 1, pids: [2], name: '祖母', gender: 'female', yomi: '', en: '', birth: '', memo: 'メモ！' },
        { id: 2, pids: [1], name: '祖父', gender: 'male' },
        { id: 3, pids: [6], mid: 1, fid: 2, name: '父', gender: 'male' },
        { id: 4, pids: [5], mid: 1, fid: 2, name: '叔父', gender: 'male' },
        { id: 5, pids: [4], name: '叔母', gender: 'female' },
        { id: 6, pids: [3], name: '母', gender: 'female' },
        { id: 7, pids: [], mid: 6, fid: 3, name: '子(父)', gender: 'male' },
        { id: 8, pids: [], mid: 5, fid: 4, name: '従妹(母)', gender: 'female' },
        { id: 9, pids: [12], mid: 8, name: '孫1', gender: 'female' }, // remove fid for Cousin marriage
        { id: 10, pids: [15], mid: 8, name: '孫2', gender: 'female' },
        { id: 11, pids: [], mid: 8, name: '孫3', gender: 'female' },
        { id: 12, pids: [9], name: '夫1', gender: 'male' },
        { id: 13, pids: [], mid: 9, fid: 12, name: '子1', gender: 'male' },
        { id: 14, pids: [], mid: 9, fid: 12, name: '子2', gender: 'female' },
        { id: 15, pids: [10], name: '夫2', gender: 'male' },
        { id: 16, pids: [], mid: 10, fid: 15, name: '子1', gender: 'male' },
        { id: 17, pids: [], mid: 10, fid: 15, name: '子2', gender: 'female' },
    ]

    function onClickDetail(id: number) {
        console.log('onClickDetail:' + id)
    }

    function changeTreeType(type: TreeType) {
        setTreeType(type)
    }

    function onClickHome() {
        location.href = '/'
    }

    useEffect(() => {
        FamilyTree.CLINK_CURVE = 0.5
        const family = new FamilyTree(document.getElementById('tree')!, {
            template: 'main',
            scaleInitial: FamilyTree.match.boundary,
            enableSearch: false,
            ...treeOptions(treeType),
            nodes: data,
            clinks: [
                { from: 9, to: 7, label: 'father', template: 'myTemplate' },
                { from: 8, to: 7, label: 'marriage', template: 'myTemplate' },
            ],
            nodeBinding: {
                field_0: 'name',
                field_1: 'yomi',
                field_2: 'birth',
                field_3: 'age',
                field_4: 'id',
                field_5: 'birthY',
            },
            editForm: {
                generateElementsFromFields: false,
                addMore: '',
                elements: [
                    { type: 'textbox', label: 'Name', binding: 'name' },
                    {
                        type: 'select',
                        options: [
                            { value: 'male', text: 'male' },
                            { value: 'female', text: 'female' },
                        ],
                        label: 'gender',
                        binding: 'gender',
                    },
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
                home: {
                    text: 'HOME',
                    onClick: onClickHome,
                },
                tree_type1: {
                    text: 'Type wide',
                    onClick: () => changeTreeType('wide'),
                },
                tree_type2: {
                    text: 'Type vertical',
                    onClick: () => changeTreeType('vertical'),
                },
                tree_type3: {
                    text: 'Type small',
                    onClick: () => changeTreeType('small'),
                },
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
            console.log(args)
        })

        family.on('field', function (sender, args) {
            if (args.name == 'birthY') {
                if ('birth' in args.data && args.data['birth']) {
                    args.value = args.data['birth'].substring(0, 4)
                }
            }
        })

        family.onInit(() => {
            // family.config.roots = id ? getRoots(data, id) : roots
            // family.load(data)
        })

        FamilyTree.templates = treeTemplate(treeType)
        FamilyTree.elements.myTextArea = myTextArea

        FamilyTree.clinkTemplates.myTemplate = {
            defs: '',
            link: '<path stroke-dasharray="4" marker-start="url(#dot)" marker-end="url(#arrow)" stroke="#aeaeae" stroke-width="2" fill="none" d="{d}" />',
            label: '<text fill="#00779e"  text-anchor="middle" x="{x}" y="{y}">{val}</text>',
        }
    }, [treeType])

    return <div className="w-full" id="tree"></div>
}
