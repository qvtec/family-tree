import { useEffect, useRef, useState } from 'react'
import f3 from 'family-chart/dist/family-chart'
import { FamilyChart } from '@/types'
import { CardEditProps, Form } from './elements/Form'
import Modal from '@/Components/Modal'

import './family-chart.scss'
import MenuComponent from './elements/Menu'
import { DetailIcon, PlusIcon } from './elements/Icon'

export type TreeType = 'wide' | 'vertical'

interface Props {
    id?: number
    type: string
    data: FamilyChart[]
    onClickDetail: (id: number) => void
}

export default function FamilyChartComponent(props: Props) {
    const cont = useRef<HTMLDivElement>(null)
    const [showEdit, setShowEdit] = useState(false)
    const [treeType, setTreeType] = useState<TreeType>('vertical')
    const [selected, setSelected] = useState<CardEditProps>()

    const cardDisplay = getCardDisplay()
    const cardEdit = getCardEditParams()

    useEffect(() => {
        if (cont.current === null || props.data.length == 0) return

        let cardDim = { w: 40, h: 160, text_x: 8, text_y: 5, img_w: 0, img_h: 0, img_x: 0, img_y: 0 }
        let separation = { node: 80, level: 200 }
        let editIcon = DetailIcon({ cardDim, x: cardDim.w - 28, y: cardDim.h - 24 }).template
        let addIcon = PlusIcon({ cardDim, x: cardDim.w - 26, y: cardDim.h - 20 }).template
        switch (treeType) {
            case 'wide':
                cardDim = { w: 220, h: 70, text_x: 75, text_y: 15, img_w: 60, img_h: 60, img_x: 5, img_y: 5 }
                separation = { node: 250, level: 150 }
                editIcon = DetailIcon({ cardDim, x: cardDim.w - 52, y: cardDim.h - 24 }).template
                addIcon = PlusIcon({ cardDim, x: cardDim.w - 26, y: cardDim.h - 20 }).template
                break
            case 'vertical':
                cardDim = { w: 40, h: 160, text_x: 8, text_y: 5, img_w: 0, img_h: 0, img_x: 0, img_y: 0 }
                separation = { node: 80, level: 200 }
                editIcon = DetailIcon({ cardDim, x: cardDim.w - 28, y: cardDim.h - 24 }).template
                addIcon = '<g></g>'
                break
            default:
                break
        }

        const store = f3.createStore({
            data: props.data,
            node_separation: separation.node,
            level_separation: separation.level,
        })
        const view = f3.d3AnimationView({
            store,
            cont: document.querySelector('#FamilyChart'),
            card_edit: cardEdit,
        })
        const Card = f3.elements.Card({
            store,
            svg: view.svg,
            card_dim: cardDim,
            card_display: cardDisplay,
            mini_tree: true,
            link_break: false,
            editIcon,
            addIcon,
            cardEditForm,
            addRelative: f3.handlers.AddRelative({
                store,
                cont: cont.current,
                card_dim: cardDim,
                cardEditForm,
                labels: { mother: 'Add mother' },
            }),
        })

        view.setCard(Card)
        store.setOnUpdate((props: any) => {
            if (props.initial) return view.update({ transition_time: 0 })
            return view.update({ ...props, tree_position: 'main_to_middle', transition_time: 1000 } || {})
        })
        store.update.tree({ initial: true })

        function cardEditForm(props: CardEditProps) {
            console.log(props)
            setSelected(props)
            // onClickDetail(props.datum.id)
            setShowEdit(true)
        }
    }, [treeType, cont, props.data])

    function getCardEditParams() {
        return [
            { type: 'text', placeholder: 'first name', key: 'first_name' },
            { type: 'text', placeholder: 'last name', key: 'last_name' },
            { type: 'text', placeholder: 'birthday', key: 'birthday' },
            { type: 'text', placeholder: 'avatar', key: 'avatar' },
        ]
    }

    function getCardDisplay() {
        const d1 = (d: FamilyChart) => `${d.data['first_name'] || ''} ${d.data['last_name'] || ''}`
        d1.create_form = '{first name} {last name}'
        return [d1]
    }

    function handleClose() {
        setShowEdit(false)
    }

    function onClickDetail(id: number) {
        props.onClickDetail(id)
    }

    function changeTreeType(treeType: TreeType) {
        setTreeType(treeType)
    }

    return (
        <>
            <div className={'f3' + ` type-${treeType}`} id="FamilyChart" ref={cont}></div>
            <Modal show={showEdit} onClose={handleClose}>
                {selected && (
                    <Form selected={selected} cardEdit={cardEdit} cardDisplay={cardDisplay} close={handleClose} />
                )}
            </Modal>
            <MenuComponent changeTreeType={changeTreeType} />
        </>
    )
}
