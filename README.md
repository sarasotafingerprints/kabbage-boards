# kabbage-boards
This is a simple Kanban board app written using Vue 3 and the Vuetify 3 beta. There are a lot of other node modules too obviously, but those were the two main ones I wanted to learn. This app also uses Directus as the database interface. Currently I'm not using any features that would give Directus an advantage over connecting straight to the DB, but maybe in a next version I will. 

# Set-Up
At a high level this app requires two things. A Directus database, and a webserver for the node app.

## Directus
Lots of ways to set Directus up, just pick your favorite here: https://docs.directus.io/getting-started/installation/
After it is setup you will need to run `npx directus schema apply directusSchema.yaml`
If you're using docker then you can use `sudo docker cp directusSchema.yaml directus:/directus/snapshot.yaml` to get the snapshot on your docker

You will need to supply an admin username and pass when you use the app, so have that ready.

## Kabbage
If you want to run locally then edit the .env with your enviroments values.
Here's the standard node commands:
```
npm install
npm run serve
npm run build
```

If you want to use docker then you can build the included docker file. Here's a sample docker command to start:
```
sudo docker run -it -d -p 8080:80 --rm --name Kabbage kabbageboards:latest
```

However I would recomend you change the `directusEndpoint` in `@/components/LoginDialog.vue` with the address for your directus endpoint then disable/remove the corresponding textfield. 

# Attributions
Art used in public/img is public domain and was optained here: https://openclipart.org/detail/326439/cabbage-head