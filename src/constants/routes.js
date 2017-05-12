export const configuration = {
  routes: [
    { label: 'Dashboard', url: '/', icon: 'ion-planet', sidebar: true },
    { label: 'Reservations', url: '/app/reservation', icon: 'ion-folder', sidebar: true },
    { label: 'Devices', url: '/app/device', icon: 'ion-videocamera', sidebar: true },
    { label: 'Projects', url: '/app/project', icon: 'ion-document-text', sidebar: false },
    { label: 'Room Reservations', url: '/app/room-reservation', icon: 'ion-ios-calendar-outline', role: 'room-reservation:create', sidebar: true },
    { label: 'Rooms', url: '/app/room', icon: 'ion-android-lock', role: 'room:view', sidebar: true },
    { label: 'Users', url: '/app/user', icon: 'ion-ios-people', sidebar: true },
    { url: '/app/user/new', role: 'user:create' },
    { url: '/app/device/new', role: 'device:create' },
    { url: '/app/project/new', role: 'project:create' },
    { url: '/app/login' },
    { url: '/app/signup' }
  ]
};
