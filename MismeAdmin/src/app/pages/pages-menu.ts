import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Usuarios',
    icon: 'people-outline',
    link: '/pages/users'
  },
  {
    title: 'Conceptos',
    icon: 'list-outline',
    link: '/pages/concept'
  },
  // {
  //   title: 'Datos Personales',
  //   icon: 'list-outline',
  //   link: '/pages/personal-data'
  // },
  {
    title: 'Cuestionarios',
    icon: 'question-mark-outline',
    link: '/pages/polls'
  },
  {
    title: 'Platos',
    icon: 'archive-outline',
    link: '/pages/dishes'
  },
  {
    title: 'Traducciones',
    icon: 'globe-outline',
    // link: '/pages/translations',
    children: [
      {
        title: 'Conceptos',
        link: '/pages/translations/concept',
      },
      {
        title: 'Cuestionarios',
        link: '/pages/translations/poll',
      },
      {
        title: 'Preguntas',
        link: '/pages/translations/question',
      },
      {
        title: 'Respuestas',
        link: '/pages/translations/answer',
      },

      {
        title: 'Consejos',
        link: '/pages/translations/tip',
      }
    ]
  },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
