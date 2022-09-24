import axios from "axios";

export default axios.create({
  baseURL: "https://oleac3cgq4.execute-api.us-east-1.amazonaws.com",
  timeout: 15000,
});
