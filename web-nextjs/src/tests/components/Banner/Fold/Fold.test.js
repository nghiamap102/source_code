/* eslint-disable no-undef */
import Fold from 'src/components/Banner/Fold'
import { testSnapshots } from 'src/tests/utils/getSnapshot'

describe('<Banner />', () => {
  testSnapshots(Fold, [
    {
      props: {},
      description: 'render Banner Fold default'
    }
  ])
})
