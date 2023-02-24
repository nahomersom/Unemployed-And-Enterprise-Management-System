import driver from 'src/app/core/models/grid-json/driver.json';
import vehicle from 'src/app/core/models/grid-json/vehicle.json';
import accident from 'src/app/core/models/grid-json/accident.json';
import dispatchment from 'src/app/core/models/grid-json/dispatchment.json';
import driverLicense from 'src/app/core/models/grid-json/driver-license.json';
import trafficOfficer from 'src/app/core/models/grid-json/traffic-officer.json';
import violation from 'src/app/core/models/grid-json/violation.json';
import penalty from 'src/app/core/models/grid-json/penalty.json';
import penaltySettlement from 'src/app/core/models/grid-json/penalty-settlement.json';
import training from 'src/app/core/models/grid-json/training.json';
import lookup from 'src/app/core/models/grid-json/lookup.json';
import user from 'src/app/core/models/grid-json/user.json';
import group from 'src/app/core/models/grid-json/group.json';
export const gridData = {
    driver,
    driverLicense,
    vehicle,
    trafficOfficer,
    dispatchment,
    accident,
    violation,
    penalty,
    penaltySettlement,
    training,
    lookup,
    user,
    group
}