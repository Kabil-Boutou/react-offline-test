import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Grid, Container, Spinner, Text } from '@chakra-ui/react'

import { getUKEnergyMix } from './API'
import { CustomBarChart, CustomStat } from './Components'
import { ENERGY_DATA_GET } from './consts/queryKeys'
import { extractTimeUK } from './helpers/utils'

export function App() {
  const { data, isLoading } = useQuery({
    queryKey: [ENERGY_DATA_GET],
    queryFn: getUKEnergyMix,
    select(data) {
      const dataChart = data?.generationmix.map((eng) => ({ name: eng.fuel, perc: Number(eng.perc) }))
      return { rawData: data, dataChart }
    },
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
      <Grid
        templateColumns={{
          base: `repeat(${Math.min(data.rawData?.generationmix.length, 2)}, 1fr)`, // Small screens: max 2 columns
          md: `repeat(${Math.min(data.rawData?.generationmix.length, 4)}, 1fr)`, // Medium screens: max 4 columns
          lg: `repeat(${data.rawData?.generationmix.length}, 1fr)`, // Large screens: all columns
        }}
        gap={6}
      >
        {data.rawData?.generationmix.map((eng) => {
          return (
            <CustomStat
              label={eng.fuel.toUpperCase()}
              number={`${eng.perc}%`}
              tooltip="Last Update"
              help={`${extractTimeUK(data.rawData.from)} - ${extractTimeUK(data.rawData.to)}`}
            />
          )
        })}
      </Grid>
      <CustomBarChart data={data?.dataChart} barLabels={[{ label: 'perc', fill: '#8884d8' }]} />
    </Container>
  )
}
