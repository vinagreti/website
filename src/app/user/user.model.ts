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
    "apiKey":"AIzaSyAYjJT_HJsOYbhYHq_uzAlpc1yiVeuzwGE",
    "appName":"[DEFAULT]",
    "authDomain":"feiraorganica-b44aa.firebaseapp.com",
    "stsTokenManager": {
      "apiKey":"AIzaSyAYjJT_HJsOYbhYHq_uzAlpc1yiVeuzwGE",
      "refreshToken":"AJly3UVSK2STRUZtNAnvztQib4v8xtCaCTVKZ94elrKMR8cVIeY8UF4z8swEw-VHRj1RLljkzPDOM8AYq5FHCRotisITW5sCdK2fx3Uk1b7VqT8FX7OBww3ilx-LFhtVBSLbhHOzoWj_BdJZP75osCAd6lCQHKzwMB0VnNsWqj55IXbNfZtZRA4YyGZj8ZjRIGo-4O2q_fEiCyroWh7h4mRRttpUgfiHXEDBLLbmOn5B-LGyE52BN2ESv1kekGN3XTZsXDYXug8sEaPv_Cq6iwhpJgELYbvpUPtMndIbDMdZqvYthHY9Lo-MKbDqWArjD6GoNUiQ5iw1TucO3KPikeRkfuS-VhQEYy6ejcT_dnzbXdddYN_YjNs",
      "accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImI3NjkwMWU2NzY4YmU3YTY2MDc2NjE3ZWRmOTc0MzEyYTBjNzNjNWEifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmVpcmFvcmdhbmljYS1iNDRhYSIsIm5hbWUiOiJCcnVubyBKb8OjbyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLWxQOHU5VkNXZVZvL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUM4LzhoUngwa2Q5bmM0L3Bob3RvLmpwZyIsImF1ZCI6ImZlaXJhb3JnYW5pY2EtYjQ0YWEiLCJhdXRoX3RpbWUiOjE0OTA1NTU0NDgsInVzZXJfaWQiOiJpSnlVbXF6SlVMaFc3T2RaUnpnaFpSYjVmTUUzIiwic3ViIjoiaUp5VW1xekpVTGhXN09kWlJ6Z2haUmI1Zk1FMyIsImlhdCI6MTQ5MDU1NTQ0OCwiZXhwIjoxNDkwNTU5MDQ4LCJlbWFpbCI6ImJydW5vQHR6YWRpLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA3MDk4MDMwNjI1NDQyOTg5NjUxIl0sImVtYWlsIjpbImJydW5vQHR6YWRpLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.fw6p6-1KAbFSOvsn2Q6hRmXD8hGyH7aZlcsjMK9UIp_-68R9EEiVKdNEZ9D-zU9PjDbQ9C-zkiAuO2qVm-6wDBtojv9WTMr2Q1GltA1Hs7beRuZDSDPMamTcACWRt0TvJfJwZSI-PdbHuHwKdSkJwvRreWYQxa7pdtuX6E5cd-SgUe5-mmbp_h84zrd3-ugyMnktRBUiUSyneC6YiT5b0zf4TR5VWxW_rQKCe148iYeE0Ar6eCuCacLP5sURJ91ssMlGt_R5OzTLvR4U2vBnLzW7dp4MORYB9DF_48Vn3Ms_6drn53fCC-sKUFQ9BUpQ77fTceLp3uzMRrsJLj75eQ",
      "expirationTime":1490559043959
    },
    "redirectEventId":null
  },
  "uid":"iJyUmqzJULhW7OdZRzghZRb5fME3",
  "provider":3,
  "google": {
    "uid":"107098030625442989651",
    "displayName":"Bruno João",
    "photoURL": "https://lh3.googleusercontent.com/-lP8u9VCWeVo/AAAAAAAAAAI/AAAAAAAAAC8/8hRx0kd9nc4/photo.jpg",
    "email":"bruno@tzadi.com",
    "providerId":"google.com"
  }


}


*/
