import FamilyTree from '@balkangraph/familytree.js'
import { TreeType, getRoots, editFormOptions, treeOptions, treeTemplate, myTextArea } from '@/utils/tree'
import { Family } from '@/types'
import { useEffect, useState } from 'react'

interface Props {
    id?: number
    type: string
    roots: number[]
    data: Family[]
    onClickDetail: (id: number) => void
    updateNode: (args: any) => void
}

export default function TreeComponents(props: Props) {
    const [treeType, setTreeType] = useState<TreeType>('vertical')

    function onClickDetail(id: number) {
        props.onClickDetail(id)
    }

    function updateNode(args: any) {
        props.updateNode(args)
    }

    useEffect(() => {
        const family = new FamilyTree(document.getElementById('tree')!, {
            template: 'main',
            scaleInitial:FamilyTree.match.height,
            enableSearch: false,
            ...treeOptions(treeType),
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
                tree_type: {
                    text: "Change Tree Type",
                    onClick: changeTreeType
                },
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

        function changeTreeType() {
            setTreeType(treeType == 'vertical' ? 'wide' : 'vertical')
        }

        FamilyTree.templates = treeTemplate(treeType)
        FamilyTree.elements.myTextArea = function (data: any, editElement: any, readOnly: any) {
            return myTextArea(data, editElement, readOnly)
        }
    }, [treeType])

    return <div className="w-full" id="tree"></div>
}
