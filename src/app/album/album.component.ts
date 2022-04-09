import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album: any;
  id: any;
  private albumroutes: any;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private msdata: MusicDataService
  ) {}

  ngOnInit(): void {
    this.albumroutes = this.route.params.subscribe((params) => {
      this.msdata.getAlbumById(params['id'])
        .subscribe((data) => (this.album = data));
    });
  }

  addToFavourites(id: any) {
    this.msdata.addToFavourites(id).subscribe(
      (data) => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },
      (err) => {
        this.snackBar.open('Unable to add song to Favourites', 'Done', {
          duration: 1500,
        });
      }
    );
  }

  ngOnDestroy() {
    if (this.albumroutes) {
      this.albumroutes.unsubscribe();
    }
  }
}