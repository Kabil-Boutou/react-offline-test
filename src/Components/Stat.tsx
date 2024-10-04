import React from 'react'
import { Stat, StatHelpText, StatLabel, StatNumber, Tooltip } from '@chakra-ui/react'

interface Props {
  label: string
  tooltip?: string
  number: string
  help: string | React.ReactNode
}
export function CustomStat({ label, number, tooltip, help }: Props) {
  return (
    <Stat>
      <StatLabel fontSize={'xl'}>{label}</StatLabel>
      <StatNumber fontSize={'3xl'} data-testid={`${label}-number`}>
        {number}
      </StatNumber>
      <Tooltip hasArrow label={tooltip || ''} children={<StatHelpText>{help}</StatHelpText>} />
    </Stat>
  )
}
