import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/products.css';

const Products = () => {
  // State management
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const storedWishlist = localStorage.getItem('wishlistItems');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePriceRange, setActivePriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const storedViewed = localStorage.getItem('recentlyViewed');
    return storedViewed ? JSON.parse(storedViewed) : [];
  });
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Refs
  const productsGridRef = useRef(null);
  const searchInputRef = useRef(null);

  // Save to localStorage whenever these states change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Notification system
  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Enhanced product data
  const products = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'pain-relief',
      price: 5.99,
      originalPrice: 6.99,
       image: 'https://assets.sayacare.in/api/images/product_image/large_image/23/74/Paracetamol-500-mg-Tablet_1.webp',

      badge: '-15%',
      rating: 4.5,
      reviews: 128,
      description: 'Fast-acting pain relief for headaches, toothaches, and fever. Each tablet contains 500mg of paracetamol.',
      stock: 52,
      dosage: '1-2 tablets every 4-6 hours',
      ingredients: ['Paracetamol', 'Starch', 'Povidone'],
      tags: ['headache', 'fever', 'pain-relief']
    },
    {
      id: 2,
      name: 'Ibuprofen 200mg',
      category: 'pain-relief',
      price: 7.49,
      originalPrice: 7.49,
      image: 'https://5.imimg.com/data5/SELLER/Default/2023/7/325863554/WI/JM/SY/135658020/ibuprofen-tablets-ip-200-mg-.jpg',
      rating: 4.2,
      reviews: 96,
      description: 'Anti-inflammatory pain reliever for muscle aches, back pain, and arthritis symptoms.',
      stock: 38,
      dosage: '1-2 tablets every 4-6 hours',
      ingredients: ['Ibuprofen', 'Microcrystalline Cellulose', 'Croscarmellose Sodium'],
      tags: ['inflammation', 'muscle pain', 'arthritis']
    },
    {
      id: 3,
      name: 'Vitamin C 1000mg',
      category: 'vitamins',
      price: 12.99,
      originalPrice: 14.99,
      image: 'https://suppliment.in/wp-content/uploads/2020/02/1-12.jpg',
      badge: 'BESTSELLER',
      rating: 4.8,
      reviews: 215,
      description: 'High-potency vitamin C with rose hips for immune support and antioxidant protection.',
      stock: 75,
      dosage: '1 tablet daily',
      ingredients: ['Ascorbic Acid', 'Rose Hips', 'Citrus Bioflavonoids'],
      tags: ['immune support', 'antioxidant', 'cold prevention']
    },
    {
      id: 4,
      name: 'Aspirin 325mg',
      category: 'pain-relief',
      price: 4.99,
      originalPrice: 4.99,
      image: 'https://www.pharmacy24.ca/wp-content/uploads/2018/08/9a9ba1f8fb2c4ac2744673fa1fa8df64_ra.jpg',
      rating: 4.0,
      reviews: 82,
      description: 'Blood-thinning pain reliever for headaches and reducing risk of heart attack.',
      stock: 41,
      dosage: '1-2 tablets every 4 hours',
      ingredients: ['Aspirin', 'Starch', 'Triacetin'],
      tags: ['headache', 'heart health', 'fever']
    },
    {
      id: 5,
      name: 'Hand Sanitizer 8oz',
      category: 'first-aid',
      price: 9.99,
      originalPrice: 9.99,
      image: 'https://shoppepure.com/cdn/shop/products/anit-viralgel8ozpeach3_2000x.jpg?v=1611950301',
      badge: 'NEW',
      rating: 4.7,
      reviews: 63,
      description: '70% alcohol formula that kills 99.9% of germs. Enriched with aloe vera to prevent dry skin.',
      stock: 89,
      ingredients: ['Ethyl Alcohol (70%)', 'Aloe Vera Extract', 'Vitamin E', 'Glycerin'],
      tags: ['sanitizer', 'germ protection', 'portable']
    },
    {
      id: 6,
      name: 'Multivitamin Complete',
      category: 'vitamins',
      price: 15.99,
      originalPrice: 19.99,
      image: 'https://mycf.in/cdn/shop/products/NOVOSULESWOMEN_60HEROIMAGEWITHSIDEBARflavour2_900x.jpg?v=1680947098',
      badge: '-20%',
      rating: 4.6,
      reviews: 178,
      description: 'Complete multivitamin with 23 essential vitamins and minerals for daily health support.',
      stock: 23,
      dosage: '1 tablet daily with food',
      ingredients: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin E', 'B Vitamins', 'Zinc', 'Magnesium'],
      tags: ['daily health', 'immune support', 'energy']
    },
    {
      id: 7,
      name: 'Military grade Cyanyide',
      category: 'first-aid',
      price: 6.49,
      originalPrice: 6.49,
      image: 'https://www.sigmaaldrich.cn/deepweb/assets/sigmaaldrich/product/images/370/606/261fed48-0a47-4488-8992-be30e016d6ec/800/261fed48-0a47-4488-8992-be30e016d6ec.jpg',
      rating: 4.4,
      reviews: 56,
      description: 'Water-resistant, flexible bandages in assorted sizes for minor cuts and scrapes.',
      stock: 112,
      ingredients: ['Non-stick Pad', 'Adhesive Material', 'Breathable Material'],
      tags: ['cuts', 'wounds', 'first-aid']
    },
    {
      id: 8,
      name: 'Vitamin D3 2000 IU',
      category: 'vitamins',
      price: 11.99,
      originalPrice: 11.99,
      image: 'http://www.briyosupplements.com/cdn/shop/products/Briyo_Vitamin_D3_2000_IU_Capsules_Vitamin_d_-_90_capsules.jpg?v=1726819416',
      rating: 4.9,
      reviews: 142,
      description: 'High-potency vitamin D3 for bone health, immune support, and mood regulation.',
      stock: 67,
      dosage: '1 softgel daily',
      ingredients: ['Vitamin D3 (Cholecalciferol)', 'Olive Oil', 'Gelatin'],
      tags: ['bone health', 'immune support', 'mood']
    },
  ];

  // Helper function to format as Indian Rupee
  const formatINR = (amount) => `₹${amount.toFixed(2)}`;

  // Product actions
  const handleAddToCart = (product) => {
    if (!cartItems.some((item) => item.id === product.id)) {
      setCartItems(prev => [...prev, {...product, quantity: 1}]);
      showToast(`${product.name} added to cart!`);
    } else {
      showToast(`${product.name} is already in your cart`);
    }
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      const message = exists ? `${product.name} removed from wishlist` : `${product.name} added to wishlist!`;
      showToast(message);
      return exists ? prev.filter(item => item.id !== product.id) : [...prev, product];
    });
  };

  const viewProductDetails = (product) => {
    // Add to recently viewed
    setRecentlyViewed(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex >= 0) {
        // Move to front of array if already exists
        const newArray = [...prev];
        const [item] = newArray.splice(existingIndex, 1);
        return [item, ...newArray].slice(0, 5); // Keep only the 5 most recent
      } else {
        return [product, ...prev].slice(0, 5); // Keep only the 5 most recent
      }
    });

    setExpandedProduct(expandedProduct?.id === product.id ? null : product);
  };

  // Enhanced filtering and sorting
  const filterAndSortProducts = () => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
        const matchesPrice =
          activePriceRange === 'all' ||
          (activePriceRange === 'under10' && product.price < 10) ||
          (activePriceRange === '10-20' && product.price >= 10 && product.price <= 20) ||
          (activePriceRange === 'over20' && product.price > 20);
        
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  };

  // Clear all filters function
  const clearFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
    setActivePriceRange('all');
    setSortBy('default');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Animation function for adding to cart
  const animateAddToCart = (event, productId) => {
    // Create a clone of the button
    const button = event.currentTarget;
    const clone = button.cloneNode(true);
    
    // Get positions
    const rect = button.getBoundingClientRect();
    const cartIcon = document.querySelector('.cart-icon'); // Assuming there's a cart icon in the header
    
    if (!cartIcon) return;
    
    const cartRect = cartIcon.getBoundingClientRect();
    
    // Style the clone
    clone.style.position = 'fixed';
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.opacity = '0.9';
    clone.style.zIndex = '1000';
    clone.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    clone.style.pointerEvents = 'none';
    
    // Add to body
    document.body.appendChild(clone);
    
    // Trigger animation
    setTimeout(() => {
      clone.style.transform = 'scale(0.3)';
      clone.style.left = `${cartRect.left + cartRect.width/2 - rect.width/6}px`;
      clone.style.top = `${cartRect.top + cartRect.height/2 - rect.height/6}px`;
      clone.style.opacity = '0';
      
      // Remove after animation
      setTimeout(() => {
        clone.remove();
      }, 800);
    }, 10);
  };

  // JSX for product cards
  const renderProductCard = (product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    const isInCart = cartItems.some(item => item.id === product.id);
    const isExpanded = expandedProduct?.id === product.id;
    
    return (
      <div 
        className={`product-card ${viewMode === 'list' ? 'list-view' : ''} ${isExpanded ? 'expanded' : ''}`} 
        key={product.id}
      >
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {product.badge && <span className="product-badge">{product.badge}</span>}
          {product.originalPrice > product.price && (
            <span className="discount-badge">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
        <div className="product-info">
          <div className="product-header">
            <h3 className="product-title" onClick={() => viewProductDetails(product)}>{product.name}</h3>
            <div className="product-rating">
              <span className="stars">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : i < product.rating ? 'half-filled' : ''}`}
                  ></i>
                ))}
              </span>
              <span className="rating-count">({product.reviews})</span>
            </div>
          </div>
          
          <div className="product-price">
            <span className="current-price">{formatINR(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="original-price">{formatINR(product.originalPrice)}</span>
            )}
          </div>
          
          {/* Tags */}
          <div className="product-tags">
            {product.tags?.slice(0, 3).map(tag => (
              <span key={tag} className="product-tag">{tag}</span>
            ))}
          </div>
          
          {/* Description (only visible in list view or when expanded) */}
          {(viewMode === 'list' || isExpanded) && (
            <p className="product-description">{product.description}</p>
          )}
          
          {/* Additional details (only visible when expanded) */}
          {isExpanded && (
            <div className="product-extended-info">
              <div className="product-stock">
                <span className={`stock-status ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
                  {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                </span>
                <span className="stock-count">{product.stock} remaining</span>
              </div>
              
              {product.dosage && (
                <div className="product-dosage">
                  <h4>Recommended Dosage:</h4>
                  <p>{product.dosage}</p>
                </div>
              )}
              
              {product.ingredients && (
                <div className="product-ingredients">
                  <h4>Ingredients:</h4>
                  <p>{product.ingredients.join(', ')}</p>
                </div>
              )}
            </div>
          )}
          
          <div className="product-actions">
            <button 
              className={`add-to-cart ${isInCart ? 'in-cart' : ''}`} 
              onClick={(e) => {
                if (!isInCart) {
                  handleAddToCart(product);
                  animateAddToCart(e, product.id);
                }
              }}
              disabled={product.stock === 0}
            >
              <i className={`fas ${isInCart ? 'fa-check' : 'fa-shopping-cart'}`}></i> 
              {isInCart ? 'Added' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            
            <div className="secondary-actions">
              <button
                className={`wishlist-btn ${isInWishlist ? 'in-wishlist' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <span className="btn-char">♥</span>
                <i className={isInWishlist ? 'fas fa-heart' : 'far fa-heart'}></i>
              </button>
              
              <button 
                className={`details-btn ${isExpanded ? 'active' : ''}`}
                onClick={() => viewProductDetails(product)}
                aria-label={isExpanded ? "Show less details" : "Show more details"}
              >
                <span className="btn-char">{isExpanded ? '▲' : '▼'}</span>
                <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filteredProducts = filterAndSortProducts();

  return (
    <>
      <Header cartItemCount={cartItems.length} wishlistItemCount={wishlistItems.length} />
      
      {/* Toast notification */}
      <div className={`toast-notification ${showNotification ? 'show' : ''}`}>
        {notificationMessage}
      </div>
      
      <main className="products-page">
        <section className="hero">
          <div className="hero-content">
            <h1>Explore Our Health Products</h1>
            <p>Quality healthcare products for your wellbeing</p>
          </div>
          <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input
            ref={searchInputRef}
            type="text"
            className="search-box"
            placeholder="Search for medicines, health products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        </section>
        
        
        <div className="products-container">
          <div className="control-panel">
            <div className="filter-section">
              <div className="filter-group">
                <h3>Categories</h3>
                <div className="filter-options">
                  {['all', 'pain-relief', 'vitamins', 'first-aid'].map((cat) => (
                    <button
                      key={cat}
                      className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="filter-group">
                <h3>Price Range</h3>
                <div className="filter-options">
                  {[
                    { label: 'All', value: 'all' },
                    { label: 'Under ₹10', value: 'under10' },
                    { label: '₹10-₹20', value: '10-20' },
                    { label: 'Over ₹20', value: 'over20' },
                  ].map(({ label, value }) => (
                    <button
                      key={value}
                      className={`filter-btn ${activePriceRange === value ? 'active' : ''}`}
                      onClick={() => setActivePriceRange(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Active filters display */}
              {(activeCategory !== 'all' || activePriceRange !== 'all' || searchTerm) && (
                <div className="active-filters">
                  <h3>Active Filters:</h3>
                  <div className="filter-tags">
                    {activeCategory !== 'all' && (
                      <span className="filter-tag">
                        Category: {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace('-', ' ')}
                        <button onClick={() => setActiveCategory('all')}>×</button>
                      </span>
                    )}
                    {activePriceRange !== 'all' && (
                      <span className="filter-tag">
                        Price: {
                          activePriceRange === 'under10' ? 'Under ₹10' :
                          activePriceRange === '10-20' ? '₹10-₹20' :
                          'Over ₹20'
                        }
                        <button onClick={() => setActivePriceRange('all')}>×</button>
                      </span>
                    )}
                    {searchTerm && (
                      <span className="filter-tag">
                        Search: "{searchTerm}"
                        <button onClick={() => setSearchTerm('')}>×</button>
                      </span>
                    )}
                    <button className="clear-all-filters" onClick={clearFilters}>
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="products-tools">
              <div className="products-count">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </div>
              
              <div className="sorting-view-options">
                <div className="sort-container">
                  <label htmlFor="sort-select">Sort by:</label>
                  <select 
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="default">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="name">Name</option>
                  </select>
                </div>
                
                <div className="view-toggle">
                  <button 
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <i className="fas fa-th"></i>
                  </button>
                  <button 
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <i className="fas fa-list"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recently viewed products */}
          {recentlyViewed.length > 0 && (
            <div className="recently-viewed">
              <h3>Recently Viewed</h3>
              <div className="recently-viewed-list">
                {recentlyViewed.map(product => (
                  <div 
                    key={product.id} 
                    className="recently-viewed-item"
                    onClick={() => viewProductDetails(product)}
                  >
                    <img src={product.image} alt={product.name} />
                    <span>{product.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Loading state */}
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="no-results">
                  <i className="fas fa-search-minus"></i>
                  <h2>No products found</h2>
                  <p>Try adjusting your filters or search term.</p>
                  <button className="reset-search" onClick={clearFilters}>
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div 
                  ref={productsGridRef}
                  className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}
                >
                  {filteredProducts.map(product => renderProductCard(product))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
    </>
  );
};

export default Products;