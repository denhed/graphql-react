# Köra server

## api server

```bash
npm start
```

## json server

I ett eget fönster

```bash
npm run json:server
```

# anrop

hämta en users

hämta ett company med id
```javascript
{
  company(id: "1"){
    id,
    name,
    description
  }
}
```

hämta ett company med id samt alla users
```javascript
{
  company(id: "2"){
    id,
    name,
    description
    users {
      id,
      firstName
    }
  }
}
```

###

i samma anrop kan man fråga efter två company dock måste vi ange ett namn (apple, google)
för varje fråga då respose kan inte ha samma key company.

```javascript
{
  apple: company(id: "1"){
    id,
    name,
    description
  }
  google: company(id: "2"){
    id,
    name,
    description
  }
}
```

#### fragments för att undvika skriva samma kod flera gånger

```javascript
{
  apple: company(id: "1"){
 		...companyDetails
  }
  google: company(id: "2"){
    ...companyDetails
  }
}

fragment companyDetails on Company {
  id
  name
  description
}
```

## add user mutation

när man gör en mutation måste man även ange vad man vill ha tillbaka.
```javascript
mutation {
  addUser(firstName: "Stephen", age: 26) {
    id
    firstName
    age
  }
}
```
```javascript
addUser(
firstName: String!
age: Int!
companyId: String
): User

```
i dokumentationen ser vi ! och  det tyder på att vi måste ha med ett värde.

## delete a user mutation

```javascript
mutation {
  deleteUser(id: "23"){
    id
    firstName
  }
}
```

vi får tillbaka vilket tyder på framgång, i detta fall är det json-server
som inte retunerar något. vi skulle vilja ha den user man raderade.

```javascript
{
  "data": {
    "deleteUser": {
      "id": null,
      "firstName": null
    }
  }
}
```

## edit a user mutation
vi använder oss av patch mot databasen som innebär att man bara uppdaterar alla
eller vissa fält. pu innebär att man skriver över samtliga fält och har man inte
tex en age med värde så kommer age vara null.

```javascript
mutation {
 editUser(id: "40", age: 10){
  id
  age
  firstName
 }
}
```
