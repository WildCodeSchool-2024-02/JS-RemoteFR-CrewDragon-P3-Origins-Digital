-- Utilisateur 

create table roles(
  id int primary key auto_increment not null,
  name varchar(20) not null
);

create table abonnements (
  id int primary key auto_increment not null,
  name varchar(30),
  montant int UNSIGNED not null,
  date_de_paiement date not null,
  date_de_fin date not null
);

create table users (
  id int  primary key auto_increment not null,
  email varchar(255) not null,
  password varchar(30) not null,
  firstname varchar(30) not null,
  lastname varchar(30) not null,
  birthday date not null,
  roles_id INT NOT NULL,
  Foreign Key (roles_id) REFERENCES roles(id),
  abonnements_id INT NOT NULL,
  Foreign Key (abonnements_id) REFERENCES abonnements(id)
);

  create table sections (
    id int primary key auto_increment not null,
    name varchar(30) not null,
    users_id int  not null,
    Foreign Key (users_id) REFERENCES users(id)
  );

-- Videos 

create table videos (
  id int primary key auto_increment not null,
  title varchar(255) not null,
  description text not null,
  url varchar(255) not null,
  date date not null,
  grille boolean default false,
  hero boolean default false,
  carouStatique boolean default false,
  carouDynamique boolean default false,
  freemium boolean default false,
  miniature varchar(255) not null
  );

  create table videos_sections (
    videos_id INT NOT NULL,
    sections_id INT NOT NULL,
    Foreign Key (videos_id) REFERENCES videos(id),
    Foreign Key (sections_id) REFERENCES sections(id),
    PRIMARY KEY (videos_id, sections_id)
  );



-- categorie 

create table souscats (
  id int primary key auto_increment not null,
  name varchar(30) not null
);

create table categories (
  id int primary key auto_increment not null,
  name varchar(30) not null
);

create table videos_souscats (
    videos_id INT NOT NULL,
    souscats_id INT NOT null,
    Foreign Key (videos_id) REFERENCES videos(id),
    Foreign Key (souscats_id) REFERENCES souscats(id),
    PRIMARY KEY (videos_id, souscats_id)
);


create table souscats_categories (
    souscats_id INT NOT null,
    categories_id INT NOT null,
    Foreign Key (souscats_id) REFERENCES souscats(id),
    Foreign Key (categories_id) REFERENCES categories(id),
    PRIMARY KEY (souscats_id, categories_id)
);

