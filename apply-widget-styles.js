// Apply widget styles immediately when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Applying widget styles...');
    
    // Apply styles to Car Overview widget
    const overviewWidget = document.querySelector('.car-overview-widget');
    if (overviewWidget) {
        overviewWidget.style.cssText = 'background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); margin: 8px auto; max-width: 500px; border: 1px solid #e5e7eb; display: block; width: 100%; overflow: hidden;';
        
        const overviewHeader = overviewWidget.querySelector('.widget-header');
        if (overviewHeader) {
            overviewHeader.style.cssText = 'background: #f8f9fa; padding: 4px 8px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; width: 100%;';
            
            const headerTitle = overviewHeader.querySelector('h3');
            if (headerTitle) {
                headerTitle.style.cssText = 'font-size: 22px; font-weight: 600; color: #1f2937; margin: 0; text-transform: none;';
            }
            
            const headerIcon = overviewHeader.querySelector('i');
            if (headerIcon) {
                headerIcon.style.display = 'none'; // Hide the chevron button
            }
        }
        
        const overviewContent = overviewWidget.querySelector('.overview-content');
        if (overviewContent) {
            overviewContent.style.cssText = 'padding: 0; background: white; width: 100%;';
        }
        
        // Apply styles to all rows and items - 3-column grid layout
        const overviewRows = overviewWidget.querySelectorAll('.overview-row');
        overviewRows.forEach((row, rowIndex) => {
            // Check if this is overview widget (2 columns) or specs widget (3 columns)
            const isOverviewWidget = row.closest('.car-overview-widget');
            const columnCount = isOverviewWidget ? '1fr 1fr' : '1fr 1fr 1fr';
            row.style.cssText = `display: grid; grid-template-columns: ${columnCount}; border-bottom: 1px solid #e5e7eb; width: 100%; min-height: 24px;`;
            
            const items = row.querySelectorAll('.overview-item');
            items.forEach((item, itemIndex) => {
                item.style.cssText = 'display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 6px 8px; background: white; border-right: 1px solid #e5e7eb; min-height: 24px;';
                
                // Remove icon styling
                const icon = item.querySelector('i');
                if (icon) {
                    icon.style.display = 'none';
                }
                
                const label = item.querySelector('.overview-label');
                if (label) {
                    label.style.cssText = 'font-size: 14px; color: #9ca3af; font-weight: 400; margin: 0; text-transform: uppercase; letter-spacing: 0.2px; line-height: 1.1; flex-shrink: 0;';
                }
                
                const value = item.querySelector('.overview-value');
                if (value) {
                    value.style.cssText = 'font-size: 16px; color: #1f2937; font-weight: 600; margin: 0; background: none; padding: 0; border-radius: 0; border: none; line-height: 1.1; text-align: right; flex-shrink: 0;';
                }
            });
            
            // Remove border from last item in each row
            const lastItem = row.querySelector('.overview-item:last-child');
            if (lastItem) {
                lastItem.style.borderRight = 'none';
            }
        });
    }
    
    // Apply styles to Car Specifications widget
    const specsWidget = document.querySelector('.car-specs-widget');
    if (specsWidget) {
        specsWidget.style.cssText = 'background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); margin: 8px auto; max-width: 500px; border: 1px solid #e5e7eb; display: block; width: 100%; overflow: hidden;';
        
        const specsHeader = specsWidget.querySelector('.widget-header');
        if (specsHeader) {
            specsHeader.style.cssText = 'background: #f8f9fa; padding: 4px 8px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; width: 100%;';
            
            const headerTitle = specsHeader.querySelector('h3');
            if (headerTitle) {
                headerTitle.style.cssText = 'font-size: 22px; font-weight: 600; color: #1f2937; margin: 0; text-transform: none;';
            }
            
            const headerIcon = specsHeader.querySelector('i');
            if (headerIcon) {
                headerIcon.style.display = 'none'; // Hide the chevron button
            }
        }
        
        const specsContent = specsWidget.querySelector('.specs-content');
        if (specsContent) {
            specsContent.style.cssText = 'padding: 0; background: white; width: 100%;';
        }
        
        // Apply styles to all rows and items - 3-column grid layout
        const specsRows = specsWidget.querySelectorAll('.specs-row');
        specsRows.forEach((row, rowIndex) => {
            // For specs, we might have 2 or 3 items per row
            const items = row.querySelectorAll('.spec-item');
            const columnCount = items.length === 2 ? '1fr 1fr' : '1fr 1fr 1fr';
            row.style.cssText = `display: grid; grid-template-columns: ${columnCount}; border-bottom: 1px solid #e5e7eb; width: 100%; min-height: 24px;`;
            
            items.forEach((item, itemIndex) => {
                item.style.cssText = 'display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 6px 8px; background: white; border-right: 1px solid #e5e7eb; min-height: 24px;';
                
                // Remove icon styling
                const icon = item.querySelector('i');
                if (icon) {
                    icon.style.display = 'none';
                }
                
                const label = item.querySelector('.spec-label');
                if (label) {
                    label.style.cssText = 'font-size: 14px; color: #9ca3af; font-weight: 400; margin: 0; text-transform: uppercase; letter-spacing: 0.2px; line-height: 1.1; flex-shrink: 0;';
                }
                
                const value = item.querySelector('.spec-value');
                if (value) {
                    value.style.cssText = 'font-size: 16px; color: #1f2937; font-weight: 600; margin: 0; background: none; padding: 0; border-radius: 0; border: none; line-height: 1.1; text-align: right; flex-shrink: 0;';
                }
            });
            
            // Remove border from last item in each row
            const lastItem = row.querySelector('.spec-item:last-child');
            if (lastItem) {
                lastItem.style.borderRight = 'none';
            }
        });
    }
    
    console.log('Widget styles applied successfully!');
});
