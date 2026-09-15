import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { CandidatePage, ChampionPage } from '@/app/CandidatePage'
import { getChampion } from '@/app/candidates'
import { HubPage } from '@/visions/hub/HubPage'
import { TemplatePage } from '@/visions/_template'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

/** `/` — champion landing when one exists; otherwise hub (backward compatible). */
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (getChampion() ? <ChampionPage /> : <HubPage />),
})

/** Lab hub — always available (use after a champion owns `/`). */
const labRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lab',
  component: HubPage,
})

const templateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/v/_template',
  component: TemplatePage,
})

const candidateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/c/$candidateKey',
  component: CandidatePage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  labRoute,
  templateRoute,
  candidateRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
