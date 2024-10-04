const API_URL = 'https://api.carbonintensity.org.uk/generation'

export async function getUKEnergyMix() {
  try {
    const response = await fetch(API_URL)
    const { data } = await response.json()
    return data
  } catch {
    throw Error('something went wrong')
  }
}
