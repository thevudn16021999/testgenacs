export const bytesToSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const a = Math.floor(Math.log(bytes) / Math.log(1024));
    const i = parseInt(a as any, 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};
