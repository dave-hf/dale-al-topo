# Dale Al Topo

Este proyecto ha sido realizado en React utilizando npx create-react-app y está diseñado para funcionar como una Progressive Web App (PWA),
del juego tipo "whack a mole" llamado "Dale al Topo", con un toque más, digamos "local".

Puedes ver el juego desplegado en:
https://topos.davidhf.space/

## Instrucciones para ejecutar la aplicación localmente

* Primero, asegúrate de tener instalado Node.js y npm.
* Clona este repositorio en tu máquina local usando `git clone https://github.com/dave-hf/dale-al-topo.git`.
* Navega a la carpeta del proyecto clonado usando `cd dale-al-topo`.
* Instala todas las dependencias necesarias utilizando `npm install`.
* Para iniciar la aplicación en modo de desarrollo, ejecuta `npm start`.
La aplicación se ejecutará en modo desarrollo y estará disponible en http://localhost:3000 en tu navegador. También tendrás acceso a los errores identificados por el linter en la consola, los cuales son parte de las Herramientas de análisis estático.

## Estructura del Proyecto

El proyecto está compuesto principalmente por cuatro archivos de componentes de React:

App.js: Este es el componente principal que mantiene el estado del nombre del usuario y la ruta actual. Pre-carga las imágenes y ajusta el tamaño de la vista de forma dinámica.

Home.js: Este es el componente de la página de inicio. Aquí es donde los usuarios pueden ingresar su nombre.

Game.js: Este es el componente principal del juego. Mantiene el estado de la puntuación, la dificultad, las posiciones de los topos, la música y el temporizador entre otras cosas. Gestiona la lógica del juego.

MoleGrid.js: Este componente renderiza la cuadrícula del juego, y se encarga de mostrar y ocultar los topos basándose en la información recibida de Game.js.

## Tests

Dentro de este proyecto, se ha prestado especial atención a la calidad del código y a la cobertura de tests. Los tests unitarios de las vistas y de los componentes de la aplicación se pueden encontrar en la carpeta src/__tests__. Estos tests buscan asegurar que cada componente funcione como se espera y que la lógica del negocio esté correctamente implementada. Para ejecutar los test, una vez tenemos la biblioteca de pruebas instalada, simplemente necesitamos usar el siguiente comando en la terminal del proyecto:
`npm test`

## Alojamiento

La aplicación se aloja en un servidor VPS propio. Se ha optado por esta solución para tener un mayor control sobre el entorno de ejecución.


## Licencias

Los "assets" de imagen y audio utilizados en este proyecto se encuentran bajo licencia, la cual ha sido legalmente obtenida para su uso de la plataforma Envato Elements. Puedes encontrar la información detallada sobre estas licencias en la ruta /licenses del repositorio. 
