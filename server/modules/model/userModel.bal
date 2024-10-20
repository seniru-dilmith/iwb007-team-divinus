import ballerinax/mongodb;
import server.database;

# Description.
#
# + _id -  user id
# + name -  user name
# + email -  user email
# + password -  user password
public type User record {|
    json _id?;
    string name?;
    string email;
    string password;
|};

# Description.
#
# + email - email to filter
# + return - return User object or error if any
public function getUserByEmail(string email) returns User|error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection userCollection = check db->getCollection("users");

    User? user = check userCollection->findOne({email: email});

    return user;
}

# Description.
#
# + user - user record to insert
# + return - return error if any
public function addUser(User user) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection userCollection = check db->getCollection("users");

    check userCollection->insertOne(user);

    return ();
}

