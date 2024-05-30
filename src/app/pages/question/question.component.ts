import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{

  id : any ;
  timerDisplay : any;
  questions: any[]=[];
  answers : Array<{questionId: string, answers: any[] }> = [];
  answer: Array<{questionAnswerId: string}> = [];

  FormGroup_1!: FormGroup;
  FormGroup_2!: FormGroup;
  FormGroup_3!: FormGroup;
  FormGroup_4!: FormGroup;
  FormGroup_5!: FormGroup;

  constructor(private _formBuilder: FormBuilder,private http: HttpClient,private router: ActivatedRoute,private route: Router,private dialog: MatDialog) {
    this.loadQuestion();

  }

  ngOnInit() {
    this.FormGroup_1 = this._formBuilder.group({
      annsweCtrl1: ['', Validators.required],
    });
    this.FormGroup_2 = this._formBuilder.group({
      annsweCtrl2: ['', Validators.required],
    });
    this.FormGroup_3 = this._formBuilder.group({
      annsweCtrl3: ['', Validators.required],
    });
    this.FormGroup_4 = this._formBuilder.group({
      annsweCtrl4: ['', Validators.required],
    });
    this.FormGroup_5 = this._formBuilder.group({
      annsweCtrl5: ['', Validators.required],
    });
  }
  loadQuestion(){
    this.id = this.router.snapshot.paramMap.get('id');
    this.http.get('https://training-homework.calllab.net/v1/questions/categories/'+this.id).subscribe((res:any)=>{
      console.log(res);
      if(res.isSuccess) {
        this.questions = res.data.questionInfo;
        this.timer(1);//(res.data.timeLimitOfMinuteUnit);
      }
      if(res.status == 401){
        this.route.navigateByUrl('/login');
      }
    })
  }

  timer(minute) {
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.timerDisplay = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            title: 'หมดเวลา',
            message: '',
          },
        });
        clearInterval(timer);
      }
    }, 1000);
  }

  onSelected(id:any,submit:boolean){
    let ans: Array<{questionAnswerId: string}> = [];
    this.answer.map(x=> ans.push({questionAnswerId:x.questionAnswerId}));
    this.answer =[];
    this.answers.push({questionId:id,answers:ans});

    if(submit){
      this.submitAnswers(false);
    }

  }
  submitAnswers(isTimeUp: boolean){
    let body: any = {
      "questionCategoryId": this.id,
      "questions": this.answers
    };

    this.http.post('https://training-homework.calllab.net/v1/questions/submit-assignment', body).subscribe({
      next: (res:any) => {
        console.log(res.data.score);
        this.dialog.open(ErrorDialogComponent, {
          data: {
            title: 'ผลคะแนน',
            message: res.data.score + ' คะแนน',
          },
        });
      },
      error: err => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            title: 'Error',
            message: err ,
          },
        });
      }
    });

  }
  onChange(answerId:any, isChecked: boolean) {
    if(isChecked) {
      this.answer.push({questionAnswerId:answerId});
    } else {
      this.answer = this.answer.filter(item => item.questionAnswerId !== answerId);
    }
  }
}
