import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import IPage from '../../../../interfaces/iPage';
import {ModalService} from '../../services/modal.service';
import {IService} from '../../../../interfaces/IService';
import {stripBom} from '@angular/cli/utilities/strip-bom';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public header: string;
  public aboutPage: IPage<string>;
  public name: string;
  public position: string;

  constructor(private route: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
    this.header = this.route.snapshot.data.header;
    this.aboutPage = this.route.snapshot.data.pageBlocks.find((page: IPage<any>) => page.entityId === 'about');
    this.position = this.route.snapshot.data.headerData.position;
    this.name = this.route.snapshot.data.headerData.name;
    this.modalService.services = this.route.snapshot.data.services.map((service: IService): string => service.header);
  }
}
