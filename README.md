# BiCity Info

## BiCity what is and why?

When I was in Rome, early 2000, and commuting by bike or using bike for my movements it was difficult to know where I would find something that I needed:

- a smooth path to ride without being hit by cars
- a place to find a SOS kit to repar my bike
- where to lock my bike if I need to leave it ouside for a while
- which was the best shop (for bike repair, seller, clothing) near to me
- a popular bicycle place to fix my bike
- and so on ...

Eventually I started knowing few cyclists which used the bike in the city and knew more information than me which could help me and other people. New social networks started to be used intensively after the first forums and people started sharing news and information. However it was difficult to remember which person said what in which group and so the information even if shared was lost among other feeds somewhere in the social network.
So, it came to my mind we might needed a single application where people could share their geo-located information and other would have the possibility to search for them without knowing it in advance.

This application would like to become a simple tool for all cyclists who want to solve this issue as well and contribute to the project.
This can help me and many other cyclists around the world.

## Gitcoin Grants

I am very happy to say I have submitted BiCity Info Project on Gitcoin looking for funds and help, and I got the approval for the project 🤩 🚀. Indeed this project wants to solve some issues related to sharing of information and data among people and become one of the `Public Goods` projects.
You can read more on the Grants page: <https://gitcoin.co/grants/5967/bicity-info-project>

## Help needed

I have asked some help on some facebook groups for cyclists for the moment as only beta testers and I got few interest. But some were skeptical due to the fact this seems a too big project for one person. Ok, I have started this project alone, but this does not mean other people can be involved into the project. So, if someone is interested in helping on this project please show up and we can improve it even more.

## Technical structure

I have developed some applications in the past using Fastify and MongoDB for the back-end and database, and React for the UI, so I decided to continue with this stack  following all the lessons learned. On top of these I wanted to try Next.js framework which is quite popular in the React environment and seems solving many React issues.

## Server

I used Fastify and MongoDB for another project to count cyclists using bike lanes ( [contaiciclisti.tk](https://contaiciclisti.tk)) ,  and I would like to reuse what I have learned and improve a bit. First improvement: use framework for the front-end. React is good as View layer but many other libraries need to be included in order to build the router first of all and other features which Nextjs on other hand provides for free plus SEO optimisations with Server Side Rendering (SSR). For the database, I have been using mongoose with a model for each entity, and for this time I want to use a generic model compatible with GeoJSON

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
```

This will allow to run easily queries to retrieve data nearby.

## How to start

In order to start the application first you need to have mongodb installed locally, furthemore you need some other accounts for external services.
All keys and configuration are stored inside `.env` file: one for Front-end and one for Back-end.
Here an example of all configurations needed:

```text
# key for pexels.com API. Used to display some picture per point of interests
NEXT_PUBLIC_PEXEL_TOKEN=XYZ....

# MapQuest api key to get geolocation www.mapquestapi.com. Actually it could be replaced by geoapify
NEXT_PUBLIC_MAPQUEST_KEY=XYZ...

#Google client ID to use OAuth authentication
NEXT_PUBLIC_GOOGLE_CLIENT_ID=XYZ...

#Google secreat ID to use OAuth
NEXT_PUBLIC_GOOGLE_SECRET=XYZ...

#path for redirection after OAuth login to the application
NEXT_PUBLIC_AUTH_REDIRECTION=https://localhost:3000/user/redirect

#Facebook client ID to use OAuth authentication
NEXT_PUBLIC_FACEBOOK_CLIENT_ID=XYZ...

#Facebook secret ID to use OAuth authentication
NEXT_PUBLIC_FACEBOOK_SECRET_ID=XYZ...

#Twitter client ID to use OAuth authentication
NEXT_PUBLIC_TWITTER_CLIENT_ID=XYZ...

#Twitter API KEY to use OAuth authentication
NEXT_PUBLIC_TWITTER_API_KEY=XYZ...

# version extracted by the package.json to display on the UI
NEXT_PUBLIC_APP_VERSION=$npm_package_version

# name extracted from package.json to display on the UI
NEXT_PUBLIC_APP_NAME=$npm_package_name

# API KEY for maps.geoapify.com service
NEXT_PUBLIC_GEOAPIFY_KEY=xyz...

#base url of the application, it should be different per each environment
NEXT_PUBLIC_BASE_URL=https://localhost:3000
```

Once all the previous settings are ready you can start the backend and frontend:

## Start server

Go to `server` directory and run:

```shell
npm install
npm run start
```

The server should start and initialise the DB

## Start Frontend

To start the Frontend application, first you need to have installed the public and private key which will be used to open a secure connection https. This is needed in order to use the javascript geolocation, otherwise this Web API is not active for non secure connection.
Create a folder `https_cert`, move there with the terminal and create the keys with command `ssh-keygen -t rsa -f ./localhost-key.pem`.
You should have now 2 files in the folder.

Instead if you want to change the path for the certificates then you can modify the `start-next.js` file selecting the correct path for both private and public keys:

```shell
  key: fs.readFileSync("./https_cert/localhost-key.pem"),
  cert: fs.readFileSync("./https_cert/localhost.pem")
```

After placed the 2 files under `https_cert` folder, go into `client` folder and run:

```shell
npm install
node start-next.js
```

You can start playing with the application.
No data are available yet in the Database; however you can create some accounts and adding new features or search for Open Street Map amenities.

## Datasets

Here a list of open data websites from which I will get some open data ready to be preloaded into the database:

- Italian open data: <https://www.dati.gov.it/>
- Belgian open data: <https://data.gov.be/en>
- European open data: <https://data.europa.eu>
- Parking place in Rome. Normally in these parking place there are also places for bike, and can be usefull for people who just starts to use the bike and wants to leave the car parked  for [dati.comune.rome](https://dati.comune.roma.it/catalog/dataset/atac-002/resource/113d22e4-d2e4-48dc-9726-d254dd160b5f)

There is also a list I have already checked with a lawyer expert in open data and copyrights and you can find them in the copyrigth-policy file.

## License

One important feature of this project is contributing to the community. So both code and data are licensed with open licenses:

- `GNU AFFERO GENERAL PUBLIC LICENSE Version 3` for the code and
- `Open Data Commons Open Database License (ODbL)` for the data.

I am still trying to understand how to integrate better both databases: BiCity Project  and Open Street Map (OSM) databases.
Since I am planning to reuse some data from OSM, I think the best approach is to use the same license so that BiCity Project can contribute to improve the open data world helping people finding and sharing data.

## DONE

- finalised Facebook authentication ✅
- add username&password authentication ✅
- integrate Google authentication ✅
- create page to add manually new documents/point of interest ✅
- add details page per single feature ✅
- add vote feature ✅
- add like component per single feature ✅
- set cookie to keep login ✅
- added tests ✅


## TODO

- create page to add manually new categories
- add comment per single feature
- add custom icons [https://mapicons.mapsmarker.com/](https://mapicons.mapsmarker.com/)
- add cookie consent
- add Twitter and GitHub login
- add Gravatar profile image
- add validation on user account and feature creation
- add recovery/reset user password
- add share features

## To be improved

1. Looking at the model used in the database, GeoJson, it seems quite simple: an object with geometry plus some properties. The problem I start facing is that using swagger for the definition of the APIs I cannot document all properties. I do not know all of them in advance. So I need to find the way to let user add more properties and also expose them from the APIs.
