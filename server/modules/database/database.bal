import ballerinax/mongodb;

configurable string connectionString = ?;

mongodb:Database? db = ();

# Description.
# + return - return Database instance.
public function getDatabase() returns mongodb:Database|error {
    if(!(db is mongodb:Database)){
        mongodb:Client dbClient = check new({connection: connectionString});
        db = check dbClient->getDatabase("sample_mflix");
    }
    return <mongodb:Database>db;
}

