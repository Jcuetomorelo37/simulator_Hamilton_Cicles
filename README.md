# Bucador de Ciclos Hamiltonianos

 ⚠️Recuerda tener Git y Node.js instalados y configurados correctamente en tu pc antes de continuar⚠️

 Sitio web de Node.js:
 ```
 https://nodejs.org/en
```


 Sitio web de Git:

 ```
 https://git-scm.com/downloads/win
```
 

Clona el repositorio en tu pc
```
git clone https://github.com/Jcuetomorelo37/simulator_Hamilton_Cicles.git
```

Instala las dependencias de Electron
```
npm install
```

Ejecuta la aplicacion
```
npm start
```

⚠️Ten en cuenta que al ingresar tu matriz de adyacencia, debes marcar o desmarcar el Checkbox de "Dirigido?" ubicado a la derecha⚠️

Si gustas puedes empaquetar e instalar la app en tu sistema:

Instalar Electron
```
npm install electron --save-dev
```

Instalar el empaquetador
```
npm install -g electron-packager
```

Crear una distribucion de la app para windows
```
electron-packager . my-app --platform=win32 --arch=x64 --out=dist --overwrite
```

al final veras que se crea un directorio 'dist' dentro de tu proyecto... 
ahi encontraras el .exe de la app... 
Listo! Ahora puedes ejecutar tu app con un solo click!
