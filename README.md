# Тестовое задание SPA приложение (интернет магазин) React + TS + Mui

## ФИО: Кравченко Вячеслав

## Деплой: https://internet-shop-react-ts-mui.netlify.app

## Запуск проекта
1. Команды для запуска
    ```
        git clone url
        npm i //файл npmrs имеет опцию legacy-peer-deps=true
        npm start
    ```
2. Ключи API
   - API магазина(https://dummyjson.com/) - не нужно
   - API yandex map: нужно указать по аналогии с env_example: [api yandex](https://developer.tech.yandex.ru/)

## Информация о доступах (логины/пароли итд):
- API не имеет логику на insert новых пользователей в БД для регистрации (p.s. подробнее об API в блоке "Описание проекта")

## Описание проекта:
1. Использовалось 3 брэкпоинта у API (соответственно все сортировки, исключающие фильтры реализованы на фронте):
    - все товары: `https://dummyjson.com/products`
    - полная информация об 1 товаре: `https://dummyjson.com/products/1`
    - категории: `https://dummyjson.com/products/categories`
2. Реализовано 2 пользовательских хука
    - useFetch;
    - useLocalStorage - хранение в localStorage данных, добавленных в карзину. Именно таким способом реализована работа с ней. (p.s. брэкпоинты post, put, delete операции API не подразумевают изменения данных в БД)
3. Для добавления адреса в оформлении заказа использовалась React Yandex Maps (ключ скрыт в проекте)
4. Разворачивание проекта осуществляется с помощью create-react-app
