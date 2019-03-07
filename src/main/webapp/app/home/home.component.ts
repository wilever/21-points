import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { PointsService } from 'app/entities/points';
import { PreferencesService } from 'app/entities/preferences';
import { Preferences } from 'app/shared/model/preferences.model';
import { BloodPressureService } from 'app/entities/blood-pressure';
import { D3ChartService } from './d3-chart.service';

import { LoginModalService, AccountService, Account } from 'app/core';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    account: Account;
    modalRef: NgbModalRef;
    bpReadings: any = {};
    bpOptions: any;
    bpData: any;
    eventSubscriber: Subscription;
    pointsThisWeek: any = {};
    pointsPercentage: number;
    preferences: Preferences;

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private preferencesService: PreferencesService,
        private bloodPressureService: BloodPressureService,
        private pointsService: PointsService
    ) {}

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
            if (this.isAuthenticated()) {
                this.getUserData();
            }
        });
        this.registerAuthenticationSuccess();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
                this.getUserData();
            });
        });
        this.subcribeListener();
    }

    subcribeListener() {
        this.eventSubscriber = this.eventManager.subscribe('pointsListModification', () => this.getUserData());
        this.eventSubscriber = this.eventManager.subscribe('preferencesListModification', () => this.getUserData());
        this.eventSubscriber = this.eventManager.subscribe('bloodPressureListModification', () => this.getUserData());
        this.eventSubscriber = this.eventManager.subscribe('weightListModification', () => this.getUserData());
    }

    getUserData() {
        // Get preferences
        this.preferencesService.user().subscribe((preferences: any) => {
            this.preferences = preferences.body;

            // Get points for the current week
            this.pointsService.thisWeek().subscribe((points: any) => {
                points = points.body;
                this.pointsThisWeek = points;
                this.pointsPercentage = (points.points / this.preferences.weeklyGoal) * 100;

                // calculate success, warning, or danger
                if (points.points >= preferences.weeklyGoal) {
                    this.pointsThisWeek.progress = 'success';
                } else if (points.points < 10) {
                    this.pointsThisWeek.progress = 'danger';
                } else if (points.points > 10 && points.points < this.preferences.weeklyGoal) {
                    this.pointsThisWeek.progress = 'warning';
                }
            });
        });

        // Get blood pressure readings for the last 30 days
        this.bloodPressureService.last30Days().subscribe((bpReadings: any) => {
            bpReadings = bpReadings.body;
            this.bpReadings = bpReadings;
            // https://stackoverflow.com/a/34694155/65681
            this.bpOptions = { ...D3ChartService.getChartConfig() };
            if (bpReadings.readings.length) {
                this.bpOptions.title.text = bpReadings.period;
                this.bpOptions.chart.yAxis.axisLabel = 'Blood Pressure';
                let systolics, diastolics, upperValues, lowerValues;
                systolics = [];
                diastolics = [];
                upperValues = [];
                lowerValues = [];
                bpReadings.readings.forEach(item => {
                    systolics.push({
                        x: new Date(item.timestamp),
                        y: item.systolic
                    });
                    diastolics.push({
                        x: new Date(item.timestamp),
                        y: item.diastolic
                    });
                    upperValues.push(item.systolic);
                    lowerValues.push(item.diastolic);
                });
                this.bpData = [
                    {
                        values: systolics,
                        key: 'Systolic',
                        color: '#673ab7'
                    },
                    {
                        values: diastolics,
                        key: 'Diastolic',
                        color: '#03a9f4'
                    }
                ];
                // set y scale to be 10 more than max and min
                this.bpOptions.chart.yDomain = [Math.min.apply(Math, lowerValues) - 10, Math.max.apply(Math, upperValues) + 10];
            } else {
                this.bpReadings.readings = [];
            }
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
