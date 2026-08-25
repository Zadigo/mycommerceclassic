export type IdAction = 'link' | 'cta' | 'image' | 'service' | 'product' | 'tel' | (string & {})

export type IdLocation = 'header' | 'footer' | 'sidebar' | 'content' | 'navbar' | (string & {})

/**
 * Creates a unique element ID by combining a base string with additional parts.
 * @param base The base of the id, usually the component name.
 * @param location The location of the element, usually the section of the page.
 * @param parts The parts to be added to the id, usually the props of the component.
 */
export function createElementId(base: IdAction, location: IdLocation, ...parts: Array<string | number | undefined | null>): string {
  const _parts = parts
    .filter(p => p !== undefined && p !== null)
    .map(p => (p || '').toString().replace(/ /g, '-'))
    .join('__')

  let result = `${base}-${location}-${_parts}`

  if (result.endsWith('-')) {
    result = result.slice(0, -1)
  }
  
  return result
}
