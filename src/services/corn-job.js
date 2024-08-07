import { schedule } from "node-cron";
import { getTime } from "./utils.js";
import { medicationModel } from "../../databases/models/medicationModel.js";

export const cornJob = (io) => {
    schedule('*/1 * * * *', async () => {
        const { currentHour, currentMinute, system } = getTime();
        const medicines = await medicationModel.find({ "time.hour": currentHour, "time.minutes": currentMinute, "time.system": system })
        medicines.forEach(medicine => {
            io.to(medicine.patient.toString()).emit("reminder", {
                message: "time to take medication",
                name: medicine.name
            })
        })
    });
}