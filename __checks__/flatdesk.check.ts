/**
* This is a Checkly CLI BrowserCheck construct. To learn more, visit:
* - https://www.checklyhq.com/docs/cli/
* - https://www.checklyhq.com/docs/cli/constructs-reference/#browsercheck
*/

import { BrowserCheck, Frequency } from 'checkly/constructs'

new BrowserCheck('flatdesk', {
  name: 'flatdesk',
  activated: true,
  muted: false,
  doubleCheck: true,
  shouldFail: false,
  locations: ['us-east-2', 'us-east-1'],
  tags: [],
  sslCheckDomain: '',
  frequency: Frequency.EVERY_24H,
  environmentVariables: [],
  code: {
    entrypoint: './flatdesk.spec.ts',
  },
})
