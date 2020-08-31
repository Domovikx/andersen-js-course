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

## DOCS

- https://ru.wikipedia.org/wiki/Model-View-Controller

- Webpack. Полный курс 2020 - https://www.youtube.com/watch?v=eSaF8NXeNsA
- Redux. Полный Курс 2020 - https://www.youtube.com/watch?v=YdYyYMFPa44
- Продвинутый TypeScript. - https://www.youtube.com/watch?v=7NU6K4170As

## TS

```bash
npm init -y
npm install -D typescript
npm install -g typescript
tsc -v

tsc --init
tsc // комманда для компиляции
```
