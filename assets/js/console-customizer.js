// Console Customizer - Type 'customizer' in console to access
window.customizer = {
    // Theme colors
    theme: {
        setPrimary: (color) => {
            document.documentElement.style.setProperty('--accent-primary', color);
            console.log(`%c✅ Primary color changed to ${color}`, 'color: #a6e3a1;');
        },
        setBackground: (color) => {
            document.body.style.backgroundColor = color;
            console.log(`%c✅ Background color changed to ${color}`, 'color: #a6e3a1;');
        },
        setText: (color) => {
            document.body.style.color = color;
            console.log(`%c✅ Text color changed to ${color}`, 'color: #a6e3a1;');
        },
        reset: () => {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
            document.documentElement.style.removeProperty('--accent-primary');
            console.log('%c✅ Theme reset to default', 'color: #a6e3a1;');
        }
    },
    
    // Typography
    font: {
        setSize: (size) => {
            document.body.style.fontSize = size;
            console.log(`%c✅ Font size changed to ${size}`, 'color: #a6e3a1;');
        },
        setFamily: (family) => {
            document.body.style.fontFamily = family;
            console.log(`%c✅ Font family changed to ${family}`, 'color: #a6e3a1;');
        },
        reset: () => {
            document.body.style.fontSize = '';
            document.body.style.fontFamily = '';
            console.log('%c✅ Font settings reset', 'color: #a6e3a1;');
        }
    },
    
    // Notifications
    notifications: {
        speed: (seconds) => {
            const wrapper = document.querySelector('.scrolling-wrapper');
            if (wrapper) {
                wrapper.style.animationDuration = `${seconds}s`;
                console.log(`%c✅ Notification speed changed to ${seconds}s`, 'color: #a6e3a1;');
            }
        },
        pause: () => {
            const wrapper = document.querySelector('.scrolling-wrapper');
            if (wrapper) wrapper.style.animationPlayState = 'paused';
            console.log('%c⏸️ Notifications paused', 'color: #f9e2af;');
        },
        resume: () => {
            const wrapper = document.querySelector('.scrolling-wrapper');
            if (wrapper) wrapper.style.animationPlayState = 'running';
            console.log('%c▶️ Notifications resumed', 'color: #a6e3a1;');
        },
        remove: () => {
            const banner = document.querySelector('.notification-banner');
            if (banner) banner.style.display = 'none';
            console.log('%c❌ Notifications removed', 'color: #f38ba8;');
        },
        restore: () => {
            const banner = document.querySelector('.notification-banner');
            if (banner) banner.style.display = '';
            console.log('%c✅ Notifications restored', 'color: #a6e3a1;');
        }
    },
    
    // Layout
    layout: {
        containerWidth: (width) => {
            const container = document.querySelector('.container');
            if (container) container.style.maxWidth = width;
            console.log(`%c✅ Container max-width changed to ${width}`, 'color: #a6e3a1;');
        },
        padding: (value) => {
            const container = document.querySelector('.container');
            if (container) container.style.padding = value;
            console.log(`%c✅ Container padding changed to ${value}`, 'color: #a6e3a1;');
        },
        reset: () => {
            const container = document.querySelector('.container');
            if (container) {
                container.style.maxWidth = '';
                container.style.padding = '';
            }
            console.log('%c✅ Layout reset to default', 'color: #a6e3a1;');
        }
    },
    
    // Grid
    grid: {
        projectsColumns: (columns) => {
            const grid = document.querySelector('.projects-grid');
            if (grid) grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
            console.log(`%c✅ Projects grid changed to ${columns} columns`, 'color: #a6e3a1;');
        },
        blogColumns: (columns) => {
            const grid = document.querySelector('.blog-grid');
            if (grid) grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
            console.log(`%c✅ Blog grid changed to ${columns} columns`, 'color: #a6e3a1;');
        },
        servicesColumns: (columns) => {
            const grid = document.querySelector('.service-grid');
            if (grid) grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
            console.log(`%c✅ Services grid changed to ${columns} columns`, 'color: #a6e3a1;');
        },
        reset: () => {
            const projectsGrid = document.querySelector('.projects-grid');
            const blogGrid = document.querySelector('.blog-grid');
            const servicesGrid = document.querySelector('.service-grid');
            if (projectsGrid) projectsGrid.style.gridTemplateColumns = '';
            if (blogGrid) blogGrid.style.gridTemplateColumns = '';
            if (servicesGrid) servicesGrid.style.gridTemplateColumns = '';
            console.log('%c✅ Grid layouts reset', 'color: #a6e3a1;');
        }
    },
    
    // Content editing
    content: {
        updateHero: (text) => {
            const heroDesc = document.querySelector('.hero p');
            if (heroDesc) heroDesc.innerHTML = text;
            console.log('%c✅ Hero text updated', 'color: #a6e3a1;');
        },
        showJson: () => {
            console.log('%c📋 Current site data:', 'color: #89b4fa; font-weight: bold;');
            fetch('data.json').then(r => r.json()).then(data => console.log(data));
        },
        editJson: async (callback) => {
            const response = await fetch('data.json');
            let data = await response.json();
            console.log('%c✏️ Editing mode - modify the data object below:', 'color: #f9e2af;');
            console.log(data);
            console.log('%c💡 After editing, call: customizer.content.saveJson(yourEditedData)', 'color: #a6e3a1;');
            window._editableData = data;
        },
        saveJson: async (newData) => {
            console.log('%c⚠️ This requires a backend API to save. Use browser localStorage for demo:', 'color: #f9e2af;');
            localStorage.setItem('customContent', JSON.stringify(newData));
            console.log('%c✅ Data saved to localStorage. Refresh to load custom content.', 'color: #a6e3a1;');
        }
    },
    
    // Export/Import
    export: () => {
        const styles = {
            backgroundColor: document.body.style.backgroundColor,
            color: document.body.style.color,
            fontSize: document.body.style.fontSize,
            gridColumns: {
                projects: document.querySelector('.projects-grid')?.style.gridTemplateColumns,
                blog: document.querySelector('.blog-grid')?.style.gridTemplateColumns
            }
        };
        console.log('%c📦 Exporting current configuration:', 'color: #89b4fa; font-weight: bold;');
        console.log(JSON.stringify(styles, null, 2));
        return styles;
    },
    
    import: (config) => {
        if (config.backgroundColor) document.body.style.backgroundColor = config.backgroundColor;
        if (config.color) document.body.style.color = config.color;
        if (config.fontSize) document.body.style.fontSize = config.fontSize;
        if (config.gridColumns?.projects) {
            const grid = document.querySelector('.projects-grid');
            if (grid) grid.style.gridTemplateColumns = config.gridColumns.projects;
        }
        if (config.gridColumns?.blog) {
            const grid = document.querySelector('.blog-grid');
            if (grid) grid.style.gridTemplateColumns = config.gridColumns.blog;
        }
        console.log('%c✅ Configuration imported', 'color: #a6e3a1;');
    },
    
    // Help
    help: () => {
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #89b4fa;');
        console.log('%c🔧 CUSTOMIZER COMMANDS', 'color: #89b4fa; font-weight: bold; font-size: 16px;');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #89b4fa;');
        
        console.log('%c🎨 THEME:', 'color: #cba6f7; font-weight: bold;');
        console.log('  customizer.theme.setPrimary("#color")    - Change accent color');
        console.log('  customizer.theme.setBackground("#color") - Change background color');
        console.log('  customizer.theme.setText("#color")       - Change text color');
        console.log('  customizer.theme.reset()                 - Reset theme colors');
        
        console.log('%c📝 TYPOGRAPHY:', 'color: #cba6f7; font-weight: bold;');
        console.log('  customizer.font.setSize("20px")         - Change font size');
        console.log('  customizer.font.setFamily("Arial")      - Change font family');
        console.log('  customizer.font.reset()                 - Reset font settings');
        
        console.log('%c🔔 NOTIFICATIONS:', 'color: #cba6f7; font-weight: bold;');
        console.log('  customizer.notifications.speed(30)      - Change scroll speed (seconds)');
        console.log('  customizer.notifications.pause()        - Pause scrolling');
        console.log('  customizer.notifications.resume()       - Resume scrolling');
        console.log('  customizer.notifications.remove()       - Hide notifications');
        console.log('  customizer.notifications.restore()      - Show notifications');
        
        console.log('%c📐 LAYOUT:', 'color: #cba6f7; font-weight: bold;');
        console.log('  customizer.layout.containerWidth("1400px") - Change container width');
        console.log('  customizer.layout.padding("20px")        - Change padding');
        console.log('  customizer.layout.reset()               - Reset layout');
        
        console.log('%c🔲 GRID:', 'color: #cba6f7; font-weight: bold;');
        console.log('  customizer.grid.projectsColumns(4)      - Projects per row');
        console.log('  customizer.grid.blogColumns(4)          - Blog posts per row');
        console.log('  customizer.grid.servicesColumns(4)      - Services per row');
        console.log('  customizer.grid.reset()                 - Reset grids');
        
        console.log('%c📄 CONTENT:', 'color: #cba6f7; font-weight: bold;');
        console.log('  customizer.content.updateHero("text")   - Change hero text');
        console.log('  customizer.content.showJson()           - View current data.json');
        console.log('  customizer.content.editJson()           - Edit mode for data.json');
        
        console.log('%c💾 EXPORT/IMPORT:', 'color: #cba6f7; font-weight: bold;');
        console.log('  customizer.export()                     - Export current config');
        console.log('  customizer.import(config)               - Import saved config');
        
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #89b4fa;');
        console.log('%c💡 Tip: Type "customizer" to see all available commands', 'color: #a6e3a1;');
    }
};

// Add welcome message
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #89b4fa;');
console.log('%c🔧 CUSTOMIZER LOADED!', 'color: #89b4fa; font-weight: bold; font-size: 16px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #89b4fa;');
console.log('%cType "customizer.help()" to see all available commands', 'color: #a6e3a1;');
console.log('%cExamples:', 'color: #cba6f7;');
console.log('  customizer.theme.setPrimary("#ff0000")   - Change accent to red');
console.log('  customizer.notifications.speed(60)       - Slow down notifications');
console.log('  customizer.grid.projectsColumns(2)       - Show 2 projects per row');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #89b4fa;');