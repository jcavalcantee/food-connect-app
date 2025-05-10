import 'dotenv/config';

export default ({ config }) => {
    return {
        ...config,
        name: "FoodConnect",
        slug: "food-connect-app",
        version: "1.0.0",
        extra: {
            eas: {
                projectId: "9cf9209a-f696-46f1-8d0c-6d1bf7636647"
            },
            ACCESS_IP_API: process.env.EXPO_PUBLIC_ACCESS_IP_API
        },
        android: {
            package: "br.com.senac.foodconnect",
            versionCode: 1
        }
    };
};
