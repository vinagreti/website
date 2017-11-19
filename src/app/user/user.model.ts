export class User {
  auth: any;
  name: string;
  startedApp: boolean;
  logged: boolean;
  picture: string;
  uid: string;
  date: any;

  constructor(user?) {
    this.auth = user ? user.auth : undefined;
    this.name = user ? user.name : undefined;
    this.startedApp = user ? user.startedApp : false;
    this.logged = user ? user.logged : false;
    this.picture = user ? user.picture : undefined;
    this.uid = user ? user.uid : undefined;
    this.date = user ? user.date : undefined;
  }
}

/*
{
  "auth": {
    "uid":"iJyUmqzJULhW7OdZRzghZRb5fME3",
    "displayName":"Bruno João",
    "photoURL":
    "https://lh3.googleusercontent.com/-lP8u9VCWeVo/AAAAAAAAAAI/AAAAAAAAAC8/8hRx0kd9nc4/photo.jpg",
    "email":"bruno@tzadi.com",
    "emailVerified":true,
    "isAnonymous":false,
    "providerData":[
      {
        "uid":"107098030625442989651",
        "displayName":"Bruno João",
        "photoURL":
        "https://lh3.googleusercontent.com/-lP8u9VCWeVo/AAAAAAAAAAI/AAAAAAAAAC8/8hRx0kd9nc4/photo.jpg",
        "email":"bruno@tzadi.com",
        "providerId":"google.com"
      }
    ],
    "apiKey":"xxx",
    "appName":"[DEFAULT]",
    "authDomain":"xxx",
    "stsTokenManager": {
      "apiKey":"xxx",
      "refreshToken":"xxx",
      "accessToken":"xxx",
      "expirationTime":1490559043959
    },
    "redirectEventId":null
  },
  "uid":"iJyUmqzJULhW7OdZRzghZRb5fME3",
  "provider":3,
  "google": {
    "uid":"107098030625442989651",
    "displayName":"Bruno João",
    "photoURL": "xxx",
    "email":"bruno@tzadi.com",
    "providerId":"google.com"
  }


}


*/
