import { FamilyChart } from '@/types'
import { ChangeEvent, FormEvent, useState } from 'react'
import ButtonDanger from '@/Components/ButtonDanger'
import ButtonPrimary from '@/Components/ButtonPrimary'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import RadioButton from '@/Components/RadioButton'
import ButtonSecondary from '@/Components/ButtonSecondary'

export interface CardEditInterface {
    type: string
    placeholder: string
    key: string
}

export interface FamilyChartDatum extends FamilyChart {
    to_add: any
}

export interface CardEditProps {
    datum: FamilyChartDatum
    relDatum: FamilyChart
    store: any
    relType?: string // mather,father,daughter,son...
    postSubmit: any
}

interface FormProps {
    selected: CardEditProps
    cardEdit: CardEditInterface[]
    cardDisplay: {
        (d: FamilyChart): string
        create_form: string
    }[]
    close: () => void
}

export function Form({ selected, cardEdit, cardDisplay, close }: FormProps) {
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
        first_name: selected.datum.data.first_name ?? '',
        last_name: selected.datum.data.last_name ?? '',
        birthday: selected.datum.data.birthday ?? '',
        avatar: selected.datum.data.avatar ?? '',
        gender: selected.datum.data.gender ?? '',
    })

    function otherParentSelect() {
        const dataStash = selected.store.getData()
        return `
        <div>
          <label>Select other</label>
          <select name="other_parent" style="display: block">
            ${
                !selected.relDatum.rels.spouses || selected.relDatum.rels.spouses.length === 0
                    ? ''
                    : selected.relDatum.rels.spouses
                          .map((spId, i) => {
                              const spouse = dataStash.find((d: FamilyChart) => d.id === spId)
                              return `<option value="${spId}" ${i === 0 ? 'selected' : ''}>${cardDisplay[0](spouse)}</option>`
                          })
                          .join('\n')
            }
            <option value="${'_new'}">NEW</option>
          </select>
        </div>
      `
    }

    function submitFormChanges(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // const target = e.target as HTMLFormElement
        // const formData = new FormData(target)
        // formData.forEach((v, k) => (selected.datum.data[k] = v))
        console.log(inputValues)

        close()
        selected.postSubmit()
    }

    function deletePerson() {
        close()
        selected.postSubmit({ delete: true })
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <form className="m-4" onSubmit={submitFormChanges}>
            {!selected.datum.to_add && (
                <div className="flex justify-end">
                    <ButtonSecondary className="rounded-full p-2" onClick={close}>
                        ✕
                    </ButtonSecondary>
                </div>
            )}
            <div>
                <Label htmlFor="role">Gender</Label>
                <div className="mb-4 flex items-center">
                    <div className="mr-4">
                        <RadioButton
                            id="genderM"
                            value="M"
                            name="gender"
                            checked={inputValues['gender'] == 'M'}
                            onChange={handleChange}
                        />
                        <label htmlFor="genderM" className="ms-2 text-sm font-medium text-gray-900">
                            male
                        </label>
                    </div>
                    <div className="mr-4">
                        <RadioButton
                            id="genderF"
                            value="F"
                            name="gender"
                            checked={inputValues['gender'] == 'F'}
                            onChange={handleChange}
                        />
                        <label htmlFor="genderF" className="ms-2 text-sm font-medium text-gray-900">
                            female
                        </label>
                    </div>
                    <div className="mr-4">
                        <RadioButton
                            id="genderO"
                            value="O"
                            name="gender"
                            checked={inputValues['gender'] == 'O'}
                            onChange={handleChange}
                        />
                        <label htmlFor="genderO" className="ms-2 text-sm font-medium text-gray-900">
                            other
                        </label>
                    </div>
                </div>
                {cardEdit.map((d, i) => (
                    <div key={i} className="mb-4">
                        <Label htmlFor={d.key}>{d.placeholder}</Label>
                        <Input
                            type="text"
                            name={d.key}
                            value={inputValues[d.key] || ''}
                            className="mt-1 block w-full"
                            onChange={handleChange}
                        />
                    </div>
                ))}
                {selected.relType == 'son' || (selected.relType == 'daughter' && otherParentSelect())}
            </div>
            <div className="flex justify-between">
                <ButtonPrimary>Submit</ButtonPrimary>
                <ButtonDanger className="rounded-full p-2" onClick={deletePerson}>
                    <img src="/img/delete.svg" alt="" />
                    削除
                </ButtonDanger>
            </div>
        </form>
    )
}
