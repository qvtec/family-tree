import { useEffect, useRef, useState } from 'react'
import f3 from 'family-chart/dist/family-chart'
import { FamilyChart } from '@/types'
import Modal from '@/Components/Modal'

import './family-chart.scss'
import MenuComponent from './elements/Menu'
import { DetailIcon, PlusIcon } from './elements/Icon'
import TreeDetailComponents from '../Tree/Detail'
import ButtonSecondary from '@/Components/ButtonSecondary'
import { useCookies } from '@/hooks/useCookies'
import { calculateAge } from '@/utils/date'

export type TreeType = 'wide' | 'vertical'

interface Props {
    id?: number
    type: string
    data: FamilyChart[]
}

interface CardEditProps {
    datum: {
        id: number
        to_add: any
    }
    relDatum: FamilyChart
    store: any
    relType?: string // mather,father,daughter,son...
    postSubmit: any
}

export default function FamilyChartComponent(props: Props) {
    const cont = useRef<HTMLDivElement>(null)
    const [showEdit, setShowEdit] = useState(false)
    const [treeType, setTreeType] = useState<TreeType>('vertical')
    const [selected, setSelected] = useState<CardEditProps>()

    const { setCookie, getCookie } = useCookies()

    useEffect(() => {
        const treeTypeDefault = getCookie('treeType')
        if (treeTypeDefault) setTreeType(treeTypeDefault as TreeType)
    }, [getCookie])

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
                addIcon = '<g></g>'
                break
            default:
                break
        }

        const cardDisplay = getCardDisplay()
        const cardEdit = [
            { type: 'text', placeholder: 'first name', key: 'first_name' },
            { type: 'text', placeholder: 'last name', key: 'last_name' },
            { type: 'text', placeholder: 'birthday', key: 'birthday' },
            { type: 'text', placeholder: 'avatar', key: 'avatar' },
        ]

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
            if (props.datum.to_add) {
                console.log('新規登録...')
            } else {
                setSelected(props)
                setShowEdit(true)
            }
        }
    }, [treeType, cont, props.data])

    function getCardDisplay() {
        const d1 = (d: FamilyChart) => `${d.data['first_name'] || ''}${d.data['contents_exist'] ? ' 📒' : ''}`
        const d2 = (d: FamilyChart) => `${treeType == 'vertical' ? '' : getDispBirth(d) || ''}`
        // d1.create_form = '{first name}'
        // d2.create_form = '{birthday}'
        return [d1, d2]
    }

    function getDispBirth(d: FamilyChart) {
        const old = d.data['deathday'] ? '' : ` (${calculateAge(d.data['birthday'])})`
        return d.data['birthday'] + old
    }

    function handleClose() {
        setShowEdit(false)
    }

    function changeTreeType(treeType: TreeType) {
        setTreeType(treeType)
        setCookie('treeType', treeType)
    }

    return (
        <>
            <div className={'f3' + ` type-${treeType}`} id="FamilyChart" ref={cont}></div>
            <Modal show={showEdit} onClose={handleClose}>
                <div className="p-4 lg:p-8">
                    <div className="flex justify-end">
                        <ButtonSecondary className="rounded-full p-2" onClick={handleClose}>
                            ✕
                        </ButtonSecondary>
                    </div>
                    {selected && <TreeDetailComponents id={Number(selected.datum.id)} type={props.type} />}
                </div>
            </Modal>
            <MenuComponent changeTreeType={changeTreeType} />
        </>
    )
}
