import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css']
})
export class ProductTileComponent implements OnInit {
  @Input() product: Product;
  constructor() {}

  ngOnInit() {}
}
