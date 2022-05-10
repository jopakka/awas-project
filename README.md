# AWAS project

### Install MariaDB

If you do not already have MariaDB installed on your computer, you can download it here: [download link](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.6.7&os=windows&cpu=x86_64&pkg=msi&m=xtom_tal)

### Navigate to database client and login as root

Go to your database/bin file (for example C:\Program Files\MariaDB 10.6\bin)

Log in as the root user with:
```
mysql -u root -p
```
  
Then enter your root password (you decided it during installation)

### Create database and tables

Once you are in the system, create database awas_project and use it
```
CREATE OR REPLACE DATABASE awas_project;
USE awas_project;
```

Next, create table "users"
```
CREATE TABLE IF NOT EXISTS Users(
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  Username VARCHAR(15) NOT NULL,
  Password VARCHAR(15) NOT NULL,
  IsAdmin BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);
```

Next, create table "products"
```
CREATE TABLE IF NOT EXISTS Products(
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  ProductName VARCHAR(30) NOT NULL
  ProductDescription VARCHAR(500) NOT NULL,
  UserId MEDIUMINT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (UserId) REFERENCES USERS(id)
);
```

Next, create a database admin account and grant the user privileges
```
CREATE USER 'awasUser'@localhost IDENTIFIED BY 'password1';
  
GRANT ALL PRIVILEGES ON awas_project.* TO awasUser@localhost;
  
FLUSH PRIVILEGES;
```

Congratulations, you have now created the database and necessary tables! Now you just need to use the website.


## Vulnerabilities

### Bypassing access controls
Go to register page, and open page source code

navigate to

```
<label style="display: none">Admin
  <input type="checkbox" name="admin" disabled>
</label><br>
```

now go back to the register page, and open inspect element tool

navigate to the HTML section above (you can use the page source code as a guide to navigate there easier)

then simply replace "none" with "block" and remove "disabled"

Check the box and enter new user credentials. Click register. You have now created an admin account.

### Code injections
First, log in as any user (register first if you have not created an account yet)

Then, in the main page, click on the "create product" button

Enter any value into the title

For the description, paste the following code:

```
", 1) UNION SELECT Username, IsAdmin, id FROM users#
```

You should see some more product postings, but the titles have been replaced with usernames and description with the IsAdmin value

Now that you can see which users are admins, you can get their passwords with

```
", 1) UNION SELECT Username, Password, id FROM users#
```

Next, logout from your current user and log in as either another regular user or as an admin with the stolen credentials.

### SQL dump file with dirbuster

Not yet implemented

