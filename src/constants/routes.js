export const configuration = {
  routes: [
    { label: 'Dashboard', url: '/', icon: 'ion-planet' },
    { label: 'Reservations', url: '/app/reservation', icon: 'ion-folder' },
    { label: 'Devices', url: '/app/device', icon: 'ion-videocamera' },
    { label: 'Projects', url: '/app/project', icon: 'ion-document-text' },
    { label: 'Room Reservations', url: '/app/room-reservation', icon: 'ion-ios-calendar-outline', role: 'room-reservation:create' },
    { label: 'Rooms', url: '/app/room', icon: 'ion-android-lock', role: 'room:view' },
    { label: 'Users', url: '/app/user', icon: 'ion-ios-people' },
    { url: '/app/user/new', sidebar: false, role: 'user:create' },
    { url: '/app/device/new', sidebar: false, role: 'device:create' },
    { url: '/app/project/new', sidebar: false, role: 'project:create' },
    { url: '/app/login', sidebar: false },
    { url: '/app/signup', sidebar: false }
  ]
};
