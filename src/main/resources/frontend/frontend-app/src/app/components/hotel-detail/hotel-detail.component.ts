import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClientService} from "../../service/http-client.service";
import { Hotel } from '../hotel-list/hotel.model';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { RatingComment } from './rating-comment.model';
import {HotelService} from "../../service/hotel.service";

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {
  public hotel: Hotel;
  public commentForm: FormGroup;
  public images: any[] = [];

  constructor(private route: ActivatedRoute, private HttpClientService: HttpClientService, private hotelService: HotelService) { }


  ngOnInit(): void {
    // TODO: LOAD IMAGES FOR HOTEL
    this.images = ["https://www.w3schools.com/w3css/img_lights.jpg", "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"];
    this.route.params.subscribe(params => {
      this.HttpClientService.getHotelById(params.id).subscribe(hotel => {
        this.hotel = Hotel.MapHotel(hotel);
        this.hotel.facilitiesList = this.hotel.facilitiesList.filter(x => x.value);
        console.log('AAAAAAAAAAAAAAAAAAAA', this.hotel.facilitiesList[0].name);
        this.hotelService.translateAsObs.subscribe(trigger => {
          for(let i=0; i<this.hotel.facilitiesList.length; i++)
          {
            if(this.hotel.facilitiesList[i].name === 'Gym') {
              this.hotel.facilitiesList[i].name = Hotel.translateService.instant('FITNESS');
            }
           else if(this.hotel.facilitiesList[i].name === 'OpenBar') {
              this.hotel.facilitiesList[i].name = Hotel.translateService.instant('OPEN BAR');
            }
            else if(this.hotel.facilitiesList[i].name === 'Running') {
              this.hotel.facilitiesList[i].name = Hotel.translateService.instant('RUNNING');
            }
            else  if(this.hotel.facilitiesList[i].name === 'AirConditioning') {
              this.hotel.facilitiesList[i].name = Hotel.translateService.instant('AC');
            }
            else  if(this.hotel.facilitiesList[i].name === 'BeachFront') {
              this.hotel.facilitiesList[i].name = Hotel.translateService.instant('BEACH');
            }
            else  if(this.hotel.facilitiesList[i].name === 'FreeWiFi') {
              this.hotel.facilitiesList[i].name = Hotel.translateService.instant('WIFI');
            }
            else  if(this.hotel.facilitiesList[i].name === 'Pets') {
              this.hotel.facilitiesList[i].name = Hotel.translateService.instant('PETS');
            }
            else   if(this.hotel.facilitiesList[i].name === 'Restaurant') {
              this.hotel.facilitiesList[i].name = Hotel.translateService.instant('RESTAURANT');
            }
            else   if(this.hotel.facilitiesList[i].name === 'Smoking') {
              this.hotel.facilitiesList[i].name = Hotel.translateService.instant('SMOKE');
            }
            else if(this.hotel.facilitiesList[i].name === 'SwimmingPool') {
              this.hotel.facilitiesList[i].name = Hotel.translateService.instant('POOL');
            }
          }
        });
        // DELETE THIS AFTER DB IS FILLED WITH ACTUAL RATING+COMMENTS !
        this.hotel.ratingComments = [new RatingComment("First user", "This is a comment.", 5),
                                    new RatingComment("Second user", "This is a larger larger larger larger comment.", 10)];
        console.log(this.hotel);
      })
    });

    this.commentForm = new FormGroup({
      name: new FormControl('', [Validators.maxLength(60)]),
      rating: new FormControl('', [Validators.max(10), Validators.min(0), Validators.required]),
      comment: new FormControl('', [Validators.maxLength(200), Validators.required])
    });
  }
}
