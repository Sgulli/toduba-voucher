export interface IService<TRequest, TResponse> {
  create(data: TRequest): Promise<TResponse>;
  get(id: string): Promise<TResponse>;
  getAll(): Promise<TResponse[]>;
  update(id: string, data: Partial<TRequest>): Promise<TResponse>;
  delete(id: string): Promise<TResponse>;
}
