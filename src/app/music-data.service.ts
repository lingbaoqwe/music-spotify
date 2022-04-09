import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  
  
  //public favouritesList: Array<any> = [];

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistById(id:any): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.SingleArtistResponse>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id:any): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`,
      { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumById(id:any): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.SingleAlbumResponse>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }


  searchArtists(searchString:string): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.ArtistSearchResponse>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }


  addToFavourites(id:string): Observable<[String]> {
    return this.http.put<[String]>(`${environment.userAPIBase}/favourites/${id}`, id);
  }
  
  removeFromFavourites(id: string): Observable<any> {
    return this.http
      .delete<[String]>(`${environment.userAPIBase}/favourites/${id}`)
      .pipe(
        mergeMap((favouritesArray) => {
          favouritesArray.splice(favouritesArray.indexOf(id), 1);
          return this.getFavourites();
        })
      );
  }

  
  getFavourites(): Observable<any> {
    return this.http
      .get<[String]>(`${environment.userAPIBase}/favourites/`)
      .pipe(
        mergeMap((favouritesArray) => {
          if (favouritesArray.length <= 0) {
            return new Observable<any>((o) => {
              o.next({ tracks: [] });
            });
          } else {
            return this.spotifyToken.getBearerToken().pipe(
              mergeMap((token) => {
                return this.http.get<any>(`https://api.spotify.com/v1/tracks`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  params: { ids: favouritesArray.join(',') },
                });
              })
            );
          }
        })
      );
  }
}
//   addToFavourites(id: string): boolean {
//     if (!id || this.favouritesList.length>49) {
//       return false;
//     }else{
//       this.favouritesList.push(id);
//       return true;
//     }
//   }

//   removeFromFavourites(id:any): Observable<any> {
//     this.favouritesList.splice(this.favouritesList.indexOf(id), 1);
//     return this.getFavourites();
//   }

//   getFavourites(): Observable<any> {
//       if (this.favouritesList.length>0) {
//         return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
//           return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${this.favouritesList.join()}`,
//           { headers: { "Authorization": `Bearer ${token}` } });
//         }));
//       } else {
//         return new Observable(o=>o.next({tracks: []}));
//       }
//     }

// }