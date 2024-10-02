export interface IPurchaseOrderRepository {
  purchaseOrderRegistration(purchaseOrder: any): Promise<void>;
  cancellation(): Promise<void>;
}
