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
export function mytextarea(id: string, data: any, editElement: any, minWidth: any, readOnly: any) {
  // const id = FamilyTree.elements.generateId()
  let value = data[editElement.binding]
  if (value == undefined) value = ''
  if (readOnly && !value) return { html: '' }
  const rOnlyAttr = readOnly ? 'readonly' : ''
  const rDisabledAttr = readOnly ? 'disabled' : ''

  return {
    html: `<div class="bft-form-field" style="min-width: 280px;">
          <div class="bft-input">
            <label for="${id}" class="hasval">${editElement.label}</label>
            <textarea ${rDisabledAttr} ${rOnlyAttr} id="${id}" name="${id}" data-binding="${editElement.binding}" rows="4" class="block p-2.5 pt-6 w-full text-sm text-gray-700 rounded border border-gray-300">${value}</textarea>
          </div>
        </div>`,
    id: id,
    value: value,
  }
}

/**
 * メニューボタンHTML
 *
 * @returns html
 */
export function menuButton() {
  return (
    '<div style="position:absolute;right:{p}px;top:{p}px;" data-ctrl-menu="">' +
    `<Image src="/img/settings.svg" alt="" className="w-5 h-5" width={25} height={25} priority />` +
    '</div>'
  )
}

/**
 * roots親ID取得
 *
 * @param id
 * @param family
 * @returns
 */
export function getRoots(data: any[], id: number) {
  let node = getNode(data, id)
  let cnt = 0
  while (node) {
    let targetId = node.fid ?? node.mid ?? ''

    if (!targetId && node.pids.length > 0) {
      // 親情報なしなら夫婦情報を取得し、相手の親情報もなければbreak
      targetId = node.pids[node.pids.length - 1]
      const pNode = getNode(data, targetId)
      if (!pNode.fid && !pNode.mid) {
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
  return node?.id
}

function getNode(data: any[], id: number) {
    return data.find(obj => obj.id == id)
}

