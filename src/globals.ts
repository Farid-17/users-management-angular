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

export var data: any = {
    id: null,
    users: [],
    alert: {
        element: null,
        counter: 10,
        step: 0.05,
        timeAfterShow: 2500,
        class: "",
        title: "",
        icon: "",
    },
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

const fadeIn = (callback?: Function, callbackBeforeHide: boolean = true) => {
    data.alert.element = document.getElementById("alert");
    let elementAttr = Number(getComputedStyle(data.alert.element).opacity);

    if (elementAttr >= 1) {
        if (typeof callback == "function" && callbackBeforeHide) {
            callback();
        }

        setTimeout(function () {
            if (typeof callback == "function" && !callbackBeforeHide) {
                callback();
            }

            fadeOut();
        }, data.alert.timeAfterShow);

        return;
    }

    data.alert.element.style.opacity = elementAttr + data.alert.step;
    setTimeout(function () {
      fadeIn();
    }, data.alert.counter);
}

const fadeOut = (callback?: Function) => {
    data.alert.element = document.getElementById("alert");
    let elementAttr = Number(getComputedStyle(data.alert.element).opacity);

    if (elementAttr <= 0) {
        if (callback != null && typeof callback == "function") {
            callback();
        }
      return;
    }

    data.alert.element.style.opacity = elementAttr - data.alert.step;
    setTimeout(function () {
      fadeOut();
    }, data.alert.counter);
}

/**
 *
 * @param type string
 * @param title string
 */
export const showAlert = (type: string, title: string, callback?: Function, callbackBeforeHide: boolean = true) => {
    if (type == "success") {
        data.alert.class = "success-msg";
        data.alert.title = title;
        data.alert.icon = "fa-check";
    } else if (type == "info") {
        data.alert.class = "info-msg";
        data.alert.title = title;
        data.alert.icon = "fa-info-circle";
    }  else if (type == "warning") {
        data.alert.class = "warning-msg";
        data.alert.title = title;
        data.alert.icon = "fa-warning";
    }  else if (type == "danger") {
        data.alert.class = "error-msg";
        data.alert.title = title;
        data.alert.icon = "fa-times-circle";
    }

    if (typeof callback == "function") {
        fadeIn(callback(), callbackBeforeHide);
    } else {
        fadeIn();
    }
}

export const hideAlert = () => {
    fadeOut(() => {
        data.alert.class = "";
        data.alert.title = "";
        data.alert.icon = "";
    });
}

export const defaultSettings = {
    lang: 'en',
    perPage: 10,
};

export const apiLinks = {
    users: 'https://reqres.in/api/users',
};
