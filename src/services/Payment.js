import axios from "axios";

export default class Payment {
    static async initiatePayment(productId, email){
        return axios.post("/api/v1/payment/initiate", {
            product_id: productId,
            email: email,
        })
    }

    static async completePayment(intentId){
        //successful
        return axios.post("/api/v1/payment/complete", {
            intent_id: intentId
        })
    }

    static async failPayment(intentId){
        //fail
        return axios.post("/api/v1/payment/fail", {
            intent_id: intentId
        })
    }




}