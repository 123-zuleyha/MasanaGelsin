import axios from "axios";
export default axios.create({
  baseURL: "https://masana-gelsin-backend.vercel.app/",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json;charset=UTF-8"
  },
});
