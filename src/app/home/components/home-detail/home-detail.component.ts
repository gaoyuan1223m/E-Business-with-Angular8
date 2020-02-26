import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { Channel, Ad, Product, ImageSlider } from 'src/app/shared';
import { HomeService } from '../../services';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDetailComponent implements OnInit, OnDestroy {

  selectedTabLink$: Observable<string>; // 轮播图上方的选择签

  imageSliders$: Observable<ImageSlider[]>; // 轮播图

  channels$: Observable<Channel[]>; // 轮播图下方两行八列的小图标

  ad$: Observable<Ad>;

  products$: Observable<Product[]>;

  sub: Subscription; // only for test

  ngOnInit() {
    this.selectedTabLink$ = this.activatedRoute.paramMap.pipe(
      // (paramMap) URL[路径]参数，localhost：4200/home/hot, 可以查询到{tablink：hot}
      filter(params => params.has('tabLink')),
      map(params => params.get('tabLink'))
    );

    this.sub = this.activatedRoute.queryParamMap.subscribe(params => {
      // (queryParamMap) URL[查询]参数(query parameter)，localhost：4200/home/hot?id=1&age=18, 可以查询到{id:1, age:18}
      console.log('查询参数', params);
    });

    this.imageSliders$ = this.homeService.getBanners();

    this.channels$ = this.homeService.getChannels();

    // this.ad$ = this.selectedTabLink$.pipe( // 搭建后端再启用
    // // 流中有流，切换成一个其他的流
    //   switchMap(tab => this.service.getAdByTab(tab)),
    //   filter(ads => ads.length > 0),
    //   map(ads => ads[0])
    // );

    this.ad$ = this.homeService.getHotAd()

    this.products$ = this.homeService.getHotProduct()

    // this.products$ = this.selectedTabLink$.pipe(
    //   switchMap(tab => this.service.getProductsByTab(tab))
    // );

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  } // 需要取消订阅，否则内存泄露

  constructor(
    private activatedRoute: ActivatedRoute,
    private homeService: HomeService
  ) { }

}
