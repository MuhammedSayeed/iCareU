import { schedule } from "node-cron";
import { getTime } from "./utils.js";
import { medicationModel } from "../../databases/models/medicationModel.js";

export const cornJob = (io) => {
    // schedule('*/59 * * * * *', async () => {
    //     const { currentHour, currentMinute } = getTime();
    //     console.log(currentHour);
    //     const medicines = await medicationModel.find({ "time.hour": currentHour, "time.minutes": currentMinute })
    //     medicines.forEach(medicine => {
    //         console.log("id form database ", medicine.patient.toString());
    //         io.to(medicine.patient.toString()).emit("reminder", {
    //             message: "time to take medication",
    //             name: medicine.name
    //         })
    //     })
    // });
}