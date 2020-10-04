import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {Role} from '../model/user-role';
import {AuthService} from '../services/auth.service';
import {takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[appActivatedByRoles]'
})
export class ActivatedByRolesDirective implements OnInit, OnDestroy {

  @Input() appActivatedByRoles: Role[];

  stop$ = new Subject();
  isVisible = false;

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user.pipe(
      takeUntil(this.stop$)
    ).subscribe(loggedUser => {
      if (!loggedUser) {
        this.isVisible = false;
        this.viewContainerRef.clear();
      } else {
        // If he doesn't have any roles, we clear the viewContainerRef
        const loggedUserRole = this.authService.getUserRole();
        if (!this.appActivatedByRoles || this.appActivatedByRoles.length === 0) {
          this.isVisible = false;
          this.viewContainerRef.clear();
        } else {
          // If the user has the role needed to render this component we can add it
          if (this.appActivatedByRoles.filter(it => it === loggedUserRole).length > 0) {
            // If it is already visible (which can happen if
            // his roles changed) we do not need to add it a second time
            if (!this.isVisible) {
              // We update the `isVisible` property and add the
              // templateRef to the view using the
              // 'createEmbeddedView' method of the viewContainerRef
              this.isVisible = true;
              this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
          } else {
            // If the user does not have the role,
            // we update the `isVisible` property and clear
            // the contents of the viewContainerRef
            this.isVisible = false;
            this.viewContainerRef.clear();
          }
        }
      }
    });
  }

  // Clear the subscription on destroy
  ngOnDestroy(): void {
    this.stop$.next();
  }

}
