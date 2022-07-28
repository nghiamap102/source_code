import { SearchBarTheme } from 'src/theme/theme'
import styled, { css } from 'styled-components'

export const baseButtonMixin = css`
  background: none;
  border: none;
  padding: 0px;
`

export const baseFlex = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const AutoCompleteContainer = styled.ul`
  background: white;
  padding: 8px 0;
  list-style-type: none;
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  border: 1px solid ${SearchBarTheme.color.gray};
  border-radius: 2px;
  margin: 0;
  box-sizing: border-box;
  height: auto;
  max-height: 280px;
  min-height: 100px;
  overflow-y: auto;
  z-index: 1;
  transition: max-height 0.3s ease-out;
`

export const AutoCompleteItem = styled.li`
  padding: 0 24px;
  width: w_100;
  box-sizing: border-box;
  &:hover {
    background-color: ${SearchBarTheme.color.gray};
  }
`

export const AutoCompleteItemButton = styled.button`
  ${baseButtonMixin}
  ${baseFlex}
  width: 100%;
  line-height: 32px;
  text-align: left;
  &:active {
    outline: none;
    color: ${SearchBarTheme.backgroundColor.light_blue};
  }
`
