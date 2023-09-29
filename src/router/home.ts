export const homeRoute = {
  index: '/home',
  home: (id: string) => `/home/${id}`,
  settlement: (step: string) => `/home/settlement?step=${step}`,
}
