
## Create User

-   url: `/user/`
-   method: `POST`
-   body:


```json
{
    address: "Aspernatur error dol",
    brand: "adidas",
    email: "quwu@mailinator.net",
    encryptedPrivateKey: "U2FsdGVkX19p57YSVRxF9rwb9XBk5NDMR7nI5vepClFc6tbZcn6Qbip1zK9fCBPdAiNS/4JaHFGXLZzBLVjCU83wf4SWWuZpfiV8X+zBHxk=",
    password: "1",
    publicKey: "EOS5GCFnwT7Xd8yxDjnaPHXwhMyU67fdtyg64vZy4c8tZsPkGbheR",
    role: "factory",
    username: "domuqibo",
    eosName: "dge14315dbde",
}
```

-   response:

```json
{
    id: 75,
}
```

## Sign In

-   url: `/user/signin/`
-   method: `POST`
- *use basic auth*
-   body: url-formencoded
```url-formencoded
    grant_type: password
    username: coolcore.xix@gmail.com
    password: ********
```


-   response:

```json
{
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiY29vbGNvcmUueGl4QGdtYWlsLmNvbSIsInJvbGUiOiJjcmVhdG9yIn0sImFjY2Vzc1Rva2VuRXhwaXJlc0F0IjoiMjAxOS0xMS0yM1QwNDozODo1NC40MDFaIiwiaWF0IjoxNTc0NDgyMTM0fQ.hwHJnHQOxc1XEIszoo1oyAeBwK8xZd0ssW_D5qvoHEg",
    accessTokenExpiresAt: "2019-11-23T04:38:54.401Z",
    client: {grants: ["password", "refresh_token"]},
    refreshToken: "d5aa868fb18c07884f917d0882995af166bc6066",
    refreshTokenExpiresAt: "2019-12-07T04:08:54.401Z",
    user: {
        address: "hanhtinhhienlanh.com",
        email: "coolcore.xix@gmail.com",
        encryptedPrivateKey: "U2FsdGVkX19PLabru+U4F6aPc3YREPXXmlYFCVW89jZq3lwn6TNlGp7ZLKm5r8eFTVpcuZZa4Adftyv30kPY2XVGtzdvXXvvIDaK3lr8Y5E=",
        eosName: "truegrail123",
        role: "creator",
        username: "Nemo The Collector",
    }
}

```

## Update User info

-   url: `/user/collector/:userId/`

```
    /user/collector/77/
```

-   method: `patch`
-   body: 
    {
        username,
        address,
    }

```json
{
	"username": "Long An Lau",
	"address": "Nha be"
}
```