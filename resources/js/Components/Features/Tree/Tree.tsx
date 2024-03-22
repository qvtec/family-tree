import FamilyTree from '@balkangraph/familytree.js'
import { TreeType, getRoots, editFormOptions, treeOptions, treeTemplate, myTextArea } from '@/utils/tree'
import { Family } from '@/types'
import { useEffect, useState } from 'react'

interface Props {
    id?: number
    type: string
    roots: number[]
    data: Family[]
    clinks: FamilyTree.link[]
    onClickDetail: (id: number) => void
    updateNode: (args: any) => void
}

export default function TreeComponents(props: Props) {
    const [treeType, setTreeType] = useState<TreeType>(window.innerWidth > 640 ? 'vertical' : 'small')

    function onClickDetail(id: number) {
        props.onClickDetail(id)
    }

    function updateNode(args: any) {
        props.updateNode(args)
    }

    function changeTreeType(type: TreeType) {
        setTreeType(type)
    }

    function onClickHome() {
        location.href = '/'
    }

    useEffect(() => {
        FamilyTree.CLINK_CURVE = treeType == 'wide' ? -0.1 : -0.5
        const family = new FamilyTree(document.getElementById('tree')!, {
            template: 'main',
            scaleInitial: window.innerWidth > 640 ? FamilyTree.match.boundary : FamilyTree.match.height,
            enableSearch: false,
            ...treeOptions(treeType),
            nodes: props.data,
            clinks: props.clinks,
            nodeBinding: {
                field_0: 'name',
                field_1: 'yomi',
                field_2: 'birth',
                field_3: 'age',
                field_4: 'id',
                field_5: 'birthY',
            },
            editForm: editFormOptions,
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
                // pdf: { text: 'Export PDF' },
                // png: { text: 'Export PNG' },
                // svg: { text: 'Export SVG' },
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
            const { id, data, roots } = props
            if (id || roots.length > 0) {
                family.config.roots = id ? getRoots(data, id) : roots
            }
            family.load(data)
        })

        FamilyTree.templates = treeTemplate(treeType)
        FamilyTree.elements.myTextArea = myTextArea

        FamilyTree.clinkTemplates.myTemplate = {
            defs: '',
            link: '<path stroke-dasharray="4" marker-start="url(#dot)" marker-end="url(#arrow)" stroke="#aeaeae" stroke-width="2" fill="none" d="{d}" />',
            label: '<text fill="#00779e"  text-anchor="middle" x="{x}" y="{y}">{val}</text>',
        }
    }, [treeType, props.data])

    return <div className="w-full" id="tree"></div>
}
