export function DetailIcon({ cardDim, x, y }: { cardDim: any; x: number; y: number }) {
    return {
        template: `
          <g transform="translate(${x || cardDim.w - 20},${y || cardDim.h - 20})scale(.8)" style="cursor: pointer" class="card_edit pencil_icon">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                <g><rect fill="none" height="24" width="24"/></g>
                <g><path fill="currentColor" transform="translate(-1.5, -1.5)" d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M12,6c1.93,0,3.5,1.57,3.5,3.5 c0,1.93-1.57,3.5-3.5,3.5s-3.5-1.57-3.5-3.5C8.5,7.57,10.07,6,12,6z M19,19H5v-0.23c0-0.62,0.28-1.2,0.76-1.58 C7.47,15.82,9.64,15,12,15s4.53,0.82,6.24,2.19c0.48,0.38,0.76,0.97,0.76,1.58V19z"/></g>
            </svg>
          </g>
        `,
    }
}

export function PlusIcon({ cardDim, x, y }: { cardDim: any; x: number; y: number }) {
    return {
        template: `
            <g class="card_add_relative">
                <g transform="translate(${x || cardDim.w / 2},${y || cardDim.h})scale(.13)">
                <circle r="80" cx="40" cy="40" fill="rgba(0,0,0,0)" />
                <g transform="translate(-10, -8)">
                    <line
                    x1="10" x2="90" y1="50" y2="50"
                    stroke="currentColor" stroke-width="15" stroke-linecap="round"
                    />
                    <line
                    x1="50" x2="50" y1="10" y2="90"
                    stroke="currentColor" stroke-width="15" stroke-linecap="round"
                    />
                </g>
                </g>
            </g>
        `,
    }
}
