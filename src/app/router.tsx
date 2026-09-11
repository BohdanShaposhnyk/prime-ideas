import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { CandidatePage } from '@/app/CandidatePage'
import { HubPage } from '@/visions/hub/HubPage'
import { TemplatePage } from '@/visions/_template'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
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
  templateRoute,
  candidateRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
