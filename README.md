# Facebook Clone

- Proyecto en Angular 16.
- Uso de Firebase (Firestore, Authentication, Storage)..
- Tailwind y Flowbite...
- HeroIcons...
- ...


## Creación de las credenciales en Firebase!

Para esto hay que tener una cuenta en google y dirigirnos a la página de <b> Firebase </b> 

<a target="_blank" href="https://firebase.google.com/?hl=es-419">
  <img src="https://skillicons.dev/icons?i=firebase" />
</a>

<br/>

Al entrar en la consola crearemos un proyecto y seleccionaremos los recursos necesarios, por último añadiremos un <b> App web </b> que nos dará nuestra configuración.

En este caso tener crear una carpeta de enviroment y dentro un archivo environment.ts

```ts
// environment.ts
export const environment = {
  firebase: {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  }
};
```

## Un vistazo a la aplicación

Algunos de los aspectos propios del acceso a Fb se mantienen. (Sección funcional!)

![imagen](https://github.com/user-attachments/assets/7f62a023-dfaa-4106-8349-4770ddb44bd9)

![imagen](https://github.com/user-attachments/assets/3abba859-5778-4298-9b63-1b19d8fde91b)

![imagen](https://github.com/user-attachments/assets/c1a88e66-77c6-4612-b4be-4286e4eb675b)


¡Hay otras secciones más por descubrir, inténtelo!
