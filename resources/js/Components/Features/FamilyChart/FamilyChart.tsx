import { useEffect, useRef, useState } from 'react'
import f3 from 'family-chart/dist/family-chart'
import { FamilyChart } from '@/types'
import { CardEditProps, Form } from './elements/Form'
import Modal from '@/Components/Modal'

import './family-chart.scss'

interface Props {
    id?: number
    type: string
    data: FamilyChart[]
    onClickDetail: (id: number) => void
}

export default function FamilyChartComponent(props: Props) {
    const cont = useRef<HTMLDivElement>(null)
    const [showEdit, setShowEdit] = useState(false)
    const [selected, setSelected] = useState<CardEditProps>()

    const cardDim = { w: 220, h: 70, text_x: 75, text_y: 15, img_w: 60, img_h: 60, img_x: 5, img_y: 5 }
    const cardDisplay = getCardDisplay()
    const cardEdit = getCardEditParams()

    useEffect(() => {
        if (cont.current === null || props.data.length == 0) return

        const store = f3.createStore({
            data: props.data,
            node_separation: 250,
            level_separation: 150,
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
        store.setOnUpdate((props: FamilyChart) => view.update(props || {}))
        store.update.tree({ initial: true })

        function cardEditForm(props: CardEditProps) {
            console.log(props)
            setSelected(props)
            // onClickDetail(props.datum.data.id)
            setShowEdit(true)
        }
    }, [cont, props.data])

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
        const d2 = (d: FamilyChart) => `${d.data['birthday'] || ''}`
        d1.create_form = '{first name} {last name}'
        d2.create_form = '{birthday}'
        return [d1, d2]
    }

    function handleClose() {
        setShowEdit(false)
    }

    function onClickDetail(id: number) {
        props.onClickDetail(id)
    }

    return (
        <>
            <div className="f3" id="FamilyChart" ref={cont}></div>
            <Modal show={showEdit} onClose={handleClose}>
                {selected && (
                    <Form selected={selected} cardEdit={cardEdit} cardDisplay={cardDisplay} close={handleClose} />
                )}
            </Modal>
        </>
    )
}
