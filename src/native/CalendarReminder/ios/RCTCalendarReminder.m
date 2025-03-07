#import "RCTCalendarReminder.h"
#import <EventKit/EventKit.h>
#import <React/RCTLog.h>

@implementation CalendarReminder

// This macro exposes the module as a TurboModule
RCT_EXPORT_MODULE();

// Exposing method to JavaScript
RCT_EXPORT_METHOD(addPurchaseReminder:(NSString *)productTitle
                  notes:(NSString *)notes
                  purchaseDate:(nonnull NSNumber *)purchaseDateTimestamp
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  EKEventStore *eventStore = [[EKEventStore alloc] init];

  [eventStore requestAccessToEntityType:EKEntityTypeEvent completion:^(BOOL granted, NSError * _Nullable error) {
    if (!granted || error) {
      reject(@"calendar_permission_denied", @"Access to calendar was denied", error);
      return;
    }

    EKEvent *event = [EKEvent eventWithEventStore:eventStore];
    event.title = [NSString stringWithFormat:@"Reminder to purchase %@", productTitle];
    event.notes = notes;
    event.startDate = [NSDate dateWithTimeIntervalSince1970:[purchaseDateTimestamp doubleValue]];
    event.endDate = [event.startDate dateByAddingTimeInterval:3600]; // default 1-hour duration
    event.calendar = [eventStore defaultCalendarForNewEvents];

    NSError *eventError = nil;
    BOOL success = [eventStore saveEvent:event span:EKSpanThisEvent commit:YES error:&eventError];

    if (success) {
      resolve(@{@"eventId": event.eventIdentifier});
    } else {
      reject(@"event_creation_failed", @"Failed to create calendar event", eventError);
    }
  }];
}

@end
