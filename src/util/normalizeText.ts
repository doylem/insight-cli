const normalizeText = (text: string[] | string): string => {
  let normalizedText = ''
  if (Array.isArray(text)) normalizedText = text.join(' ')
  return normalizedText.trim().toLowerCase()
}

export default normalizeText
