# Arcadia
Arcadia est une application web pour la gestion et l'amélioration de l'expérience visiteur du zoo Arcadia. Elle intègre Node.js, Express, EJS,Javascript, TailwindCSS, PostgreSQL, et MongoDB.

## Prérequis

```
- Node.js et npm installés
- PostgreSQL installé localement
- Un compte Fly.io
- Flyctl installé
```

Pour le projet Arcadia, j'ai décidé d'utiliser plusieurs technologies pour répondre aux besoins variés de notre application. Voici comment j'ai configuré mon environnement de développement.  

Pour commencer, j'ai choisi Visual Studio Code comme IDE. C'est un outil très populaire et puissant, avec plein de fonctionnalités et d'extensions qui facilitent la gestion du code, le débogage et l'intégration avec d'autres outils. 

 J'ai organisé mes dossiers de manière logique dans le dossier racine nommé Arcadia : 

 La structure de mon projet est organisée comme suit :

- **Arcadia/src/** : Contient le code source
  - **models/** : Modèles de données
  - **views/** : Vues de l'application
  - **controllers/** : Contrôleurs qui gèrent la logique de l'application
  - **utils/** : Utilitaires et fonctions d'assistance
  - **config/** : Fichiers de configuration
  - **routes/** : Définition des routes de l'application
  - **middleware/** : Middlewares utilisés dans l'application
- **Arcadia/public/** : Fichiers statiques accessibles côté client
  - **css/** : Fichiers CSS
  - **js/** : Fichiers JavaScript côté client
  - **images/** : Images utilisées dans l'application
  - **videos/** : Fichiers vidéo
- **Arcadia/sql/** : Scripts SQL pour la création des bases de données, des tables et l'intégration des données
- **Arcadia/server.js** : Gère le serveur
- **Arcadia/app.js** : Configure l'application

  À la racine du dossier Arcadia, j'ai initialisé un nouveau projet Node.js avec npm en utilisant la commande ``` npm init ```. Cela a créé un fichier package.json pour gérer toutes les dépendances du projet.  

  J'ai ensuite installé tous les modules nécessaires au projet, comme Express.js pour le serveur, EJS pour les templates, et TailwindCSS pour le style, avec des commandes comme ```npm install express ejs tailwindcss```.  


###  Pour structurer mon projet, j'ai suivi le design pattern MVC (Model-View-Controller). Ce pattern aide à séparer l'application en trois parties principales : 

 Model pour gérer les données.  

 View pour gérer l'affichage et la présentation. 

 Controller pour gérer les interactions entre le Model et la View.  

 J'ai configuré PostgreSQL pour les données relationnelles et structurées en créant la base de donnée en utilisant ``` CREATE DATABASE 'arcadia' ```, 
 et MongoDB pour les données non structurées ou semi-structurées en utilisant ```npm install mongodb mongoose```, et pour initier la connection j'ai utilisé ce code ```const mongoose = require('mongoose');
  const uri = "mongodb://localhost:27017/mydatabase";
  mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB with Mongoose");
    })
    .catch(err => {
        console.error("Connection error", err);
    }) ```  
  Cela me permet de tirer parti des avantages des deux types de bases de données selon les besoins des différentes parties de l'application. 

 Enfin, j'ai initialisé un dépôt Git à la racine du projet avec la commande git init. Cela me permet de suivre les modifications du code source. J'ai également connecté mon dépôt local à un dépôt distant sur GitHub en utilisant des commandes comme git remote add origin https://github.com/Saintkops/Arcadia et git push -u origin main. 

### Déploiement

Cette section décrit les étapes que j'ai suivies pour déployer l'application Arcadia sur Fly.io.

### Étape 1 : Inscription et installation de Fly.io

J'ai installé l'outil de ligne de commande Fly.io :

### Copier le code:
```sh
curl -L https://fly.io/install.sh | sh
```

### Je me suis connecté à Fly.io depuis mon terminal :
#### Copier le code:
```sh
flyctl auth login
```

## 2. Initialisation du projet sur Fly.io

### J'ai initialisé une nouvelle application Fly.io dans le répertoire racine de mon projet Arcadia :
#### Copier le code:
```sh
flyctl launch
```

### J'ai suivi les instructions pour configurer mon application, en choisissant une région proche de mes utilisateurs et en confirmant que j'avais déjà une configuration de déploiement.

## 3. Configuration de la base de données PostgreSQL sur Fly.io

### J'ai créé une base de données PostgreSQL sur Fly.io nommée arcadia-db :
#### Copier le code:
```sh
flyctl postgres create --name arcadia-db
```

### J'ai exporté les données de ma base de données de développement locale arcadia :
#### Copier le code:
```sh
pg_dump -U postgres -d arcadia -f backup.sql
```

### J'ai importé les données dans la base de données PostgreSQL sur Fly.io. Pour cela, je me suis d'abord connecté à la base de données sur Fly.io :
#### Copier le code
```sh
flyctl postgres connect -a arcadia-db
```


### Puis, dans le terminal interactif de la base de données, j'ai importé le fichier SQL :
#### Copier le code
```sh
psql -U utilisateur -d arcadia-db
\i backup.sql
```

## 4. Configuration des secrets sur Fly.io

### Pour que mon application puisse se connecter à la base de données et utiliser d'autres informations sensibles, j'ai configuré les secrets nécessaires :
#### Copier le code:
```sh
flyctl secrets set DATABASE_URL=<URL_de_ma_base_de_données> API_KEY=<KEY>....
```


### J'ai ensuite vérifié que les secrets étaient correctement configurés :
#### Copier le code
```sh
flyctl secrets list -a arcadia
```

## 5. Utilisation du Dockerfile Fly.io m'a fourni un Dockerfile que j'ai utilisé pour containeriser mon application. Voici le Dockerfile que j'ai utilisé :

```docker
# dockerfile

##### Copier le code
# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=21.6.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci

# Copy application code
COPY --link . .

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "node", "server.js" ]

```

## 6. Modification du fichier fly.toml

### J'ai également modifié le fichier fly.toml pour ajouter un espace de stockage pour mes fichiers statiques. Voici le fichier fly.toml :

```toml
# toml

#### Copier le code

# fly.toml app configuration file for brocelianzoo
# Generated on 2024-05-18T17:50:27+02:00
#
# See https://fly.io/docs/reference/configuration/ for information about how to use this file.
#

app = "brocelianzoo"
primary_region = "cdg"

[build]

[mounts]
  source = "app_data"
  destination = "/app/uploads"

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 1
  processes = ["app"]

  [http_service.concurrency]
    type = "requests"
    soft_limit = 150
    hard_limit = 200

[[vm]]
  memory = "1gb"
  cpu_kind = "shared"
  cpus = 1
  ```

## 7. Déploiement de l'application

### Enfin, j'ai déployé mon application sur Fly.io en utilisant la commande suivante :
#### Copier le code:
```sh
flyctl deploy
```

### Cette commande a pris en charge le processus de build et de déploiement de mon application sur l'infrastructure de Fly.io.
