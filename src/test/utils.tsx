import { ReactNode } from 'react'
import { asValue, createContainer } from 'awilix'
import { vi } from 'vitest'
import { RecoilRoot } from 'recoil'
import { ContainerContext } from '@/app/libs/recorder/base'

export const makeFakeRecorder = (overrides: Record<string, any> = {}) => ({
  save: vi.fn(async (x: any) => ({ ...x, id: x.id ?? 1, version: (x.version ?? 0) + 1 })),
  update: vi.fn(async (x: any) => ({ ...x })),
  list: vi.fn(async () => []),
  listByDay: vi.fn(async () => []),
  listByMonth: vi.fn(async () => []),
  delete: vi.fn(async () => {}),
  listTypes: vi.fn(async () => []),
  ...overrides,
})

export const WithContainer = ({
  recorder,
  children,
}: {
  recorder: any
  children: ReactNode
}) => {
  const container = createContainer()
  container.register({ recorder: asValue(recorder) })
  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>
}

export const WithRecoilAndContainer = ({
  recorder,
  children,
}: {
  recorder: any
  children: ReactNode
}) => (
  <RecoilRoot>
    <WithContainer recorder={recorder}>{children}</WithContainer>
  </RecoilRoot>
)
