## task 2

https://docs.google.com/document/d/1ynbRd8rZql6x66LfiavELNVPHE0r9tyeLcbKWdjxRLU

```bash
git remote -v
git remote add upstream https://github.com/VictorDanilov/andersen-js-course.git
git fetch upstream

git checkout master
git merge upstream/master

git checkout -b oop-mvc-crafting
git checkout -b oop-mvc-crafting-done
```

---

## DOCS

**task 2** - https://docs.google.com/document/d/1ynbRd8rZql6x66LfiavELNVPHE0r9tyeLcbKWdjxRLU

---

**Webpack. Полный курс 2020** - https://www.youtube.com/watch?v=eSaF8NXeNsA

**Redux. Полный Курс 2020** - https://www.youtube.com/watch?v=YdYyYMFPa44

**Продвинутый TypeScript** - https://www.youtube.com/watch?v=7NU6K4170As

---

**Model-View-Controller** - https://ru.wikipedia.org/wiki/Model-View-Controller

**Drag_and_drop** - https://developer.mozilla.org/ru/docs/Web/Guide/HTML/Drag_and_drop

**bootstrap material** - https://bootstrap-4.ru/docs/4.5/getting-started/introduction/

---

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
npm install -D eslint-config-airbnb // базовые правила, не уверен что нужны
npm install -D eslint-config-airbnb-typescript
npm install -D @typescript-eslint/eslint-plugin
```
