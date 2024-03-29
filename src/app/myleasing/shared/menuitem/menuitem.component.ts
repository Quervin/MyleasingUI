import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { MenuService } from 'src/app/services/app.menu.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: '[app-menuitem]',
  templateUrl: './menuitem.component.html',
  styles: [
  ],
  host: {
    '[class.active-menuitem]': 'active',
  },
  animations: [
    trigger('children', [
        state('void', style({
            height: '0px'
        })),
        state('hiddenAnimated', style({
            height: '0px'
        })),
        state('visibleAnimated', style({
            height: '*'
        })),
        transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
        transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
        transition('void => visibleAnimated, visibleAnimated => void',
            animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class MenuitemComponent implements OnInit, OnDestroy {

  @Input() item: any;

  @Input() index: number;

  @Input() root: boolean;

  @Input() parentKey: string;

  active = false;

  menuSourceSubscription: Subscription;

  menuResetSubscription: Subscription;

  key: string;

  constructor(public home: HomeComponent, 
    public _router: Router, 
    private _cd: ChangeDetectorRef, 
    private _menuService: MenuService) {
        this.index = 0;
        this.root = false;
        this.parentKey = "";
        this.key = "";
        this.menuSourceSubscription = this._menuService.menuSource$.subscribe(key => {
            // deactivate current active menu
            if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
                this.active = false;
            }
        });
        this.menuResetSubscription = this._menuService.resetSource$.subscribe(() => {
            this.active = false;
        });
        
        this._router.events.pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(params => {
            if (this.item.routerLink) {
                this.updateActiveStateFromRoute();
            } else {
                this.active = false;
            }
        });
    }

  ngOnInit(): void {
      if (this.item.routerLink) {
          this.updateActiveStateFromRoute();
        }
        
        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);
    }
    
    updateActiveStateFromRoute() {
        this.active = this._router.isActive(this.item.routerLink[0], this.item.items ? false : true);
    }
    
    itemClick(event: Event) {
        event.stopPropagation();
        // avoid processing disabled items
        if (this.item.disabled) {
            event.preventDefault();
            return;
        }
        
        // notify other items
        this._menuService.onMenuStateChange(this.key);
        
        // execute command
        if (this.item.command) {
            this.item.command({originalEvent: event, item: this.item});
        }
        
        // toggle active state
        if (this.item.items) {
            this.active = !this.active;
        } else {
             // activate item
             this.active = true;

             // hide overlay menus
             this.home.menuActiveMobile = false;
             
             if (this.home.isDesktop() && this.home.isOverlay()) {
                 this.home.menuInactiveDesktop = true;
                }
            }
    }
    
    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }
        
        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }
    }

}
