import axios from "axios";

const apiMultivende = axios.create({ baseURL: "https://app.multivende.com/" });

export { apiMultivende };
