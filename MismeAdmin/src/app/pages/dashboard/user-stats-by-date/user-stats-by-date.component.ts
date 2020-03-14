import { Component, OnInit } from '@angular/core';
import { UserStatSerie } from '../../../core-mismes/models/user-stats-series';
import { UserService } from '../../users/users.service';

@Component({
  selector: 'user-stats-by-date',
  templateUrl: './user-stats-by-date.component.html',
  styleUrls: ['./user-stats-by-date.component.scss']
})
export class UserStatsByDateComponent implements OnInit {

  results: UserStatSerie[] = [];
  // results = [
  //   {
  //     "name": "Germany",
  //     "series": [
  //       {
  //         "name": "2010",
  //         "value": 40632,
  //         "extra": {
  //           "code": "de"
  //         }
  //       },
  //       {
  //         "name": "2000",
  //         "value": 36953,
  //         "extra": {
  //           "code": "de"
  //         }
  //       },
  //       {
  //         "name": "1990",
  //         "value": 31476,
  //         "extra": {
  //           "code": "de"
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     "name": "United States",
  //     "series": [
  //       {
  //         "name": "2010",
  //         "value": 0,
  //         "extra": {
  //           "code": "us"
  //         }
  //       },
  //       {
  //         "name": "2000",
  //         "value": 45986,
  //         "extra": {
  //           "code": "us"
  //         }
  //       },
  //       {
  //         "name": "1990",
  //         "value": 37060,
  //         "extra": {
  //           "code": "us"
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     "name": "France",
  //     "series": [
  //       {
  //         "name": "2010",
  //         "value": 36745,
  //         "extra": {
  //           "code": "fr"
  //         }
  //       },
  //       {
  //         "name": "2000",
  //         "value": 34774,
  //         "extra": {
  //           "code": "fr"
  //         }
  //       },
  //       {
  //         "name": "1990",
  //         "value": 29476,
  //         "extra": {
  //           "code": "fr"
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     "name": "United Kingdom",
  //     "series": [
  //       {
  //         "name": "2010",
  //         "value": 36240,
  //         "extra": {
  //           "code": "uk"
  //         }
  //       },
  //       {
  //         "name": "2000",
  //         "value": 32543,
  //         "extra": {
  //           "code": "uk"
  //         }
  //       },
  //       {
  //         "name": "1990",
  //         "value": 26424,
  //         "extra": {
  //           "code": "uk"
  //         }
  //       }
  //     ]
  //   }
  // ];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserStatsByDates().subscribe(
      stats => {
        this.results = stats.body['result'];
      }
    );
  }

}
