let propertiesData = [
    {
        id: 1,
        title: "DLF Urban Grande Towers",
        price: 165000000,
        priceDisplay: "₹1,65,000,000",
        type: "Flat",
        location: "Sector 62 Extension, Near NH-24, Delhi",
        city: "Delhi",
        beds: 3,
        baths: 3,
        sqft: 1850,
        isNew: true,
        isVerified: true,
        furnishing: "Furnished",
        views: 42,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
        description: "Experience luxury living at DLF Urban Grande Towers. Features premium marble flooring, smart home automation, high-speed elevators, and 24/7 security."
    },
    {
        id: 2,
        title: "Emerald Sky Signature Villas",
        price: 185000000,
        priceDisplay: "₹1,85,000,000",
        type: "Villa",
        location: "Sector 150, Near Noida-Greater Noida Express...",
        city: "Noida",
        beds: 4,
        baths: 4,
        sqft: 2400,
        isNew: true,
        isVerified: true,
        furnishing: "Semi-Furnished",
        views: 89,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        description: "Exquisite signature villa with private garden, infinity pool, personal deck, and custom architectural woodwork."
    },
    {
        id: 3,
        title: "Lakeview Apartments",
        price: 95000000,
        priceDisplay: "₹95,000,000",
        type: "Flat",
        location: "Near ITPL Main Road, Whitefield Phase 1, Beng...",
        city: "Bengaluru",
        beds: 3,
        baths: 2,
        sqft: 1600,
        isNew: true,
        isVerified: true,
        furnishing: "Furnished",
        views: 31,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        description: "Serene lakeside property offering scenic sunrise views, modular kitchen, power backup, and proximity to major tech parks."
    },
    {
        id: 4,
        title: "Palm Springs Luxury Haven",
        price: 112000000,
        priceDisplay: "₹1,12,000,000",
        type: "Villa",
        location: "Golf Course Road, Sector 54, Gurgaon",
        city: "Gurgaon",
        beds: 4,
        baths: 4,
        sqft: 3100,
        isNew: true,
        isVerified: true,
        furnishing: "Furnished",
        views: 115,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        description: "Ultra-luxury gated community villa with double height living area, Italian marble, rooftop lounge, and private elevator."
    },
    {
        id: 5,
        title: "The Royal Sky Penthouse",
        price: 85000000,
        priceDisplay: "₹85,000,000",
        type: "Penthouse",
        location: "Bandra West, Hill Road, Mumbai",
        city: "Mumbai",
        beds: 5,
        baths: 5,
        sqft: 4200,
        isNew: true,
        isVerified: true,
        furnishing: "Unfurnished",
        views: 240,
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
        description: "Iconic penthouse with 360-degree panoramic ocean views, private jacuzzi, expansive glass facade, and concierges."
    }
];

const extraProperties = [
    {
        id: 6,
        title: "Prestige Cyber Heights",
        price: 65000000,
        priceDisplay: "₹6,50,00,000",
        type: "Commercial",
        location: "Cyber City, DLF Phase 2, Gurgaon",
        city: "Gurgaon",
        beds: 0,
        baths: 2,
        sqft: 3500,
        isNew: true,
        isVerified: true,
        furnishing: "Furnished",
        views: 56,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        description: "Grade-A office space in prime tech corridor with floor-to-ceiling glass windows and ample basement parking."
    },
    {
        id: 7,
        title: "Godrej Woodsville Villa",
        price: 145000000,
        priceDisplay: "₹1,45,00,000",
        type: "Villa",
        location: "Hinjewadi Phase 1, Pune",
        city: "Pune",
        beds: 4,
        baths: 4,
        sqft: 2800,
        isNew: false,
        isVerified: true,
        furnishing: "Semi-Furnished",
        views: 78,
        image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
        description: "Eco-friendly villa surrounded by lush greenery, solar power installation, clubhouse access, and private lawn."
    }
];

let currentProperties = [...propertiesData];
let selectedBHK = 'all';
let isFavoriteMap = {};
let currentUser = null;
let isWishlistFilterActive = false;

const propertiesGrid = document.getElementById('propertiesGrid');
const resultsCount = document.getElementById('resultsCount');
const filterCityInput = document.getElementById('filterCity');
const priceRangeInput = document.getElementById('priceRange');
const priceValueText = document.getElementById('priceValue');
const bhkContainer = document.getElementById('bhkContainer');
const resetBtn = document.getElementById('resetFilters');
const sortBySelect = document.getElementById('sortBy');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');
const mapViewBtn = document.getElementById('mapViewBtn');
const mapViewContainer = document.getElementById('mapViewContainer');
const propertyModal = document.getElementById('propertyModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const heroSearchBtn = document.getElementById('heroSearchBtn');
const searchLocationInput = document.getElementById('searchLocation');
const searchTypeSelect = document.getElementById('searchType');
const playVideoBtn = document.getElementById('playVideoBtn');
const videoModal = document.getElementById('videoModal');
const closeVideoModal = document.getElementById('closeVideoModal');
const videoIframe = document.getElementById('videoIframe');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Auth Elements
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const tabLoginBtn = document.getElementById('tabLoginBtn');
const tabRegisterBtn = document.getElementById('tabRegisterBtn');
const loginFormContainer = document.getElementById('loginFormContainer');
const registerFormContainer = document.getElementById('registerFormContainer');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loggedOutNav = document.getElementById('loggedOutNav');
const loggedInNav = document.getElementById('loggedInNav');
const userAvatar = document.getElementById('userAvatar');
const userNameText = document.getElementById('userNameText');
const logoutBtn = document.getElementById('logoutBtn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const wishlistBadgeCount = document.getElementById('wishlistBadgeCount');
const wishlistNavBtn = document.getElementById('wishlistNavBtn');

// Post Property Elements
const postModal = document.getElementById('postModal');
const postPropertyBtn = document.getElementById('postPropertyBtn');
const closePostModal = document.getElementById('closePostModal');
const postPropertyForm = document.getElementById('postPropertyForm');

function renderProperties(list) {
    if (list.length === 0) {
        propertiesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: white; border-radius: 16px; border: 1px solid #e2e8f0;">
                <i class="fa-solid fa-house-circle-xmark" style="font-size: 3rem; color: #94a3b8; margin-bottom: 12px;"></i>
                <h3 style="font-weight: 700; color: #1e293b;">No properties found</h3>
                <p style="color: #64748b; font-size: 0.9rem;">Try adjusting your filter parameters or search terms.</p>
            </div>
        `;
        resultsCount.innerHTML = `Showing <strong>0</strong> properties`;
        return;
    }

    resultsCount.innerHTML = `Showing <strong>${list.length}</strong> properties`;

    propertiesGrid.innerHTML = list.map(item => `
        <div class="property-card" data-id="${item.id}">
            <div class="card-img-wrapper">
                <img src="${item.image}" alt="${item.title}" class="card-img">
                <div class="card-badges">
                    ${item.isNew ? '<span class="badge-new">NEW</span>' : ''}
                    ${item.isVerified ? '<span class="badge-verified"><i class="fa-solid fa-check"></i> VERIFIED</span>' : ''}
                </div>
                <button class="btn-favorite ${isFavoriteMap[item.id] ? 'active' : ''}" onclick="toggleFavorite(event, ${item.id})">
                    <i class="${isFavoriteMap[item.id] ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                </button>
                <div class="card-price-tag">${item.priceDisplay}</div>
            </div>
            
            <div class="card-body">
                <div class="card-tag-row">
                    <span class="property-type-tag">${item.type}</span>
                    <span class="card-views"><i class="fa-regular fa-eye"></i> ${item.views}</span>
                </div>
                
                <h3 class="property-title">${item.title}</h3>
                <div class="property-location">
                    <i class="fa-solid fa-location-dot"></i> ${item.location}
                </div>
                
                <div class="property-specs">
                    <div class="spec-item">
                        <i class="fa-solid fa-bed"></i>
                        <span class="spec-value">${item.beds}</span>
                        <span class="spec-label">BEDS</span>
                    </div>
                    <div class="spec-item">
                        <i class="fa-solid fa-bath"></i>
                        <span class="spec-value">${item.baths}</span>
                        <span class="spec-label">BATHS</span>
                    </div>
                    <div class="spec-item">
                        <i class="fa-solid fa-vector-square"></i>
                        <span class="spec-value">${item.sqft}</span>
                        <span class="spec-label">SQ FT</span>
                    </div>
                </div>

                <button class="btn btn-details" onclick="openPropertyModal(${item.id})">
                    View Details
                </button>
            </div>
        </div>
    `).join('');
}

window.toggleFavorite = function(e, id) {
    e.stopPropagation();
    isFavoriteMap[id] = !isFavoriteMap[id];
    
    const favCount = Object.values(isFavoriteMap).filter(Boolean).length;
    wishlistBadgeCount.textContent = favCount;

    if (isWishlistFilterActive) {
        currentProperties = propertiesData.filter(p => isFavoriteMap[p.id]);
    }

    renderProperties(currentProperties);
};

wishlistNavBtn.addEventListener('click', () => {
    isWishlistFilterActive = !isWishlistFilterActive;
    if (isWishlistFilterActive) {
        currentProperties = propertiesData.filter(p => isFavoriteMap[p.id]);
        wishlistNavBtn.style.color = '#0d9488';
    } else {
        currentProperties = [...propertiesData];
        wishlistNavBtn.style.color = '#e11d48';
    }
    renderProperties(currentProperties);
    document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
});

function applyFilters() {
    isWishlistFilterActive = false;
    const cityQuery = filterCityInput.value.toLowerCase().trim();
    const maxPriceCr = parseFloat(priceRangeInput.value);
    const selectedTypes = Array.from(document.querySelectorAll('.type-checkbox:checked')).map(cb => cb.value);
    const selectedFurnishings = Array.from(document.querySelectorAll('.furnish-checkbox:checked')).map(cb => cb.value);

    currentProperties = propertiesData.filter(item => {
        const matchesCity = !cityQuery || item.location.toLowerCase().includes(cityQuery) || item.city.toLowerCase().includes(cityQuery);
        const itemPriceCr = item.price / 10000000;
        const maxLimitCr = maxPriceCr / 100;
        const matchesPrice = itemPriceCr <= maxLimitCr;
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.type);

        let matchesBHK = true;
        if (selectedBHK !== 'all') {
            if (selectedBHK === '5+') {
                matchesBHK = item.beds >= 5;
            } else {
                matchesBHK = item.beds === parseInt(selectedBHK);
            }
        }

        const matchesFurnish = selectedFurnishings.length === 0 || selectedFurnishings.includes(item.furnishing);

        return matchesCity && matchesPrice && matchesType && matchesBHK && matchesFurnish;
    });

    sortProperties();
}

function sortProperties() {
    const sortVal = sortBySelect.value;
    if (sortVal === 'price-low') {
        currentProperties.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price-high') {
        currentProperties.sort((a, b) => b.price - a.price);
    } else {
        currentProperties.sort((a, b) => a.id - b.id);
    }
    renderProperties(currentProperties);
}

filterCityInput.addEventListener('input', applyFilters);

priceRangeInput.addEventListener('input', (e) => {
    const val = (e.target.value / 100).toFixed(2);
    priceValueText.textContent = `₹${val} Cr`;
    applyFilters();
});

document.querySelectorAll('.type-checkbox').forEach(cb => cb.addEventListener('change', applyFilters));
document.querySelectorAll('.furnish-checkbox').forEach(cb => cb.addEventListener('change', applyFilters));

bhkContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('bhk-btn')) {
        document.querySelectorAll('.bhk-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        selectedBHK = e.target.getAttribute('data-bhk');
        applyFilters();
    }
});

resetBtn.addEventListener('click', () => {
    filterCityInput.value = '';
    priceRangeInput.value = 1000;
    priceValueText.textContent = '₹10.00 Cr';
    selectedBHK = 'all';
    document.querySelectorAll('.bhk-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.bhk-btn[data-bhk="all"]').classList.add('active');
    document.querySelectorAll('.type-checkbox').forEach(cb => cb.checked = false);
    document.querySelectorAll('.furnish-checkbox').forEach(cb => cb.checked = false);
    currentProperties = [...propertiesData];
    sortProperties();
});

gridViewBtn.addEventListener('click', () => {
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
    mapViewBtn.classList.remove('active');
    propertiesGrid.classList.remove('hidden', 'list-view');
    mapViewContainer.classList.add('hidden');
});

listViewBtn.addEventListener('click', () => {
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
    mapViewBtn.classList.remove('active');
    propertiesGrid.classList.remove('hidden');
    propertiesGrid.classList.add('list-view');
    mapViewContainer.classList.add('hidden');
});

mapViewBtn.addEventListener('click', () => {
    mapViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
    listViewBtn.classList.remove('active');
    propertiesGrid.classList.add('hidden');
    mapViewContainer.classList.remove('hidden');
});

sortBySelect.addEventListener('change', sortProperties);

heroSearchBtn.addEventListener('click', () => {
    const loc = searchLocationInput.value.trim();
    const type = searchTypeSelect.value;
    if (loc) filterCityInput.value = loc;
    if (type !== 'all') {
        document.querySelectorAll('.type-checkbox').forEach(cb => {
            cb.checked = cb.value === type;
        });
    }
    applyFilters();
    document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const cat = card.getAttribute('data-category');
        document.querySelectorAll('.type-checkbox').forEach(cb => {
            cb.checked = cb.value === cat;
        });
        applyFilters();
        document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
    });
});

loadMoreBtn.addEventListener('click', () => {
    propertiesData = [...propertiesData, ...extraProperties];
    currentProperties = [...propertiesData];
    renderProperties(currentProperties);
    loadMoreBtn.parentElement.style.display = 'none';
});

window.openPropertyModal = function(id) {
    const item = propertiesData.find(p => p.id === id);
    if (!item) return;

    modalBody.innerHTML = `
        <div style="border-radius: 16px; overflow: hidden; height: 260px; margin-bottom: 20px;">
            <img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;" alt="${item.title}">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
                <span class="property-type-tag">${item.type} • ${item.furnishing}</span>
                <h2 style="font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-top: 4px;">${item.title}</h2>
                <p style="color: #64748b; font-size: 0.9rem;"><i class="fa-solid fa-location-dot" style="color: var(--primary-teal);"></i> ${item.location}</p>
            </div>
            <div style="font-size: 1.4rem; font-weight: 800; color: var(--primary-teal);">${item.priceDisplay}</div>
        </div>

        <div class="property-specs" style="margin: 20px 0;">
            <div class="spec-item">
                <i class="fa-solid fa-bed"></i>
                <span class="spec-value">${item.beds} Bedrooms</span>
            </div>
            <div class="spec-item">
                <i class="fa-solid fa-bath"></i>
                <span class="spec-value">${item.baths} Bathrooms</span>
            </div>
            <div class="spec-item">
                <i class="fa-solid fa-vector-square"></i>
                <span class="spec-value">${item.sqft} Sq. Ft.</span>
            </div>
        </div>

        <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
            ${item.description}
        </p>

        <div style="display: flex; gap: 12px;">
            <button class="btn btn-search" style="flex: 1;" onclick="alert('Agent Contacted! Our team will reach out to you within 30 minutes.')">
                <i class="fa-solid fa-phone"></i> Contact Agent
            </button>
            <button class="btn btn-register" style="padding: 12px 24px;" onclick="alert('Booked a virtual viewing appointment!')">
                <i class="fa-regular fa-calendar-check"></i> Book Tour
            </button>
        </div>
    `;
    propertyModal.classList.add('active');
};

closeModal.addEventListener('click', () => propertyModal.classList.remove('active'));
propertyModal.addEventListener('click', (e) => { if (e.target === propertyModal) propertyModal.classList.remove('active'); });

playVideoBtn.addEventListener('click', () => {
    videoIframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
    videoModal.classList.add('active');
});

closeVideoModal.addEventListener('click', () => {
    videoIframe.src = "";
    videoModal.classList.remove('active');
});

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoIframe.src = "";
        videoModal.classList.remove('active');
    }
});

// AUTHENTICATION LOGIC
function openAuthModal(defaultTab = 'login') {
    authModal.classList.add('active');
    if (defaultTab === 'login') {
        tabLoginBtn.classList.add('active');
        tabRegisterBtn.classList.remove('active');
        loginFormContainer.classList.remove('hidden');
        registerFormContainer.classList.add('hidden');
    } else {
        tabRegisterBtn.classList.add('active');
        tabLoginBtn.classList.remove('active');
        registerFormContainer.classList.remove('hidden');
        loginFormContainer.classList.add('hidden');
    }
}

loginBtn.addEventListener('click', () => openAuthModal('login'));
registerBtn.addEventListener('click', () => openAuthModal('register'));
closeAuthModal.addEventListener('click', () => authModal.classList.remove('active'));
authModal.addEventListener('click', (e) => { if (e.target === authModal) authModal.classList.remove('active'); });

tabLoginBtn.addEventListener('click', () => {
    tabLoginBtn.classList.add('active');
    tabRegisterBtn.classList.remove('active');
    loginFormContainer.classList.remove('hidden');
    registerFormContainer.classList.add('hidden');
});

tabRegisterBtn.addEventListener('click', () => {
    tabRegisterBtn.classList.add('active');
    tabLoginBtn.classList.remove('active');
    registerFormContainer.classList.remove('hidden');
    loginFormContainer.classList.add('hidden');
});

document.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    currentUser = { name: email.split('@')[0].toUpperCase(), email: email };
    updateUserNavState();
    authModal.classList.remove('active');
    alert(`Welcome back, ${currentUser.name}! You are successfully logged in.`);
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    currentUser = { name: name, email: email };
    updateUserNavState();
    authModal.classList.remove('active');
    alert(`Account created successfully! Welcome to RealEstate, ${currentUser.name}.`);
});

logoutBtn.addEventListener('click', () => {
    currentUser = null;
    updateUserNavState();
    alert('Logged out successfully.');
});

function updateUserNavState() {
    if (currentUser) {
        loggedOutNav.classList.add('hidden');
        loggedInNav.classList.remove('hidden');
        userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
        userNameText.textContent = currentUser.name;
    } else {
        loggedOutNav.classList.remove('hidden');
        loggedInNav.classList.add('hidden');
    }
}

// List Property Modal
postPropertyBtn.addEventListener('click', () => {
    if (!currentUser) {
        alert('Please login or create an account to post a property listing.');
        openAuthModal('login');
        return;
    }
    postModal.classList.add('active');
});

closePostModal.addEventListener('click', () => postModal.classList.remove('active'));
postModal.addEventListener('click', (e) => { if (e.target === postModal) postModal.classList.remove('active'); });

postPropertyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProp = {
        id: Date.now(),
        title: document.getElementById('postTitle').value,
        price: parseInt(document.getElementById('postPrice').value),
        priceDisplay: `₹${(parseInt(document.getElementById('postPrice').value)).toLocaleString('en-IN')}`,
        type: document.getElementById('postType').value,
        location: document.getElementById('postLocation').value,
        city: document.getElementById('postLocation').value.split(',').pop() || "Delhi",
        beds: parseInt(document.getElementById('postBeds').value),
        baths: parseInt(document.getElementById('postBeds').value),
        sqft: parseInt(document.getElementById('postSqft').value),
        isNew: true,
        isVerified: true,
        furnishing: "Furnished",
        views: 1,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        description: "User listed property with verified legal documentation."
    };

    propertiesData.unshift(newProp);
    currentProperties = [...propertiesData];
    renderProperties(currentProperties);
    postModal.classList.remove('active');
    postPropertyForm.reset();
    alert('Your property has been listed successfully on RealEstate!');
    document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
});

renderProperties(currentProperties);