class UtilNumbers {
    public clamp = (value: number, min: number, max: number) => {
        return Math.min(Math.max(value, min), max);
    };

    public floor = (value: number, roundTo: number = 2) => {
        const v = Math.pow(10, roundTo);
        return Math.floor(value * v) / v;
    };
}

export const utilNumbers = new UtilNumbers();
