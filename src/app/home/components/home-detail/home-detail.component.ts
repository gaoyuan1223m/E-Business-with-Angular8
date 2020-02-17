import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { ImageSlider, Channel, Ad, Product } from 'src/app/shared';
import { HomeService } from '../../services';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDetailComponent implements OnInit, OnDestroy {

  selectedTabLink$: Observable<string>;

  imageSliders$: Observable<ImageSlider[]>;

  channels$: Observable<Channel[]>;

  ad$: Observable<Ad>;

  products$: Observable<Product[]>;

  sub: Subscription; // only for test

  ngOnInit() {
    this.selectedTabLink$ = this.route.paramMap.pipe(
      // URL[路径]参数，localhost：4200/home/hot, 可以查询到{tablink：hot}
      filter(params => params.has('tabLink')),
      map(params => params.get('tabLink'))
    );

    this.sub = this.route.queryParamMap.subscribe(params => {
      // URL[查询]参数(query parameter)，localhost：4200/home/hot?id=1&age=18, 可以查询到{id:1, age:18}
      console.log('查询参数', params);
    });

    this.imageSliders$ = this.service.getBanners();

    this.channels$ = this.service.getChannels();

    this.ad$ = this.selectedTabLink$.pipe(
      switchMap(tab => this.service.getAdByTab(tab)),
      filter(ads => ads.length > 0),
      map(ads => ads[0])
    );

    this.products$ = this.selectedTabLink$.pipe(
      switchMap(tab => this.service.getProductsByTab(tab))
    );

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }



  constructor(
    private route: ActivatedRoute,
    private service: HomeService
  ) { }
}
