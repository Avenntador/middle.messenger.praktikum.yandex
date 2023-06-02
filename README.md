# Проект первого модуля - мессенджер

### UI - https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0-1
### Деплой на Netlify - [https://bucolic-cascaron-d42cc8.netlify.app/](https://bucolic-cascaron-d42cc8.netlify.app)

## 4 спринт


### Выполнены все пункты из чек листа четвертого спринта:
  
  - Написаны тесты для роутера, компонента, модуля отправки запросов, использованы библиотеки - mocha, chai, sinon
  - Для запуска тестов команда ```npm run test```
  - Удален parcel и настроен webpack для бандлинга приложения, установлены loader'ы для работы с typescript, scss и handlebars
  - Настроена сборка приложения в docker контейнер
  - Для создания docker image используйте команду 
    ```docker build -t sprint4 .```
   - Для запуска контейнера используйте команду ```docker run -d -p 3000:3000 sprint4```
  - В настоящее время сервис heroku не доступен в нашем регионе, поэтому пункт с размещением docker cборкой не реалзиован
  - Настроен precommit на библиотеке husky для проекта, при попытке коммита запустится ```npm run test && npm run eslint && npm run stylelint```, при ошибке код не будет закомичен
