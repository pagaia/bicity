mongoimport --db test --collection category --type json --file data/category.json --jsonArray


db.votes.aggregate([ { $match: { feature: ObjectId('6200555df32d3c9ac42026b2'), } },{ $group: {  _id: '$feature',  average: {   $avg: '$vote'}}  } ]);

db.votes.aggregate([ { $match: { feature: ObjectId('6200555df32d3c9ac42026b2'), } } ]);