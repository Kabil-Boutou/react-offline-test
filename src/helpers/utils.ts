export function extractTimeUK(date: string) {
  return new Date(date).toLocaleTimeString('en-GB', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
  })
}
