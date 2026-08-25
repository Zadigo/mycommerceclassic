import { vi } from 'vitest'


export const mockFirebase = vi.hoisted(() => {
  const mockUseFirestore = vi.fn()
  const mockUseDocument = vi.fn()
  const mockDoc = vi.fn()

  return {
    mockUseFirestore,
    mockUseDocument,
    mockDoc
  }
})

vi.mock('firebase/firestore', async (original) => {
  const actual = await original<typeof import('firebase/firestore')>()
  
  return {
    ...actual,
    doc: mockFirebase.mockDoc
  }
})

vi.mock('vuefire', async (original) => {
  const actual = await original<typeof import('vuefire')>()
  return {
    ...actual,
    useFirestore: mockFirebase.mockUseFirestore,
    useDocument: mockFirebase.mockUseDocument,
  }
})
