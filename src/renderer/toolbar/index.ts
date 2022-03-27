const el = document.getElementById('toolbar') as HTMLMenuElement

const toolbar = () => {
  el.classList.add('show')
}

export const toggle = (state: boolean) => {
  el.classList[state ? 'add' : 'remove']('show')
}

export default toolbar
