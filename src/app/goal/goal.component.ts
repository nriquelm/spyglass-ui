import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


export class Goal {
  constructor(
    public goalId: Number,
    public name: String,
    public description: String,
    public imagePath: String,
    public targetDate: String,
    public targetAmount: Number,
    public currentAmount: Number
  ) {}
}

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})

export class GoalComponent implements OnInit {

goals!: Goal[];
goal!: Goal;
closeResult: String = '';
content: any;
editForm!: FormGroup;
deleteId!: Number;

//Goal object to accept user input and store in database
newGoal: Goal = new Goal(0, '', '', '', '', 0, 0);

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    //Initialize getGoals method in order to render them to the UI
    this.getGoals();

    this.editForm = this.fb.group({
      goalId: [''],
      name: [''],
      description: [''],
      imagePath: [''],
      targetDate: [''],
      targetAmount: [''],
      currentAmount: ['']
    });
  }

  url: string = 'http://localhost:8080/goals';
  getGoals(){
    this.httpClient.get<any>(this.url).subscribe(
      response => {
        console.log(response);
        this.goals = response;
      }
    );
  }

  //This function enables a user to open a modal by clicking on the button calling the function.
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //This function enables a user to close a modal by clicking outside of it or clicking escape.
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //This function, when associated with the submit click event on the #content modal, accepts user modal input as arguments to pass to newGoal object to add to the database/UI. 
  onSubmit(newGoal: Goal){
    this.httpClient.post(this.url, newGoal).subscribe((result) => {
      this.ngOnInit();
      
    });
    this.modalService.dismissAll();
  }

  //This function, when associated with the save click event on the #editContent modal, allows a user to change arguments passed to existing goal. 
  onSave(){
    const editURL = this.url + '/' + this.editForm.value.goalId;
    this.httpClient.put(editURL, this.editForm.value).subscribe((result) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }

  //This function will remove a goal from the database/UI based on its id.
  onDelete(){
    const deleteURL = this.url + '/' + this.deleteId;
    this.httpClient.delete(deleteURL).subscribe((result) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    })
  }

  //This function enables a user to open the modal to edit a goal and uses patchValue to update matching elements from the form.
  openEdit(targetModal: any, goal: Goal){
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      goalId: goal.goalId,
      name: goal.name,
      description: goal.description,
      imagePath: goal.imagePath,
      targetDate: goal.targetDate,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount
    });
  }

  //This function enables a user to open a modal to confirm the removal of a particular goal based on its id.
  openDelete(targetModal: any, goal: Goal){
    this.deleteId = goal.goalId;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }


}
