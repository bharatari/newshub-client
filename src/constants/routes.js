export const navigationRoutes = [
  { label: 'Dashboard', url: '/' },
  { label: 'Reservations', url: '/app/reservation' },
  { label: 'Devices', url: '/app/device', admin: true },
  { label: 'Users', url: '/app/user', admin: true },
];

export const nonSidebarRoutes = [
  '/app/login',
  '/app/signup',
];
