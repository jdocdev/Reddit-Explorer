# Reddit-Explorer
 App sencilla para ver los temas en tendencia de reddit

## Como ejecutar 
- en mySQL crear la bd:

CREATE DATABASE IF NOT EXISTS reddit_db;

USE reddit_db;

CREATE TABLE IF NOT EXISTS reddits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    display_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    banner_img VARCHAR(255),
    public_description TEXT,
    description TEXT,
    url VARCHAR(255) NOT NULL
);

- abrir una terminal en la carpeta backend del proyecto y ejecutar el servicio del back con:
node app.js

- abrir una terminal en la carpeta frontend del proyecto y ejecutar el proyecto con:
http-server

- abrir el proyecto en el navegador con la ruta http://127.0.0.1:8080/


