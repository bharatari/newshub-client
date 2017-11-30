export const configuration = {
  routes: [
    { label: 'Dashboard', url: '/', icon: 'ion-planet', sidebar: true },
    { label: 'Reservations', url: '/app/reservation', icon: 'ion-folder', sidebar: true, role: 'reservation:read' },
    { label: 'Devices', url: '/app/device', icon: 'ion-videocamera', sidebar: true, role: 'device:read' },
    { label: 'Projects', url: '/app/project', icon: 'ion-document-text', sidebar: false, role: 'project:read' },
    { label: 'Room Reservations', url: '/app/room-reservation', icon: 'ion-ios-calendar-outline', role: 'roomReservation:create', sidebar: true },
    { label: 'Rooms', url: '/app/room', icon: 'ion-android-lock', role: 'room:read', sidebar: true },
    { label: 'Users', url: '/app/user', icon: 'ion-ios-people', sidebar: true },
    { label: 'Events', url: '/app/event', icon: 'ion-ios-time-outline', sidebar: true, role: 'event:read' },
    { url: '/app/user/new', role: 'user:create' },
    { url: '/app/device/new', role: 'device:create' },
    { url: '/app/project/new', role: 'project:create' },
    { url: '/app/login' },
    { url: '/app/signup' }
  ]
};
