import { marked } from 'marked'
import DOMPurify from 'dompurify'

export function convertirMarkdown(texto) {
  const html = marked.parse(texto ?? '')
  return DOMPurify.sanitize(html)
}
