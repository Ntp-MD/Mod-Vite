export const useSmoothScroll = () => {
  const scrollToElement = (elementId: string, offset: number = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleAnchorClick = (event: MouseEvent, href?: string) => {
    const target = event.currentTarget as HTMLElement;
    const linkHref = href || target.getAttribute('href') || '';
    
    if (linkHref && linkHref.includes('#')) {
      const [pagePath, anchorId] = linkHref.split('#');
      
      // If we're on the same page, scroll to the anchor
      const currentPath = window.location.pathname;
      if (currentPath === pagePath || (!pagePath && currentPath === '/')) {
        event.preventDefault();
        
        setTimeout(() => {
          if (anchorId) {
            scrollToElement(anchorId, 80); // 80px offset for header
          }
        }, 100);
      }
    }
  };

  return {
    scrollToElement,
    handleAnchorClick
  };
};
