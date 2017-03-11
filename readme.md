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
