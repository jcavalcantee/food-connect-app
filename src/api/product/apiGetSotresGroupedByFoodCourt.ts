import productClient from "../clients/productClient";

type StoreAvailability = {
    storeId: number;
    storeName: string;
    foodCourt: string;
};
  
type GroupedByFoodCourt = {
    foodCourt: string;
    stores: {
      storeId: number;
      storeName: string;
    }[];
};

function groupByFoodCourt(data: StoreAvailability[]): GroupedByFoodCourt[] {
    const grouped: Record<string, { storeId: number; storeName: string }[]> = {};
  
    data.forEach((item) => {
      if (!grouped[item.foodCourt]) {
        grouped[item.foodCourt] = [];
      }
  
      grouped[item.foodCourt].push({
        storeId: item.storeId,
        storeName: item.storeName,
      });
    });
  
    return Object.entries(grouped).map(([foodCourt, stores]) => ({
      foodCourt,
      stores,
    }));
}

export async function getStoresGroupedByFoodCourt(productName: string) {
    try {
        const response = await productClient.get("/product/storesGroupedByFoodCourt", {
            params: {
                productName,
            }
        });
        console.info("Requisição para o IP:", productClient.defaults.baseURL);
        if (response.status === 200) {
            const rawData: StoreAvailability[] = response.data;
            const groupedData = groupByFoodCourt(rawData);
            return groupedData;
        } else {
            throw new Error(`Status de resposta não esperado: ${response.status}`);
        }
    } catch (error: any) {
        if (error.response) {
            console.error("Erro de resposta do servidor:", error.response.data);
            console.error("Status code:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("Resposta não recebida:", error.request);
        } else {
            console.error("Erro na requisição:", error.message);
        }
        throw error;
    }
}