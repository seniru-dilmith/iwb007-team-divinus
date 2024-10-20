import ballerinax/mongodb;

configurable string connectionString = ?;
configurable string databaseName = ?;

mongodb:Database? db = ();

# Description.
# + return - return Database instance.
public function getDatabase() returns mongodb:Database|error {
    if(!(db is mongodb:Database)){
        mongodb:Client dbClient = check new({connection: connectionString});
        db = check dbClient->getDatabase(databaseName);
    }
    return <mongodb:Database>db;
}

