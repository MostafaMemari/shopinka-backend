type SortedObject<T = object> = (object: T) => T;

export const sortObject: SortedObject = (object) => {
    return Object.keys(object)
        .sort()
        .reduce((obj, key) => ({ ...obj, [key]: object[key] }), {});
};

export const transformNumberArray = (value: any) => {
    try {
        if (Array.isArray(value)) return value.map((v) => +v);

        const uniqueItems = new Set();
        const parsedValue = JSON.parse(value);
        if (Array.isArray(parsedValue)) {
            parsedValue
                .flat(Infinity)
                .map((item) => (item == null ? item : +item))
                .filter((item) => typeof item == 'number')
                .forEach((item) => uniqueItems.add(item));
            value = [...uniqueItems] as number[];
        }

        if (typeof parsedValue == 'string' || typeof value == 'string') value = [+value];

        return value;
    } catch (error) {
        return value;
    }
};