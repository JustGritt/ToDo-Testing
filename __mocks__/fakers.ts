export function fakeTimerBetweenAddingUser(callback: () => void) {
    setTimeout(() => {
        callback && callback();
    }, 1800000);
}