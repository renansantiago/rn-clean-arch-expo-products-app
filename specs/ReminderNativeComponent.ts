import type { HostComponent, ViewProps } from "react-native";
import type { BubblingEventHandler } from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

type ReminderCalendarAddEvent = {
  result: "success" | "error";
};

export interface NativeProps extends ViewProps {
  date?: string;
  onReminderAdded?: BubblingEventHandler<ReminderCalendarAddEvent> | null;
}

export default codegenNativeComponent<NativeProps>(
  "CustomReminder"
) as HostComponent<NativeProps>;
