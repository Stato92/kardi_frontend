# Kardi
A working prototype of application supporting the work of cardiac surgery department.

## Introduction
This is a Vue.js single-page application which is designed to work with the backend part (https://github.com/Stato92/kardi_backend). It was created to help planning surgeries and managing patients in a specific cardiac surgery department of one of the Szczecin's hospitals. Due to shortcomings of hospital's software, the doctors needed an individual solution to fulfill their needs. The prototype is using Google Calendar API to manage events and notifications. You can sign in with username and password (for limited access) or using Google Sign-In.

## Main features
* managing patients (search, add, edit, delete), patient files (preview, upload, download, delete), patient comments (add, edit, delete), patient statuses (add, edit, delete)
* managing events (add, edit, delete)
* managing notifications (add, edit, delete)
* auto log out after certain inactivity time
* real-time notifications
* real-time updates
* real-time chat (not finished)

## Technologies
* vue 2.6.11
* vuex 3.0.1
* vue-router 3.1.5
* @vue/cli-service 4.2.2
* axios 0.19.2
* laravel-echo 1.6.1
* pusher-js 5.1.1
* moment 2.24.0
* body-scroll-lock 2.6.4
* lodash.debounce 4.0.8
* tailwindcss 1.2.0
* animate.css 3.7.2
* vue-gapi 0.1.0
* vue-good-table 2.18.1
* vue-snotify 3.2.1
* vue-textarea-autosize 1.1.1
* vue2-dropzone 3.6.0
* v-calendar 1.0.1
* @johmun/vue-tags-input 2.1.0,
* prettier 1.19.1
* purgecss 1.4.2
* autoprefixer 9.7.4
* @fullhuman/postcss-purgecss 1.3.0
* babel-eslint 10.0.3
* eslint 5.16.0
* eslint-plugin-prettier 3.1.2
* eslint-plugin-vue 6.1.2
* vue-template-compiler 2.6.11

## Interface
### Logging in
![Logging in](https://github.com/Stato92/kardi_frontend/blob/master/docs/logowanie_shorter.gif)

### Main menu
![Main menu](https://github.com/Stato92/kardi_frontend/blob/master/docs/prezentacja%20menu.gif)

### Adding patient
![Adding patient](https://github.com/Stato92/kardi_frontend/blob/master/docs/dodawanie%20pacjenta.gif)

### Editing patient
![Editing patient](https://github.com/Stato92/kardi_frontend/blob/master/docs/websockety%20edytowanie%20pacjenta.gif)

### Removing patient
![Removing patient](https://github.com/Stato92/kardi_frontend/blob/master/docs/websockety%20usuwanie%20pacjenta.gif)

### Filtering patients
![Filtering patients](https://github.com/Stato92/kardi_frontend/blob/master/docs/filtrowanie%20pacjent%C3%B3w.gif)

### Sorting patients
![Sorting patients](https://github.com/Stato92/kardi_frontend/blob/master/docs/sortowanie%20pacjent%C3%B3w.gif)

### Patients search
![Patients search](https://github.com/Stato92/kardi_frontend/blob/master/docs/wyszukiwanie_pacjentow.gif)

### Adding patient comment
![Adding patient comment](https://github.com/Stato92/kardi_frontend/blob/master/docs/dodawanie%20komentarza%20do%20pacjenta.gif)

### Editing patient comment
![Editing patient comment](https://github.com/Stato92/kardi_frontend/blob/master/docs/edycja%20komentarza.gif)

### Multifunctional button
![Multifunctional button](https://github.com/Stato92/kardi_frontend/blob/master/docs/multifunkcyjny%20przycisk.gif)

### Previewing patient file
![Previewing patient file](https://github.com/Stato92/kardi_frontend/blob/master/docs/podgl%C4%85d%20pliku%20pacjenta.gif)

### Search
![Search](https://github.com/Stato92/kardi_frontend/blob/master/docs/wyszukiwarka.gif)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
