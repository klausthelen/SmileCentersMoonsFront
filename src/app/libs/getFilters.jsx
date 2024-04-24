export default async function getFilters() {
    const response = await fetch('https://zoi93n3tud.execute-api.us-east-1.amazonaws.com/get-attributes-to-filter',
    {
        cache: 'no-cache'
    }
    );
    if(!response.ok) {
        throw new Error('failed to fetch filters');
    }
    return await response.json();
}
