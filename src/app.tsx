import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Grid, Container, Spinner, Text } from '@chakra-ui/react'

import { getUKEnergyMix } from './API'
import { CustomStat } from './Components'
import { ENERGY_DATA_GET } from './consts/queryKeys'
import { extractTimeUK } from './helpers/utils'

export function App() {
  const { data, isLoading } = useQuery({
    queryKey: [ENERGY_DATA_GET],
    queryFn: getUKEnergyMix,
  })

  if (isLoading)
    return (
      <Container centerContent>
        <Spinner />
      </Container>
    )

  return (
    <Container maxW="container.xl">
      <Text fontSize={'5xl'}>UK Energy Mix</Text>
      <Grid templateColumns={`repeat(${data?.generationmix.length}, 1fr)`} gap={6}>
        {data?.generationmix.map((eng) => {
          return (
            <CustomStat
              label={eng.fuel.toUpperCase()}
              number={`${eng.perc}%`}
              tooltip="Last Update"
              help={`${extractTimeUK(data.from)} - ${extractTimeUK(data.to)}`}
            />
          )
        })}
      </Grid>
    </Container>
  )
}
