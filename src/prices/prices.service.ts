import { IService } from "../interfaces/service.interface";

export const pricesService: IService<any, any> = {
  create: async (data) => {
    // Implement the logic to create a price
    return data;
  },
  getAll: async () => {
    // Implement the logic to get all prices
    return [];
  },
  get: async (id: string) => {
    // Implement the logic to get a price by ID
    return { id };
  },
  update: async (id: string, data: any) => {
    // Implement the logic to update a price by ID
    return { id, ...data };
  },
  delete: async (id: string) => {
    // Implement the logic to delete a price by ID
    return { id };
  },
};
