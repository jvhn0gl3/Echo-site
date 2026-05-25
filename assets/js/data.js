export async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        document.title = data.site.title;
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', data.site.description);
        else {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            metaDesc.content = data.site.description;
            document.head.appendChild(metaDesc);
        }
        
        return data;
    } catch (error) {
        console.error('Failed to load data:', error);
        return null;
    }
}