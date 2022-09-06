import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class Goal {
  constructor(
    public goalId: Number,
    public name: String,
    public description: String,
    public imagePath: String,
    public targetDate: Date,
    public targetAmount: Number,
    public currentAmount: Number
  ) {

  }
}

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

goals!: Goal[];


  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getGoals();
  }

  getGoals(){
    this.httpClient.get<any>('http://localhost:8080/goals').subscribe(
      response => {
        console.log(response);
        this.goals = response;
      }
    )
  }

}
