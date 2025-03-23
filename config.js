import env from 'env-var';

const config = {
    localIp: env.get('LOCAL_IP').asString(),
}

export default config;