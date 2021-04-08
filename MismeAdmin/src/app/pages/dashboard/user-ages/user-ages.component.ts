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
      this.total = s.result.totalUsers;
      this.active = s.result.totalActiveUsers;

      const range1 = {
        name: '18 - 24', series: [
          { name: 'Mujeres', value: s.result.ageRange.womenCountRange18To24 },
          { name: 'Hombres', value: s.result.ageRange.menCountRange18To24 }
        ]
      };
      const range2 = {
        name: '25 - 34', series: [
          { name: 'Mujeres', value: s.result.ageRange.womenCountRange25To34 },
          { name: 'Hombres', value: s.result.ageRange.menCountRange25To34 }
        ]
      };
      const range3 = {
        name: '35 - 44', series: [
          { name: 'Mujeres', value: s.result.ageRange.womenCountRange35To44 },
          { name: 'Hombres', value: s.result.ageRange.menCountRange35To44 }
        ]
      };
      const range4 = {
        name: '45 - 54', series: [
          { name: 'Mujeres', value: s.result.ageRange.womenCountRange45To54 },
          { name: 'Hombres', value: s.result.ageRange.menCountRange45To54 }
        ]
      };
      const range5 = {
        name: '55 - 64', series: [
          { name: 'Mujeres', value: s.result.ageRange.womenCountRange55To64 },
          { name: 'Hombres', value: s.result.ageRange.menCountRange55To64 }
        ]
      };
      const range6 = {
        name: '65+', series: [
          { name: 'Mujeres', value: s.result.ageRange.womenCountRangeMin65 },
          { name: 'Hombres', value: s.result.ageRange.menCountRangeMin65 }
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
