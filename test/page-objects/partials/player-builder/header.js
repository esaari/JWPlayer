/**
 * The header that is persistent in the Player Builder page and through all it's tabs
 * @type {{successNotification: string, closePlayerButton: string, saveChangesButton: string}}
 */

const selectors = {
    "saveChangesButton": ".action-buttons [ng-show=\"canEditPlayers()\"]",
    "closePlayerButton": ".action-buttons [ng-click=\"close()\"]",
    "successNotification": ".success.notification-show"
};

export { selectors }