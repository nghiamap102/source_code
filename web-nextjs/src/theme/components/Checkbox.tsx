const styleCheckbox = {
  bg: 'main.primary',
  borderColor: 'main.primary'
}

export const Checkbox = {
  baseStyle: {
    icon: {
      color: 'white'
    },
    control: {
      border: '1px',
      borderColor: 'main.grayCool',
      borderRadius: 'base',
      _checked: styleCheckbox,

      _disabled: {
        borderColor: 'main.grayCool',
        bg: 'gray.200'
      }
    },
    label: {
      fontWeight: '400',
      color: 'main.textDark'
    }
  }
}
