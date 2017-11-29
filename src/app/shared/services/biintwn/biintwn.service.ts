import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiEndpoint = 'https://rest.bandsintown.com/artists';
const appId = '?app_id=codeChallenge';

@Injectable()
export class BiintwnService {

  constructor(private http: HttpClient) { }

  getArtis(artist) {
    return this.http.get(this.getArtistUrl(artist))
    .subscribe((artist) => {
      return artist;
    });
  }

  getEvent(artist) {
    return this.http.get(this.getEventUrl(artist))
    .subscribe((events) => {
      return events;
    });
  }

  getArtistUrl(artist) {
    return `${apiEndpoint}/${artist}${appId}`;
  }

  getEventUrl(artist) {
    return `${apiEndpoint}/${artist}/events${appId}`;
  }

}
