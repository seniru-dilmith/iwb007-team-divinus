import ballerina/http;
import server.model;
import ballerina/crypto;
import ballerina/jwt;

configurable string access_token_secret = ? ;
configurable string refresh_token_secret = ?;

function generateJWT(map<json> payload, string secret) returns string|error {
    
    jwt:IssuerConfig issuerConfig = {
        issuer: "bookMyTrain",
        signatureConfig: {
            algorithm: "HS256",
            config: secret
            },
        expTime: 3600,
        customClaims: payload
    };

    string token = check jwt:issue(issuerConfig);

    return token;
}

function validateJWT(string token, string secret) returns jwt:Payload|error {
    
    jwt:ValidatorConfig validatorConfig = {
        issuer: "bookMyTrain",
        signatureConfig: {
            secret: secret
        },
        clockSkew: 0
    };

    jwt:Payload payload = check jwt:validate(token, validatorConfig);

    return payload;
}

function encryptPassword(string password) returns string {
    byte[] bytePassword = password.toBytes();
    byte[] hashedBytePassword = crypto:hashSha256(bytePassword);
    string hashedPassword = hashedBytePassword.toBase16();
    return hashedPassword;
}

public function userLogin(http:Caller caller, model:User user) returns error? {

    http:Response res = new;

    model:User? dbUser = check model:getUserByEmail(user.email);

    if(dbUser == null){
        res.statusCode = 404;
        res.setJsonPayload({"message": "User not found"});
        check caller->respond(res);
        return ();
    }

    if(dbUser.password != encryptPassword(user.password)){
        res.statusCode = 401;
        res.setJsonPayload({"message": "Invalid password"});
        check caller->respond(res);
        return ();
    }

    string access_token = check generateJWT({"email": dbUser.email}, access_token_secret);
    string refresh_token = check generateJWT({"email": dbUser.email}, access_token_secret);
    http:Cookie tokenCookie = new("token", refresh_token, httpOnly = true, secure = true, maxAge = 3600);

    res.statusCode = 200;
    res.addCookie(tokenCookie);
    res.setJsonPayload({"message": "Login successful", "access_token" : access_token });

    check caller->respond(res);

    return ();
}

public function userRegister(http:Caller caller, model:User user) returns error? {

    if(!(user.name is string)){
        http:Response res = new;
        res.statusCode = 400;
        res.setJsonPayload({"message": "Name is required"});
        check caller->respond(res);
        return ();
    }

    http:Response res = new;

    model:User? dbUser = check model:getUserByEmail(user.email);

    if(dbUser != null){
        res.statusCode = 409;
        res.setJsonPayload({"message": "User already exists"});
        check caller->respond(res);
        return ();
    }

    user.password = encryptPassword(user.password);

    check model:addUser(user);

    res.statusCode = 201;
    res.setJsonPayload({"message": "User created"});

    check caller->respond(res);

    return ();
}

