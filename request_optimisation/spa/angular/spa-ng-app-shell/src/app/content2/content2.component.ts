import { Component, OnInit } from '@angular/core';
import {UnsplashApiService} from '../services/unsplash-api.service';

@Component({
  selector: 'app-content2',
  templateUrl: './content2.component.html',
  styleUrls: ['./content2.component.css']
})
export class Content2Component implements OnInit {

  constructor(private UnsplashApiService: UnsplashApiService) { }
  Items;
  ngOnInit(): void {
    this.UnsplashApiService.getImage().subscribe((resp:any) => {
      this.Items = resp;
      console.log(resp);
    })
  }

}
