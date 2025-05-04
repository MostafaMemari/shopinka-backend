// Returns initials from string
export const getInitials = (string: string) => string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')

export const extractTime = (text: string) => {
  const match = text.match(/(\d{2}:\d{2})/)

  return match ? match[1] : null
}
