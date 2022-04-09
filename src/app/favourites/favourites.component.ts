import { Component, OnInit } from '@angular/core';

import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites: any[] = new Array();
  private favouriteList: any;

  constructor(private musicData: MusicDataService) {}

  ngOnInit(): void {
    this.favouriteList = this.musicData.getFavourites().subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

  removeFromFavourites(id: any) {
    this.favouriteList = this.musicData
      .removeFromFavourites(id)
      .subscribe((data) => {
        this.favourites = data.tracks;
      });
  }

  ngOnDestroy() {
    this.favouriteList.unsubscribe();
  }
}
