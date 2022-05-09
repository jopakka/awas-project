# AWAS project

### Install MariaDB

If you do not already have MariaDB installed on your computer, you can download it here: [download link](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.6.7&os=windows&cpu=x86_64&pkg=msi&m=xtom_tal)

### Navigate to database client and login as root

Go to your database/bin file (for example C:\Program Files\MariaDB 10.6\bin)

Log in as the root user with:
```
  mysql -u root -p
```
  
Then enter your root password

### Create database and tables

Once you are in the system, create database awas_project and use it
```
  CREATE OR REPLACE DATABASE awas_project;
  USE awas_project;
```

Next, create table "users"
```
  CREATE TABLE IF NOT EXISTS Users(Username VARCHAR(15) NOT NULL, Password VARCHAR(15) NOT NULL, IsAdmin BOOLEAN NOT NULL);
```

Congratulations, you hve now created the database and necessary tables! Now you just need to use the website.
