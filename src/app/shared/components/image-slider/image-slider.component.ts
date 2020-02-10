import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

export interface ImageSlider {
  id: number;
  imgUrl: string;
  link: string;
  caption: string;
}

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageSliderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sliders: ImageSlider[] = [];
  @Input() sliderHeight = '160px';
  @Input() intervalBySeconds = 5;
  /**
   * ViewChild是一个选择去，用来查找要引用的DOM元素或者组件
   * 由于DOM元素不是Angular中的类，需要一个包装类，以便在Angular中使用
   * 如果ViewChild 元素在ng-if 或者 ng-for包含下，那就是动态的， {static: false}, else true
   * 详见 notes20191208.md
   */
  @ViewChild('imageSlider', { static: true }) imgSlider: ElementRef;

  public selectedIndex = 0;
  
  private intervalId: any;

  ngOnInit() { }

  ngAfterViewInit(): void {
    if (this.intervalBySeconds <= 0) {
      return;
    } // 实现轮播图
    this.intervalId = setInterval(() => {
      this.rd2.setProperty(
        this.imgSlider.nativeElement,
        'scrollLeft',
        (this.getIndex(++this.selectedIndex) *
          this.imgSlider.nativeElement.scrollWidth) /
        this.sliders.length
      );
    }, this.intervalBySeconds * 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // avoid memory leak
  }

  getIndex(idx: number): number {
    return idx >= 0
      ? idx % this.sliders.length
      : this.sliders.length - (Math.abs(idx) % this.sliders.length);
  }

  handleScroll(ev) {
    const ratio =
      ev.target.scrollLeft / (ev.target.scrollWidth / this.sliders.length);
    this.selectedIndex = Math.round(ratio);
  }
  
  constructor(private rd2: Renderer2) { }
}
