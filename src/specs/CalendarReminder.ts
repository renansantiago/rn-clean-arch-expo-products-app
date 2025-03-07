import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  addPurchaseReminder(
    productTitle: string,
    notes: string,
    purchaseDate: number
  ): Promise<{ eventId: string }>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('CalendarReminder');