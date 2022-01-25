# BiCity

When I was in Rome and commuting by bike or using bike for my movements it was difficult to know where I would find something that I needed:

- a smooth path to ride without being hitted by cars
- a place to find a SOS kit to repar my bike
- where to lock my bike if I need to leave it ouside for a while
- which was the best shop (for bike repair, seller, clothing) near me
- a popular bicycle place to fix my bike an so on ...

This application would like to become a simple tool for all cyclists who want to solve this issue as well and contribute to the project.
This can help me and many other cyclists around the world.

## Technical structure

I am thinking on a backend server made with Fastify and MongoDB, on the frontend side React with Nextjs.

## Server

I have worked a bit with fastify and mongoDB for another project #contaiciclisti and I would like to reuse what I have learned and improve a bit.
First improvement: use  framework for the front-end. React is good as View layer but many other library needs to be included in order to build the router first of all. Nextjs provides routers and SEO optimisations with SSR Server Side Rendering.
For the database, I have been using mongoose with a model for each entity, but I am thinking to use a more generic model this time: GeoJSON

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
