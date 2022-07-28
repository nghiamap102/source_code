import { Global } from '@emotion/react'

const common = {
  blue: '#012CDB',
  black: '#222731'
}

export const mainColor = {
  textPrimary: common.black,
  primary: common.blue,

  transparent: 'transparent',
  lime: '#00FE81',
  bgDefault: '#E5E5E5',
  white: '#FFFFFF',
  black: '#000000',
  orange: '#FF8300',
  light_orange: '#FFE6CC',
  textDark: '#161D25',
  textDark2: '#222731',
  textDark3: '#414342',
  textSecond: '#63666A',
  gray: '#767676',
  gray2: '#F6F7F9',
  gray3: '#a5a3a3',
  gray90: '#E0E0E0',
  grayCool: '#888B8D',
  whiteGray: '#d9d9d6',
  brightTurquoise: '#08E8DE',
  matteGray: '#F4F6F8',
  error: '#D62B1F',
  red: '#DE3618',
  crimson: '#E80882',
  pink: '#FACEE6',
  shuttleGrey: '#5D6A7A',
  whiteGrey: '#DFE3E8',
  lightGray: '#F1F2F3',
  pinkTermCondition: '#f26eaf',

  black_RGBA_0: 'rgba(0, 0, 0, 0)',
  black_RGBA_1: 'rgba(79, 79, 79, 0.1)',
  black_RGBA_6: 'rgba(0, 0, 0, 0.6)',
  black_RGBA_25: 'rgba(0, 0, 0, 0.25)',

  orangeRGBA_1: 'rgba(255, 131, 0, 1)',
  light_blue_RGBA_1: 'rgba(206, 250, 248, 1)',
  blackOverlay: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) , rgba(0, 0, 0, 0));',
  overlay: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',
  overlayCate: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))'
}

const Color = () => (
  <Global
    styles={`
    :root {
      --textPrimary: ${mainColor.textPrimary};
      --primary: ${mainColor.primary};

      --lime: ${mainColor.lime};
      --transparent: ${mainColor.transparent};
      --white: ${mainColor.white};
      --black: ${mainColor.black};
      --orange: ${mainColor.primary};
      --light-orange: ${mainColor.light_orange};
      --textDark: ${mainColor.textDark};
      --textDark2: ${mainColor.textDark2};
      --textDark3: ${mainColor.textDark3};
      --textSecond: ${mainColor.textSecond};
      --gray: ${mainColor.gray};
      --gray2: ${mainColor.gray2};
      --gray90: ${mainColor.gray90};
      --grayCool: ${mainColor.grayCool};
      --whiteGray: ${mainColor.whiteGray};
      --lightGray:${mainColor.lightGray};
      --brightTurquoise: ${mainColor.brightTurquoise};
      --matteGray: ${mainColor.matteGray};
      --error: ${mainColor.error};
      --red: ${mainColor.red};
      --crimson: ${mainColor.crimson};
      --pink: ${mainColor.pink};
      --shuttleGrey: ${mainColor.shuttleGrey};
      --whiteGrey: ${mainColor.whiteGrey};
      --blackOverlay:${mainColor.blackOverlay};
      --black-rgba-0 : ${mainColor.black_RGBA_0};
      --black-rgba-1 : ${mainColor.black_RGBA_1};
      --black-rgba-6 : ${mainColor.black_RGBA_6};
      --black-rgba-25 : ${mainColor.black_RGBA_25};
      --pinkTermCondition: ${mainColor.pinkTermCondition};
      --overlay: ${mainColor.overlay};
    }
      `}
  />
)

export default Color
