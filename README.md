# PR Viewer

## Set envs
En el .env tenes que setear el token de github (https://github.com/settings/tokens)

## Instalar librerías de Nodejs
```
docker run -it --workdir='/app' -v $PWD:/app node:10 npm i
```

# Ejecutar comandos en el contenedor
```
docker run -it --workdir='/app' -v $PWD:/app -p 9000:8080 node:10 ${comandos}
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
