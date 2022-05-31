const Category = require('../src/models/category');
const categoryList = require('../data/category.json');
const User = require('../src/models/user');
const security = require('../src/utility/security');

// exports.initiliseDB = async () => {
//     return await Promise.all(
//         categoryList.forEach(async (item) => {
//             await Category.updateOne({ name: item.name }, item, {
//                 new: true,
//                 upsert: true,
//             }).exec();
//         })
//     );
// };

exports.initiliseDB = async () => {
    const passwordHash = await security.encryptPassword('password');
    const admin = {
        name: 'Admin',
        lastName: 'User',
        email: 'admin@bicity.info',
        username: 'admin',
        locale: 'en',
        passwordHash,
        picture: `https://api.multiavatar.com/Admin Bicity.png`,
        role: 'Admin',
    };

    const user = await User.create(admin);
    return user;

    return await Promise.all(
        categoryList.forEach(async (item) => {
            await Category.updateOne({ name: item.name }, item, {
                new: true,
                upsert: true,
            }).exec();
        })
    );
};
