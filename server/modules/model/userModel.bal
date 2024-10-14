import ballerinax/mongodb;
import server.database;

public type User record {|
    json _id?;
    string name?;
    string email;
    string password;
|};

public function getUserByEmail(string email) returns User|error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection userCollection = check db->getCollection("users");

    User? user = check userCollection->findOne({email: email});

    return user;
}

public function addUser(User user) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection userCollection = check db->getCollection("users");

    check userCollection->insertOne(user);

    return ();
}

