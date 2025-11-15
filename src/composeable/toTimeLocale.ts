export function toTimeLocale(time:string): string{
    const formattedTIme = new Date(time);
    return formattedTIme.toLocaleString ('id-ID', {
        weekday: 'long',
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};