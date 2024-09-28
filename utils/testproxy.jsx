import axios from "axios";
const testProxy = async () => {
    ORBOT_HTTP_PROXY='http://127.0.0.1:8118'
    const proxyAxios = axios.create({
        baseURL: ORBOT_HTTP_PROXY,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    try {
        const res = await proxyAxios.get('https://httpbin.org/get');
        console.log("Proxy Test Response:", res.data);
    } catch (error) {
        console.error("Error testing proxy:", error);
    }
};
export default testProxy