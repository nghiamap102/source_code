import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Heading Font Name';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/Barlow-SemiBold.ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Body Font Name';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/Barlow-Regular.ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Jost';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/Jost-Regular.ttf');
      }
      @font-face {
        font-family: 'Jost';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/Jost-Medium.ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Jost';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/Jost-SemiBold.ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Jost';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/Jost-Bold.ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/Poppins-Regular.ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/Poppins-Medium.ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/Poppins-SemiBold.ttf');
      }
      `}
  />
)

export default Fonts
