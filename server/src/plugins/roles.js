module.exports = {
    User: 'User', // any user can read/update/delete its own data plus public information
    Editor: 'Editor', // extends User role, and can bulk upload data
    Admin: 'Admin', // the Admin role can access, update and delete any resource
};
