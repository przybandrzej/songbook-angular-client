import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {SongDTO} from '../songbook';
import {Subject} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {takeUntil} from 'rxjs/operators';
import {rolesForModerator} from '../model/user-roles-combinations';

@Directive({
  selector: '[appCanEditSong]'
})
export class CanEditSongDirective implements OnInit, OnDestroy {

  @Input('appCanEditSong') song: SongDTO;

  stop$ = new Subject();
  isVisible = false;

  private rolesForModerator = rolesForModerator;

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (!this.song) {
      this.isVisible = false;
      this.viewContainerRef.clear();
      return;
    }
    this.authService.user
      .pipe(takeUntil(this.stop$))
      .subscribe(loggedUser => {
        if (!loggedUser) {
          this.isVisible = false;
          this.viewContainerRef.clear();
        } else {
          const loggedUserRole = this.authService.getUserRole();
          if (!this.song.isAwaiting) {
            if (this.rolesForModerator.filter(it => it === loggedUserRole).length > 0) {
              if (!this.isVisible) {
                this.isVisible = true;
                this.viewContainerRef.createEmbeddedView(this.templateRef);
              }
            } else {
              this.isVisible = false;
              this.viewContainerRef.clear();
            }
          } else {
            if (!this.isVisible) {
              this.isVisible = true;
              this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
          }
        }
      });
  }

  ngOnDestroy() {
    this.stop$.next();
  }

}
