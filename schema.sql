CREATE DATABASE bamazon_db;

USE bamazon_db;

create table products(

id int not null AUTO INCREMENT,
productName varchar(50) not null,
departmentName varchar(50) not null, 
price int,
stockQuantity int,
primary key (id)
);

SELECT * FROM products;