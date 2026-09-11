document.addEventListener("DOMContentLoaded", () => {
    // Wait a bit to ensure dynamic content like REI_DATA is rendered
    setTimeout(() => {
        const elements = document.querySelectorAll('.stat b, .kpi b');
        if(elements.length === 0) return;
        
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
    }, 200);
    
    function animateValue(obj) {
        const text = obj.innerText;
        // Parse prefix, number with commas/decimals, and suffix
        const match = text.match(/^([^\d]*)(\d[\d,.]*)([^\d]*)$/);
        if (!match) return;
        
        const prefix = match[1];
        const numStr = match[2].replace(/,/g, '');
        const suffix = match[3];
        
        let endVal = parseFloat(numStr);
        if (isNaN(endVal) || endVal === 0) return;
        
        let startVal = 0;
        let duration = 2000; // 2 seconds
        let start = null;
        
        const hasDecimals = numStr.includes('.');
        
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            
            // easeOutQuart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const currentVal = startVal + (endVal - startVal) * easeProgress;
            
            let displayNum = hasDecimals ? currentVal.toFixed(1) : Math.floor(currentVal);
            displayNum = displayNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
            obj.innerText = prefix + displayNum + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerText = text; // exact match at the end
            }
        }
        window.requestAnimationFrame(step);
    }
});