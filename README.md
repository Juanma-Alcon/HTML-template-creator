# generic-product-statics

Repositorio genérico para crear un nuevo producto estático (HTML) manteniendo un nucleo común entre todos los productos.
Para empezar descargaremos el repositorio en la ubicación que consideremos adecuada.

`git clone git@bitbucket.org:rastreator/generic-product-statics.git`

A continuación navegaremos hasta el directorio /app y ejecutaremos los siguientes comandos de npm:

- `npm install`
- `npm run start-product`

Este último comando se encargará de clonar el repositorio del **"core-components"** dentro de la carpeta core y el repositorio del **"core-framework"** dentro de la carpeta core también.

Ejecutará la tarea `gulp-build`en ambos y creará el enlace simbólico a booststrap dentro del core-framework para que funcionen correctamente los estilos.

Con esto tendremos el proyecto funcionando.

Es interesante conocer las tareas disponibles en gulp:

- **style** -> Compilador de Sass.
- **script** -> Compilador de ficheros JS.
- **html** -> Compilador de ficheros Handlebars a HTML.
- **images** -> Minimiza las imágenes en el proyecto.
- **fonts** -> Generará la fuente de iconos y hará una copia en la carpeta dist de la mismo junto a la tipo Rising Sun.
- **sprite** -> Creará un imagen sprite desde la carpeta img/sprite
- **watch** -> Tarea de desarrollo que esta atenta a cambios ejecutando las tareas anteriores.
- **build** -> Ejecuta todas las tareas secuencialmente creando los htmls finales y copiando la última versión de los ficheros de distribución del framework de CSS.

# Creando páginas para un producto

La tarea `gulp html` tomará los ficheros .hbs de la carpeta pages y buscará los posibles partials utilizados en el mismo.
Estos partials pueden estar contenidos en la carpeta **/partials** del producto o en la carpeta **/core/core-components/partials**.
