import { create, Flex } from 'smbls'

import * as components from './components'

create(
  {
    extend: Flex,
    props: {
      theme: 'document',
      flow: 'column',
      align: 'center space-between',
      padding: 'Z2'
    },
    style: {
      height: '100vh',
      background: '#22C1C3',
      background:
        'linear-gradient(0deg,rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)',
      justifyContent: 'center'
    },
    content: {
      GridSelection: {
        style: {
          marginTop: 'auto'
        }
      }
    }
  },
  {
    components
  }
)
