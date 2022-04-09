import { Component, OnInit } from '@angular/core';
// import albumData from '../data/SearchResultsAlbums.json';
// import artistData from '../data/SearchResultsArtist.json';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  albums: any;
  artist: any;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private msdata: MusicDataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => (this.id = params['id']));

    this.msdata.getArtistById(this.id).subscribe((data) => {
      this.artist = data;
    });
    this.msdata
      .getAlbumsByArtistId(this.id)
      .subscribe(
        (data) =>
          (this.albums = data.items.filter(
            (curValue:any, index:any, self:any) =>
              self.findIndex(
                (t:any) => t.name.toUpperCase() === curValue.name.toUpperCase()
              ) === index
          ))
      );
  }
}
