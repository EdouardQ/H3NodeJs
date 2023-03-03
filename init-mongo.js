db.createUser(
    {
        user: "admin",
        pwd: "root",
        roles: [
            {
                role: "readWrite",
                db: "universal_studios"
            }
        ]
    }
);
db.createCollection("users");