'use strict';

export const version: string="1.0.0";
export const views = [
    {
      title: 'Home',
      component: 'app-welcome',
      icon: 'home',
      route: '/',
    },
    {
      title: 'Manage users',
      component: 'app-users',
      icon: 'users',
      route: '/users',
    }
];

export const langs = [
    {
        name: 'EN',
        value: 'en'
    },
    {
        name: 'FR',
        value: 'fr'
    },
]

export var data = {
    users: [],
};

/**
 *
 * @param value string
 * @returns object
 */
export const searchLang = (value: string) => {
    for (const lang of langs) {
        if (lang.value == value) {
            return lang;
        }
    }

    return null;
}

export const defaultSettings = {
    lang: 'en',
    perPage: 10,
};

export const apiLinks = {
    users: 'https://reqres.in/api/users',
};
