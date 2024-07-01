create table roles(
  id int primary key auto_increment not null,
  name varchar(20) not null
);

INSERT INTO roles(id, name) VALUES 
    (1, "admin"),
    (2, "user");

create table abonnements (
  id int primary key auto_increment not null,
  name varchar(30),
  montant int UNSIGNED not null,
  date_de_paiement date not null,
  date_de_fin date not null
);

create table users (
  id int primary key auto_increment not null,
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
  users_id int not null,
  Foreign Key (users_id) REFERENCES users(id)
);

create table categories (
  id int primary key auto_increment not null,
  name varchar(30) not null,
  image VARCHAR(500) NOT NULL
);

INSERT INTO categories(id, name,image) VALUES 
    (1, "Sport","https://aarp-content.brightspotcdn.com/dims4/default/cc18043/2147483647/strip/true/crop/1279x704+0+0/resize/876x482!/quality/90/?url=http%3A%2F%2Faarp-brightspot.s3.amazonaws.com%2Fcontent%2Faa%2Fc9%2Fcbf66962478cb9e8f92d5641b070%2Fsportsgoat-neiljamieson-1280.jpg"),
    (2, "Actualité","https://static8.depositphotos.com/1391774/933/i/450/depositphotos_9334068-stock-photo-ripped-newspapers.jpg"),
    (3, "Tech","https://e0.pxfuel.com/wallpapers/171/486/desktop-wallpaper-cpu.jpg"),
    (4, "Juniors","https://www.denofgeek.com/wp-content/uploads/2020/03/Best-Kids-TV-Shows-Streaming-in-the-UK-Lead.jpg?fit=1200%2C675");

create table souscats (
  id int primary key auto_increment not null,
  name varchar(30) not null,
  categories_id INT NOT NULL,
  Foreign Key (categories_id) REFERENCES categories(id)
);

INSERT INTO souscats(id, name, categories_id) VALUES 
    (1, "Basket", 1),
    (2, "Foot", 1),
    (3, "Rugby", 1),
    (4, "Information", 2),
    (5, "Politique", 2),
    (6, "E-Sport", 3),
    (7, "Jeux-Vidéos", 3),
    (8, "Informatique", 3),
    (9, "Dessins Animées", 4),
    (10, "Jouets", 4),
    (11, "Divers", 4);

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
