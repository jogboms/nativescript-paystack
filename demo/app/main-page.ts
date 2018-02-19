import { EventData } from "tns-core-modules/data/observable";
import { HelloWorldModel } from "./main-view-model";

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: EventData) {
    page.bindingContext = new HelloWorldModel();
}
