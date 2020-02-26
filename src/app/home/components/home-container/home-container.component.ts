import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../../services';
import { filter, map } from 'rxjs/operators';
import { TopMenu } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent implements OnInit {

  topMenus$: Observable<TopMenu[]>;
  
  selectedTabLink$: Observable<string>;

  ngOnInit(): void {
    this.topMenus$ = this.service.getTabs();

    this.selectedTabLink$ = this.activatedRoute.firstChild.paramMap.pipe(
      filter(params => params.has('tabLink')),
      map(params => params.get('tabLink'))
    );
  }

  handleTabSelected(topMenu: TopMenu) {
    this.router.navigate(['home', topMenu.link]);
  }


  constructor(
    private router: Router, // 路由服务，用于路由跳转
    private service: HomeService,
    private activatedRoute: ActivatedRoute // 当前激活路由，用于路由参数获取
  ) { }
}
