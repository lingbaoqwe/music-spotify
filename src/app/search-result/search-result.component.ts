import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  results: any;
  searchQuery: string = '';


  constructor(private route: ActivatedRoute, private msdata: MusicDataService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'];
    });

    this.msdata.searchArtists(this.searchQuery).subscribe(
        data =>(this.results=data.artists.items.filter((fitem) => fitem.images.length > 0))
      );
  }

}