import { ClickAndCollectLocation } from "./ClickAndCollectLocation";
import { InStoreLocation } from "./InStoreLocation";

export type ProductAvailabilityResponse = {
    clickAndCollect: ClickAndCollectLocation[];
    inStore: InStoreLocation[];
};
