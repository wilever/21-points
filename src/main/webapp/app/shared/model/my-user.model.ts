import { IPreferences } from 'app/shared/model/preferences.model';
import { IPoints } from 'app/shared/model/points.model';
import { IWeight } from 'app/shared/model/weight.model';
import { IBloodPressure } from 'app/shared/model/blood-pressure.model';

export interface IMyUser {
    id?: number;
    name?: string;
    email?: string;
    myuser?: IPreferences;
    myusers?: IPoints[];
    myusers?: IWeight[];
    myusers?: IBloodPressure[];
}

export class MyUser implements IMyUser {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public myuser?: IPreferences,
        public myusers?: IPoints[],
        public myusers?: IWeight[],
        public myusers?: IBloodPressure[]
    ) {}
}
