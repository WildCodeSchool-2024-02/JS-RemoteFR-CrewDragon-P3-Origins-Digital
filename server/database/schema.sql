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
    (6, "Star", 2),
    (7, "E-Sport", 3),
    (8, "Jeux-Vidéos", 3),
    (9, "Informatique", 3),
    (10, "Dessins Animées", 4),
    (11, "Jouets", 4),
    (12, "Divers", 4);

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
  miniature varchar(255)  null,
  categories_id INT NOT NULL,
  souscats_id INT NOT NULL,
  Foreign Key (categories_id) REFERENCES categories(id),
  Foreign Key (souscats_id) REFERENCES souscats(id),
   duree TIME
);

INSERT INTO videos (categories_id, souscats_id, url, title, description, date, duree) VALUES
-- Catégorie Sport
(1, 1, 'https://www.youtube.com/watch?v=PZ7skZh0hCY', 'Résumé : La RÉACTION pour les MAVS ou la passe de DEUX pour les Celtics ?', 'Malgré un scénario plus serré, Dallas doit encore s\'incliner à Boston L\'étonnant duo Holiday-White a fait déchanter les Mavericks ! En triple-double, Luka Dončić s\'est de nouveau retrouvé bien seul...', '2024-06-10', '10:56'),
(1, 1, 'https://www.youtube.com/watch?v=ua-xR4SFXAs', 'The Top 100 Plays of the 2024 NBA Season', 'The Best Moments from the 2024 NBA Season! This video showcases the craziest buzzer beaters, game winners, dunks, posterizers, blocks, ankle breakers and so much more! It features NBA stars like LeBron James, Steph Curry, Luka Doncic, Victor Wembanyama and more!', '2024-04-16', '23:09'),
(1, 1, 'https://www.youtube.com/watch?v=-zcIsk6GE6Q', 'The Top 100 Plays of the 2023-24 NBA Regular Season', 'Never miss a moment with the latest news, trending stories and highlights to bring you closer to your favorite players and teams.', '2024-04-22', '44:20'),
(1, 2, 'https://www.youtube.com/watch?v=xpuDroEWm7g', 'France - Luxembourg : le RÉSUMÉ de la répétition des Bleus avant l\'Euro 2024 !', 'Revivez le résumé de la rencontre opposant la France en Luxembourg, qui s\'est jouée mercredi soir à Metz dans le cadre de la préparation avant l\'Euro 2024 !', '2024-06-06', '9:53'),
(1, 2, 'https://www.youtube.com/watch?v=MBM99Jr7K_8', 'Actions de Génie dans le Foot 2024', 'Amazing Skills & Goals by the Best Players! A compilation of best moments of in 2023-2024 HD', '2024-03-07', '22:46'),
(1, 2, 'https://www.youtube.com/watch?v=rYavVNNE8Ac', 'Ces CRACKS qui vont tout DÉTRUIRE pendant l\'EURO 2024', 'Mbappé, Bellingham, Musiala ou bien Foden. Tous les fans du ballon rond ne demandent qu’à voir ces stars faire briller avec leur pays durant l\'Euro 2024 qui connaît son coup d\'envoi ce vendredi 14 juin.', '2024-06-11', '8:02'),
(1, 3, 'https://www.youtube.com/watch?v=CwhgCxZ8Qyc', 'Le STADE TOULOUSAIN remporte la CHAMPIONS CUP dans un MATCH DINGUE !!', 'Poussé en prolongations dans un MATCH DINGUE, le STADE TOULOUSAIN bat le Leinster et REMPORTE la compétition ! C\'est la 6eme fois que les Toulousains soulèvent ce trophée ! ', '2024-05-25', '24:46'),
(1, 3, 'https://www.youtube.com/watch?v=mUiLIO05RDA', 'Rugby : TOUS les résumés des clubs FRANÇAIS du week-end européen', 'Inarrêtable, Toulouse donne une leçon au Racing 92 ! Castres y a cru jusqu\'au bout... Clermont se fait très peur mais sera en quarts ! La Rochelle miraculée chez les Stormers ! Dans un festival d\'essais, l\'UBB gifle les Saracens ! À 12 contre 15 Montpellier n\'a pas résisté à l\'Ulster ', '2024-06-08', '58:26'),
(1, 3, 'https://www.youtube.com/watch?v=Tl-Wspys0Rw', 'Qualif Coupe du monde 2026 : Le Maroc surclasse le Congo grâce à Ounahi et un triplé d\'El-Kaabi', 'Grâce notamment à un triplé d\'Ayoub El-Kaabi, le Maroc a surclassé le Congo (6-0) et enchaîne les victoires en qualifications pour la Coupe du Monde 2026.', '2024-06-11', '8:00');
INSERT INTO videos (categories_id, souscats_id, url, title, description, date, duree) VALUES
-- Catégorie Actualité
 -- Information
    (2, 4, 'https://www.youtube.com/watch?v=OYdg-INz4CA', 'Un trouvaille mystérieuse étonne les chercheurs américains', 'En Alaska, une découverte intrigue les scientifiques. Des explorateurs ont remonté du fond des océans un mystérieux objet.', '2023-09-11', '2:10'),
    (2, 4, 'https://www.youtube.com/watch?v=5KkFoFyXe3g', 'Elon Musk Dévoile les Découvertes CHOC de l\'US Navy en Plongée Océanique', 'Les profondeurs de l\'océan fascinent les êtres humains depuis des siècles. Nous avons voyagé vers les horizons bleus à la recherche de nouvelles civilisations et d\'aventures depuis le début des temps. Il va sans dire que les eaux de la Terre sont indéniablement vastes et énigmatiques. Sur Terre, 98 % de l\'espace est occupé par l\'eau. Par conséquent, il n\'est pas surprenant que lorsque les gens les ont explorées, ils ont découvert des choses assez étranges. Eh bien, cette fois-ci, la marine en collaboration avec le génie technologique Elon Musk a découvert quelque chose de si terrifiant qu\'ils ont dû le partager avec le reste d\'entre nous.', '2023-09-03', '20:28'),
    (2, 4, 'https://www.youtube.com/watch?v=sBeMtufsj8k', 'Nouvelle découverte en périphérie de l\'Antarctique qui effraie les scientifiques !', 'Tu ne croiras pas les choses incroyables qui se cachent vraiment dans les glaces éternelles de l\'Antarctique ! Des découvertes d\'os inexplicables, des phénomènes surnaturels et même les traces d\'une civilisation perdue : Beaucoup de ces découvertes sont si troublantes et bizarres que même les chercheurs les plus expérimentés reculent devant elles ! Mais qu\'est-ce qui se cache derrière ces découvertes spectaculaires - et quels incroyables secrets le continent glacé nous cache-t-il encore ? Reste à l\'écoute et découvre-le avec nous !', '2023-09-12', '10:34'),

    -- Politique
    (2, 5, 'https://www.youtube.com/watch?v=YhAeaP5D8T4', 'Européennes 2024 : le RN en tête, les premières estimations des résultats', '🗳️ Découvrez les premières estimations des résultats des élections européennes. La liste de Jordan Bardella (RN) arrive largement en tête, suivie de celles de Valérie Hayer (Renaissance) et de Raphaël Glucksmann (PS-Place Publique).', '2024-06-09', '15:56'),
    (2, 5, 'https://www.youtube.com/watch?v=XSw3lpqFYNY', 'Rachida Dati : Éric Ciotti a fait le choix de diviser la France', 'Rachida Dati, ministre de la Culture, répond aux questions de Laurence Ferrari au sujet du décès de François Hardy, de la dissolution de l\'Assemblée nationale, du résultat des élections européennes, des alliances qui se forment en vue des élections législatives et plus particulièrement de celle entre les LR d\'Eric Ciotti et le Rassemblement national.', '2024-06-12', '15:45'),
    (2, 5, 'https://www.youtube.com/watch?v=_cCTNpRltg8', '🔴 DIRECT - L\'intégrale de l\'interview de Xavier Bertrand, président LR de la région Hauts-de-France', 'Tous les matins, Apolline de Malherbe reçoit chaque jour la personnalité qui fait l’actualité dans son Face à face. Politiques, femmes et hommes issus de la société civile, grands patrons… se succéderont à son micro. En simultané sur BFMTV. RMC, la radio Info Talk Sport. Depuis deux décennies, c\'est neuf heures d\'information du lundi au vendredi, pour débattre et échanger sur l\'actualité. A travers la pré-matinale Charles Matin, la matinale d\'Apolline Matin, l\'interview politique d\'Apolline de Malherbe, les débats animés des Grandes Gueules et d\'Estelle Midi, RMC donne chaque jour la parole aux Français, sans compromis et avec respect. RMC c\'est également la radio n°1 sur le sport. Chaque jour, l’antenne est mobilisée pour être au plus près des grandes compétitions sportives. Informations exclusives, invités d’exception, analyses et débats sur l’actualité… Avec 52 semaines par an, tous les jours de 15h à minuit, les journalistes et la Dream Team RMC continuent de faire vivre aux auditeurs, le meilleur du sport, à travers les émissions Super Moscato Show, Rothen s\'enflamme ou encore l\'After Foot.', '2024-06-12', '19:10'),

    -- Star
    (2, 6, 'https://www.youtube.com/watch?v=xOp3JvQga18', 'Orelsan : La célébrité ça déçoit', 'Idole d’une génération, bête noire pour certains politiques qui s’offusquent de ses textes, jugés sexistes ou outranciers, Orelsan raconte son ascension aux premières places du rap français.', '2023-02-01', '9:23'),
    (2, 6, 'https://www.youtube.com/watch?v=z9-0FYBiVAg', 'Top 10 des CÉLÉBRITÉS qui sont MÉCHANTES avec leurs FANS !', 'Alors selon vous, quelle est la célébrité la plus méchante avec ses fans ? Justin Bieber ? Kanye West ? Ariana Grande ? Chris Brown ? Joignez-nous pour le décompte de cette liste des 10 personnalités qui traitent mal leurs admirateurs.', '2017-06-29', '10:47'),
    (2, 6, 'https://www.youtube.com/watch?v=NBElzosmpYI', 'Qui est la personnalité Française préférée des Américains?', 'J’ai demandé aux Américains qui sont leurs célébrités françaises préférées. Que penses-tu de leurs réponses?', '2024-04-26', '11:08');


INSERT INTO videos (categories_id, souscats_id, url, title, description, date, duree) VALUES
-- Catégorie Tech
(3, 7, 'https://www.youtube.com/watch?v=mkvfbr5Atfc', 'Pourquoi les carrières Esport sont courtes ?', 'Rare sont les joueurs professionnels d\'esport à rester plus de quelques années sur le devant de la scène. Pourquoi les carrières sont si courtes ? Est-ce seulement une question de réflexe et de temps de réaction ? C\'est les questions qu\'on se pose aujourd\'hui.', '2024-06-11', '09:54'),
(3, 7, 'https://www.youtube.com/watch?v=KVYvLvvU9iU', 'G2 vs SK, quel BANGER entre Caps et Nisqy ! | LEC Summer 2024', 'Suivez la compétition sur OTP LoL !', '2024-06-10', '01:03:25'),
(3, 7, 'https://www.youtube.com/watch?v=HHaJiF55gIw', 'Grand Final! Sentinels vs LOUD | Champions Tour 2024: Americas Kickoff 2024', 'Subscribe for More Professional Valorant Content , Road to 200k Subscribers.', '2024-03-04', '03:54:47'),
(3, 8, 'https://www.youtube.com/watch?v=3LP3URouGAE', 'LES NEWS CITY OF THE WOLVES - BlaBlaSton #38', 'On discute des nouveaux persos annoncés de CotW et des commentaires sur l\'avenir de SNK / KOF et FATTAL FURY par SNK au SGF. Quelques nouveaux replays présentés aussi en fin de BlaBlaSton, annonce sur les prochains tournois et attente sur 2XKO', '2024-06-11', '45:38'),
(3, 8, 'https://www.youtube.com/watch?v=Gr78-FI1EVU', 'TOUTE UNE ÉPOQUE | Metal Slug Tactics (découverte)', 'Découverte de la démo Steam Neo Fest de Metal Slug Tactics, Un spinoff tactical RPG de cette série mythique avec une fidélité visuelle/sonore à l\'oeuvre originale bluffante !', '2024-06-11', '40:11'),
(3, 8, 'https://www.youtube.com/watch?v=UBpW9ZmcfhA', 'STAR WARS OUTLAWS : J\'y ai JOUÉ pendant 1 HEURE en AVANT-PREMIÈRE 🔥 Mon 1ER TEST', 'Subscribe for More Professional Valorant Content , Road to 200k Subscribers.', '2024-06-11', '14:53'),
(3, 9, 'https://www.youtube.com/watch?v=Fi5NcGYNKlw', 'Comment apprendre à CODER en partant de ZÉRO', 'Au début, on ne sait pas par où commencer. Il y a tellement de langages, de mots compliqués, qu\'on est complètement perdu. Mais dans cette vidéo, je vais t\'expliquer comment faire pour apprendre la programmation étape par étape, et tu verras qu\'à la fin de la vidéo tu sauras précisément par où commencer !', '2024-05-20', '12:41'),
(3, 9, 'https://www.youtube.com/watch?v=70kNCbJvN20', 'Quelle est la MEILLEURE Formation en INFORMATIQUE ?', 'Salut à tous, je m\'appelle Antoine, j\'ai 20 ans et je suis actuellement étudiant en informatique. Aujourd\'hui, je vais vous parler de la meilleure formation en informatique, et surtout des différents types de formations que vous pouvez suivre pour devenir informaticien. Donc si vous êtes intéressé, restez bien jusqu\'à la fin de la vidéo pour ne rien manquer !', '2024-06-09', '18:32');

INSERT INTO videos (categories_id, souscats_id, url, title, description, date, duree) VALUES
-- Catégorie Juniors
    -- Dessins Animées
    (4, 10, 'https://www.youtube.com/watch?v=ZlIcCus9r94', 'Peppa Pig Français | Un long voyage en train | Dessin Animé Pour Bébé', 'Bienvenue sur la chaîne officielle Peppa Pig. Nous avons créé tout un univers autour de Peppa avec des épisodes et des compilations pour ravir tous les fans. Amuse-toi et n\'oublie pas de t\'abonner pour être le premier à découvrir les nouveaux épisodes, compilations et extraits!', '2021-10-07', '31:31'),
    (4, 10, 'https://www.youtube.com/watch?v=m17kGGjd7s0', 'PAW Patrol | La Pat\' Patrouille se déguise en pirates, chevaliers et autres | Nickelodeon Jr. France', 'Parfois, les missions de sauvetage de la Pat\' Patrouille nécessitent des uniformes spéciaux, comme lorsque Chase, Ryder, Stella et d\'autres chiots se déguisent en pirates, chevaliers et vaches pour sauver la situation !', '2024-04-22', '14:41'),
    (4, 10, 'https://www.youtube.com/watch?v=NBElzosmpYI', 'Un Pichu solitaire ! Le premier épisode de la série Pokémon, les voyages !', 'Regardez le premier épisode de Pokémon, les voyages, et découvrez Sacha et Pikachu quand ils n’étaient pas encore partenaires.', '2020-09-10', '23:46'),

    -- Jouets
    (4, 11, 'https://www.youtube.com/watch?v=PdnnStAIFus', 'Vidéos avec jouets. Cars Quatre Roues. Flash McQueen enfreint le code de la route', 'Voici une nouvelle compilation des vidéos avec jouets des Cars Quatre Roues. Flash McQueen se précipite toujours à la course, roule à grande vitesse et fait plein d’infractions du Code de la route à cause de ça. C\'est très mauvais et même dangereux! Regardez dans quelles situations dangereuses Flash McQueen se retrouve. C\'est bien qu\'il a des amis qui l\'aident toujours.', '2021-05-28', '16:32'),
    (4, 11, 'https://www.youtube.com/watch?v=zY-rZ3tZsZ8', 'Les Enfants PASSENT La NUIT Dans Un MAGASIN DE JOUETS', 'Aujourd\'hui, Les Enfants PASSENT La NUIT Dans Un MAGASIN DE JOUETS et on a vraiment eu trop de plaisir !!!! On espère que vous allez aimer autant que nous avons adoré vous faire cette vidéo!', '2023-12-17', '11:49'),
    (4, 11, 'https://www.youtube.com/watch?v=-2AXw6AZ3gk', 'Les enfants jouent avec des petites voitures et des toboggans', 'Les enfants jouent avec des petites voitures et des toboggans. Dans cette vidéo amusante pour enfants, il y a différentes histoires pour divers véhicules jouets comme une grue, un camion de pompiers, une excavatrice, des trains et plus encore.', '2022-01-21', '9:31'),

    -- Divers
    (4, 12, 'https://www.youtube.com/watch?v=A-LrLaXKwrU', 'Enfants vs Docteur 💊 | Idées de Créations Incroyables et Astuces pour les Parents par Gotcha!', 'Salut les Gotchers ! Cet enfant malade refuse de prendre du sirop 🥄 ou des comprimés 💊? Face à une situation aussi difficile, même un médecin de peut rien faire. Mais maman, qui connait des supers astuces pour les parents, peut gérer sans problème. Restez à l\'écoute pour plein de gadgets incroyables et de sketchs amusants par Gotcha!', '2023-04-24', '12:00'),
    (4, 12, 'https://www.youtube.com/watch?v=96sULcK72ac', 'Vlad et Niki jouent avec des jouets - Collection vidéo pour enfants', 'Vlad et Niki jouent avec des jouets - Collection vidéo pour enfants', '2021-03-18', '28:58'),
    (4, 12, 'https://www.youtube.com/watch?v=fr65HQA02Bo', 'Nastya et Stacy montrent le bon et le mauvais comportement des enfants', 'Nastya et Stacy montrent le bon et le mauvais comportement des enfants ! Nastya apprend à bien faire, mais Stacy ne veut rien entendre. Elle est méchante et a un mauvais comportement. De nouvelles règles de conduite pour Nastya et Stacy et les enfants ! Une histoire morale et éducative pour les enfants', '2021-07-15', '11:28');


create table videos_sections (
  videos_id INT NOT NULL,
  sections_id INT NOT NULL,
  Foreign Key (videos_id) REFERENCES videos(id),
  Foreign Key (sections_id) REFERENCES sections(id),
  PRIMARY KEY (videos_id, sections_id)
);
