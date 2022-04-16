export default function paginate(items, pageSize, currentPage) {
    const startIndex = (currentPage - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
}
