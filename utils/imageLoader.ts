/**
 * Utility functions for loading product images from assets folders
 */

/**
 * Load all images for a product from its assets folder
 * @param productId - The product ID (matches folder name in src/assets, case-insensitive)
 * @returns Array of image paths, sorted alphabetically
 */
export const loadProductImages = (productId: string): string[] => {
  try {
    // Dynamically import all images from the product folder
    const images = import.meta.glob('/src/assets/**/*.(jpg|jpeg|png|webp)', { eager: true, as: 'url' });
    
    // Filter images for this specific product (case-insensitive)
    const productImages: string[] = [];
    const normalizedProductId = productId.toLowerCase();
    
    for (const [path, url] of Object.entries(images)) {
      // Extract folder name from path: /src/assets/FOLDER/image.jpg
      const pathParts = path.split('/');
      const folderIndex = pathParts.indexOf('assets') + 1;
      
      if (folderIndex > 0 && folderIndex < pathParts.length) {
        const folderName = pathParts[folderIndex];
        
        // Match folder name (case-insensitive)
        if (folderName.toLowerCase() === normalizedProductId) {
          productImages.push(url as string);
        }
      }
    }
    
    // Sort images alphabetically by filename
    productImages.sort((a, b) => {
      const filenameA = a.split('/').pop() || '';
      const filenameB = b.split('/').pop() || '';
      return filenameA.localeCompare(filenameB);
    });
    
    return productImages;
  } catch (error) {
    console.error(`Error loading images for product ${productId}:`, error);
    return [];
  }
};

/**
 * Get the main (first) image for a product
 * @param productId - The product ID
 * @returns The first image path or a placeholder
 */
export const getMainProductImage = (productId: string): string => {
  const images = loadProductImages(productId);
  return images[0] || `https://picsum.photos/seed/${productId}/500/400`;
};

