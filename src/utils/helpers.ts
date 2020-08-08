export const getNextTableRow = (tableRow: number, edge: number,  visibleRowsCount = 50) => {
    const nextTableRow = tableRow - visibleRowsCount;
    return (nextTableRow < edge) ? edge : nextTableRow;
};

export function getAllRowValues<T>(arr1: T[], arr2: T[]) {
    return arr1.slice(0, arr1.length - 2).concat(arr2, arr1.slice(-1));
}
