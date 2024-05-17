import axios from "axios";
import { catchAsyncError } from "./catchAsyncError.js"
import { AppError } from "../utils/AppError.js";

export const fetchPredictions = () => {
    return catchAsyncError(
        async (req, res, next) => {
            const { acc_x, acc_y, acc_z, gyro_x, gyro_y, gyro_z } = req.body;
            const sensorsRead = { acc_x, acc_y, acc_z, gyro_x, gyro_y, gyro_z };
            const response = await axios.post('http://127.0.0.1:5000/predict', sensorsRead);
            if (response.data[0]){
                req.activity = response.data[0];
                return next()
            }
            return new AppError("there are something wrong in prediction" , 404)
        }
    )
}