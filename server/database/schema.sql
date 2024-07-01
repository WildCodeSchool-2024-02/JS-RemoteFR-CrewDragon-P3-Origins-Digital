-- SQLBook: Code
-- Utilisateur 

create table roles(
  id int primary key auto_increment not null,
  name varchar(20) not null
);
INSERT INTO roles(id, name) VALUES 
    ("1", "admin"),
    ("2", "user");
create table abonnements (
  id int primary key auto_increment not null,
  name varchar(30),
  montant int UNSIGNED not null,
  date_de_paiement date not null,
  date_de_fin date not null
);

create table users (
  id int  primary key auto_increment not null,
  email varchar(255) not null UNIQUE,
  password varchar(30) not null,
  firstname varchar(30) not null,
  lastname varchar(30) not null,
  birthday date not null,
  roles_id INT NOT NULL,
  abonnements_id INT NOT NULL,
  Foreign Key (roles_id) REFERENCES roles(id),
  Foreign Key (abonnements_id) REFERENCES abonnements(id)
);

  create table sections (
    id int primary key auto_increment not null,
    name varchar(30) not null,
    users_id int  not null,
    Foreign Key (users_id) REFERENCES users(id)
  );

-- categorie 

create table categories (
  id int primary key auto_increment not null,
  name varchar(30) not null
);
INSERT INTO categories(id, name) VALUES 
    ("1", "Sport"),
    ("2", "Actualité"),
    ("3", "Tech"),
    ("4", "Juniors");


create table souscats (
  id int primary key auto_increment not null,
  name varchar(30) not null,
  categories_id INT NOT NULL UNIQUE,
  Foreign Key (categories_id) REFERENCES categories(id)
);
-- Videos 

create table videos (
  id int primary key auto_increment not null,
  title varchar(255) not null,
  description text not null,
  url varchar(255) not null,
  date varchar(10) not null,
  grille VARCHAR(5) DEFAULT "off",
  hero VARCHAR(5) DEFAULT "off",
  carouStatique VARCHAR(5) DEFAULT "off",
  carouDynamique VARCHAR(5) DEFAULT "off",
  freemium VARCHAR(5) DEFAULT "off",
  miniature varchar(255) not null,
  categories_id INT NOT NULL,
  souscats_id INT NOT NULL,
  Foreign Key (categories_id) REFERENCES categories(id),
  Foreign Key (souscats_id) REFERENCES souscats(id)
  );

  create table videos_sections (
    videos_id INT NOT NULL,
    sections_id INT NOT NULL,
    Foreign Key (videos_id) REFERENCES videos(id),
    Foreign Key (sections_id) REFERENCES sections(id),
    PRIMARY KEY (videos_id, sections_id)
  );
