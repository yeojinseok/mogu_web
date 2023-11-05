export const homeRoute = {
  index: '/home',
  home: (id: number) => `/home/${id}`,
  settlement: (step: string) => `/home/settlement?step=${step}`,
}
