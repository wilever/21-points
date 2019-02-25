import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMyUser } from 'app/shared/model/my-user.model';
import { MyUserService } from './my-user.service';
import { IPreferences } from 'app/shared/model/preferences.model';
import { PreferencesService } from 'app/entities/preferences';

@Component({
    selector: 'jhi-my-user-update',
    templateUrl: './my-user-update.component.html'
})
export class MyUserUpdateComponent implements OnInit {
    myUser: IMyUser;
    isSaving: boolean;

    myusers: IPreferences[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected myUserService: MyUserService,
        protected preferencesService: PreferencesService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ myUser }) => {
            this.myUser = myUser;
        });
        this.preferencesService
            .query({ filter: 'myuser-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IPreferences[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPreferences[]>) => response.body)
            )
            .subscribe(
                (res: IPreferences[]) => {
                    if (!this.myUser.myuser || !this.myUser.myuser.id) {
                        this.myusers = res;
                    } else {
                        this.preferencesService
                            .find(this.myUser.myuser.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IPreferences>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IPreferences>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IPreferences) => (this.myusers = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.myUser.id !== undefined) {
            this.subscribeToSaveResponse(this.myUserService.update(this.myUser));
        } else {
            this.subscribeToSaveResponse(this.myUserService.create(this.myUser));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMyUser>>) {
        result.subscribe((res: HttpResponse<IMyUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPreferencesById(index: number, item: IPreferences) {
        return item.id;
    }
}
