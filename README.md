# generic-product-statics

Repositorio genérico para crear un nuevo producto estático (HTML) manteniendo un nucleo común entre todos los productos.
Para empezar descargaremos el repositorio en la ubicación que consideremos adecuada.

`git clone git@bitbucket.org:rastreator/generic-product-statics.git`

# Requisitos mínimos
Para poder trabajar es necesario disponer:

- [NodeJS](https://nodejs.org/) (versión mínima 8)
- NPM (versión mínima 5)
- [GIT](https://git-scm.com/) (command line)
- [gulp-cli](https://gulpjs.com/) (command line)

# Inicializar el proyecto
A continuación navegaremos hasta el directorio /app y ejecutaremos los siguientes comandos de npm:

- `npm install`
- `npm run start-product`

Este último comando se encargará de clonar el repositorio del **"core-components"** dentro de la carpeta core y el repositorio del **"core-framework"** dentro de la carpeta core también y cambiará automáticamente los repositorios de la rama **master** a **dev**.

Ejecutará la tarea `gulp-build`en ambos y creará el enlace simbólico a booststrap dentro del core-framework para que funcionen correctamente los estilos.

Con esto tendremos el proyecto funcionando por la primera vez.

Es interesante conocer las tareas disponibles en gulp:

- **symlink** -> Creará un enlace simbólico de TW Bootstrap (node_modules) a bootstrap dentro del core-framework.
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

# Actualizando los repositorios

Todos los repositorios tienen las ramas **master** y **dev** protegidas contra escritura y sólo se pueden actualizar mediante **Pull Request** desde BitBucket.

Para poder actualizar una rama se debe hacer desde una nueva rama y solicitar a los administradores una nueva PR.

-------

#### English Documentation

# generic-product-statics

Generic repository to create a new static product (HTML) maintaining a common core among all the products.
To begin we will download the repository in the location that we consider appropriate.

`git clone git@bitbucket.org: rastreator / generic-product-statics.git`

# Minimum requirements
In order to work, it is necessary to have:

- [NodeJS](https://nodejs.org/) (minimum version 8)
- NPM (minimum version 5)
- [GIT](https://git-scm.com/) (command line)
- [gulp-cli](https://gulpjs.com/) (command line)

# Initialize the project
Next we will navigate to the / app directory and execute the following npm commands:

- `npm install`
- `npm run start-product`

This last command will be responsible for cloning the repository of the **"core-components"** inside the core folder and the repository of the **"core-framework"** within the core folder as well and will automatically change the repositories of the branch **master** to **dev**.

It will execute the `gulp-build` task in both and will create the symbolic link to booststrap within the core-framework so that the styles work correctly.

With this we will have the project working for the first time.

It is interesting to know the tasks available in gulp:

- **symlink** -> Create a symbolic link from TW Bootstrap (node_modules) to bootstrap within the core-framework.
- **style** -> Sass compiler.
- **script** -> JS file compiler.
- **html** -> File compiler Handlebars to HTML.
- **images** -> Minimize the images in the project.
- **fonts** -> It will generate the icon font and make a copy in the dist folder of the same next to the Rising Sun type.
- **sprite** -> Create a sprite image from the img / sprite folder
- **watch** -> Development task that is aware of changes executing the previous tasks.
- **build** -> Execute all the tasks sequentially creating the final htmls and copying the latest version of the CSS framework distribution files.

# Creating pages for a product

The `gulp html` task will take the .hbs files from the pages folder and search the possible partials used in it.
These partials can be contained in the folder **/partials** of the product or in the folder **/core/core-components/partials**.

# Updating the repositories

All repositories have the branches **master** and **dev** protected against writing and can only be updated using ** Pull Request ** from BitBucket.

To be able to update a branch, you must do it from a new branch and ask the administrators for a new PR.
