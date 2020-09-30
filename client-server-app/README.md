# client-server-app

- https://docs.google.com/document/d/1egIDLGZUy-2fuMHQ3RjeLRCkNt1o67osoGfNsP3GUck

## how to run

- npm i -g webpack-dev-server
- npm i -D webpack webpack-cli webpack-dev-server

## GIT commands helper

```bash
git remote -v
git remote add upstream https://github.com/VictorDanilov/andersen-js-course.git
git fetch upstream

git checkout master
git merge upstream/master

git checkout -b client-server-app
git checkout -b client-server-app-done
```

---

## Tutorial

**Webpack. Полный курс 2020** - https://www.youtube.com/watch?v=eSaF8NXeNsA

**Продвинутый TypeScript** - https://www.youtube.com/watch?v=7NU6K4170As

**Пишем API на NodeJS** - https://www.youtube.com/watch?v=fHoKs66Z2qQ&list=PLY4rE9dstrJzrDaSPKOrhNgQ19GhVl19u

---

**Model-View-Controller** - https://ru.wikipedia.org/wiki/Model-View-Controller

**bootstrap material** - https://bootstrap-4.ru/docs/4.5/getting-started/introduction/

---

### HTTP Status Codes

- https://httpstatuses.com/ - HTTP Status Codes
- https://ru.wikipedia.org/wiki/Список_кодов_состояния_HTTP

---

## Soft

- **Postman** - https://www.postman.com/downloads/

## TS

```bash
npm init -y
npm install -D typescript
npm install -g typescript
tsc -v

tsc --init // команда создания конфига
tsc // команда для компиляции
tsc --watch // команда для автокомпиляции
```

хорошая статья про настройку конфига - http://vanilla-js.blogspot.com/2018/02/typescript-tsconfigjson.html

---

## SASS

```bash
npm install -g sass // глобальная установка
sass --watch src/assets/scss:src/public/stylesheets // отслеживание и компиляция SCSS/CSS
```

---

## DEVELOP

в начали посмотреть скрипты в package.json

```bash
tsc // команда для компиляции
tsc --watch // команда для автокомпиляции
sass --watch src/assets/scss:src/public/stylesheets // отслеживание и компиляция SCSS/CSS
```

---

## Webpack подключение и настройка

```bash
npm install -D webpack // устанавливаем сам webpack
npm install -D webpack-cli // webpack cli
npm install -D html-webpack-plugin
npm install -D clean-webpack-plugin

npx webpack // тестовый запуск

npm install -D webpack-dev-server // поставим сервер

// работа с файлами
npm install -D file-loader

// для копирования статических файлов например favicon
npm install -D copy-webpack-plugin

// работа с css
npm install -D style-loader // добавляет стили в head > style > html, это НЕ надо!
npm install -D css-loader //
// тут пробую делать минификацию
npm install -D mini-css-extract-plugin // минификация css, работает но без minify
npm install -D terser-webpack-plugin // minify css
npm install -D optimize-css-assets-webpack-plugin // может это поможет

// sass - ставим два пакета
npm install -D node-sass // корневой функционал для sass/scss
npm install -D sass-loader // для вебпака sass/scss

// подключаем babel для поддержки последних фич жс
npm install -D babel-loader @babel/core
npm install --save @babel/polyfill // нужно ставить еще полифилы!
npm install -D @babel/preset-typescript // поддержка TS
```

## eslint-config-airbnb-typescript

```bash
npm install -D eslint
npm install -D eslint-config-airbnb
npm install -D eslint-config-airbnb-typescript
npm install -D @typescript-eslint/eslint-plugin
```

## Socket.IO

- https://coderlessons.com/tutorials/kompiuternoe-programmirovanie/uznaite-socket-io/socket-io-kratkoe-rukovodstvo
- https://socket.io/docs/server-api/#server-path-value
