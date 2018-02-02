export const configuration = {
  routes: [
    { label: 'Dashboard', url: '/', icon: 'ion-ios-pulse-strong', sidebar: true },
    { label: 'Reservations', url: '/app/reservation', icon: 'ion-ios-bookmarks-outline', sidebar: true, role: 'reservation:read' },
    { label: 'Devices', url: '/app/device', icon: 'ion-ios-camera-outline', sidebar: true, role: 'device:read' },
    { label: 'Room Reservations', url: '/app/room-reservation', icon: 'ion-ios-calendar-outline', role: 'roomReservation:create', sidebar: true },
    { label: 'Rooms', url: '/app/room', icon: 'ion-android-lock', role: 'room:read', sidebar: true },
    { label: 'Users', url: '/app/user', icon: 'ion-ios-people', sidebar: true },
    { label: 'Events', url: '/app/event', icon: 'ion-ios-analytics', sidebar: true, role: 'event:read' },
    { url: '/app/user/new', role: 'user:create' },
    { url: '/app/device/new', role: 'device:create' },
    { url: '/app/login' },
    { url: '/app/signup' }
  ]
};
