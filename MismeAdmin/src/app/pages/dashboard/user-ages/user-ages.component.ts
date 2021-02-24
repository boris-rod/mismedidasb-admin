import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-user-ages',
  templateUrl: './user-ages.component.html',
  styleUrls: ['./user-ages.component.css']
})
export class UserAgesComponent implements OnInit {

  series = [];

  total = 0;
  active = 0;
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUserByAgesSummary().subscribe(s => {
      console.log(s.result);
      this.total = s.result.totalUsers;
      this.active = s.result.totalActiveUsers;

      const range1 = {
        name: '18 - 24', series: [
          { name: 'Total', value: s.result.ageRange.countRange18To24 },
          { name: '%', value: s.result.ageRange.percentageRange18To24 }
        ]
      };
      const range2 = {
        name: '25 - 34', series: [
          { name: 'Total', value: s.result.ageRange.countRange25To34 },
          { name: '%', value: s.result.ageRange.percentageRange25To34 }
        ]
      };
      const range3 = {
        name: '35 - 44', series: [
          { name: 'Total', value: s.result.ageRange.countRange35To44 },
          { name: '%', value: s.result.ageRange.percentageRange35To44 }
        ]
      };
      const range4 = {
        name: '45 - 54', series: [
          { name: 'Total', value: s.result.ageRange.countRange45To54 },
          { name: '%', value: s.result.ageRange.percentageRange45To54 }
        ]
      };
      const range5 = {
        name: '55 - 64', series: [
          { name: 'Total', value: s.result.ageRange.countRange55To64 },
          { name: '%', value: s.result.ageRange.percentageRange55To64 }
        ]
      };
      const range6 = {
        name: '65+', series: [
          { name: 'Total', value: s.result.ageRange.countRangeMin65 },
          { name: '%', value: s.result.ageRange.percentageRangeMin65 }
        ]
      };

      this.series.push(range1);
      this.series.push(range2);
      this.series.push(range3);
      this.series.push(range4);
      this.series.push(range5);
      this.series.push(range6);

    });
  }

}
