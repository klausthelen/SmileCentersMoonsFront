export default async function getResults(url) {
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error('failed to fetch results');
    }
    return await response.json();
}