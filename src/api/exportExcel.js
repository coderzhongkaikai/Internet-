import ipURL from "./config";
import {get, post} from "../utils/service";
function exportExcel() {
    return post(ipURL + '/getAllEquipments');
}
export {exportExcel};
